# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root for
# full license information.

import time
import sys
import asyncio
import json
from six.moves import input
from azure.iot.device.aio import IoTHubModuleClient
from azure.iot.device import Message
import logging

OBJECT_TAG = 'truck'
OBJECT_CONFIDENCE = 0.5
TWIN_CALLBACKS = 0


async def main():
    try:
        # twin_patch_listener is invoked when the module twin's desired properties are updated.
        async def twin_patch_listener(module_client):
            global OBJECT_TAG
            global OBJECT_CONFIDENCE
            global TWIN_CALLBACKS

            while True:
                try:
                    data = await module_client.receive_twin_desired_properties_patch()  # blocking call
                    print('The data in the desired properties patch was: %s' % data)
                    if 'objectTag' in data:
                        OBJECT_TAG = data['objectTag']
                    if 'objectConfidence' in data:
                        OBJECT_CONFIDENCE = data['objectConfidence']
                    TWIN_CALLBACKS += 1
                    print('Total calls confirmed: %d\n' % TWIN_CALLBACKS)
                except Exception as ex:
                    print('Unexpected error in twin_patch_listener: %s' % ex)

        async def count_objects_listener(module_client):
            global OBJECT_TAG
            global OBJECT_CONFIDENCE

            while True:
                input_message = await module_client.receive_message_on_input('detectedObjects')  # blocking call    
                
                if input_message is not None:
                    message = input_message.data
                    message_text = message.decode('utf-8')
                    count = 0
                    print(message_text)
                    #
                    data = json.loads(message_text)
                    #

                    try:
                        detected_objects = data['inferences']
                        for inference in detected_objects:
                            entity = inference['entity']
                            tag = entity['tag']
                            
                            if (tag['value'] == OBJECT_TAG) and (tag['confidence'] > OBJECT_CONFIDENCE):
                                count += 1

                        if count > 0:
                            output_message_string = json.dumps(dict({'count': count}))
                            output_message = Message(output_message_string, content_encoding='utf-8')
                            
                            subject = input_message.custom_properties['subject']
                            graph_instance_signature = '/livePipelines/'

                            if graph_instance_signature in subject:
                                output_message.custom_properties['eventTime'] = input_message.custom_properties['eventTime']
                                await module_client.send_message_to_output(output_message, "objectCountTrigger")
                    except:
                        print('No inferences array found for message.')

        def stdin_listener():
            while True:
                try:
                    selection = input("Press Q to quit\n")
                    if selection == "Q" or selection == "q":
                        print("Quitting...")
                        break
                except:
                    time.sleep(10)

        if not sys.version >= "3.5.3":
            raise Exception("The sample requires python 3.5.3+. Current version of Python: %s" % sys.version)
        print("IoT Hub Client for Python")

        logging.basicConfig(
            format='%(asctime)s %(name)-20s %(levelname)-5s %(message)s',
            level=logging.DEBUG
        )

        # The client object is used to interact with your Azure IoT hub.
        module_client = IoTHubModuleClient.create_from_edge_environment(websockets=True)

        # connect the client.
        await module_client.connect()

        # Schedule task for C2D Listener1
        listeners = asyncio.gather(count_objects_listener(module_client), twin_patch_listener(module_client))

        print("The sample is now waiting for messages. ")

        # Run the stdin listener in the event loop
        loop = asyncio.get_event_loop()
        user_finished = loop.run_in_executor(None, stdin_listener)

        # Wait for user to indicate they are done listening for messages
        await user_finished

        # Cancel listening
        listeners.cancel()

        # Finally, disconnect
        await module_client.disconnect()

    except Exception as e:
        print("Unexpected error %s " % e)
        raise

if __name__ == "__main__":

    #loop = asyncio.get_event_loop()
    #loop.run_until_complete(main())
    #loop.close()

    # If using Python 3.7 or above, you can use following code instead:
    asyncio.run(main())
