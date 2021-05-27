# AVA cloud to device sample console app

This directory contains a dotnet core sample app that would enable you to invoke AVA on IoT Edge Direct Methods in a sequence and with parameters, defined by you in a JSON file (operations.json)

## Contents

| File/folder             | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| `.gitignore`            | Define what to ignore at commit time.                         |
| `README.md`             | This README file.                                             |
| `operations.json`       | JSON file defining the sequence of operations to execute upon.|
| `main.py`               | The main program file                                         |
| `requirements.txt`      | List of all dependent Python libraries                        |


## Setup

Create a file named `appsettings.json` in this folder. Add the following text and provide values for all parameters.

```JSON
{
    "IoThubConnectionString" : "<your iothub connection string>",
    "deviceId" : "<device ID>",
    "moduleId" : "<module ID>"
}
```

* **IoThubConnectionString** - Refers to the connection string of your IoT hub. This should have registry write and service connect access.
* **deviceId** - Refers to your IoT Edge device ID (registered with your IoT hub)
* **moduleId** - Refers to the module id of Azure Video Analyzer edge module (when deployed to the IoT Edge device)


Create a file named `.env` in the `src/edge` folder and add the following text to it. Provide values for all variables.

```env
AVA_PROVISIONING_TOKEN="<your provisioning token>"
SUBSCRIPTION_ID="<your Azure subscription id>"
RESOURCE_GROUP="<your resource group name>"
IOTHUB_CONNECTION_STRING="<IoT Hub connection string>"
VIDEO_INPUT_FOLDER_ON_DEVICE="<a folder on your edge device with MKV files, used by RTSP simulator>"
VIDEO_OUTPUT_FOLDER_ON_DEVICE="<a folder on your edge device used for recording video clips>"
APPDATA_FOLDER_ON_DEVICE="<a folder on your edge device used for storing application data>"
CONTAINER_REGISTRY_USERNAME_myacr="<user name for your Azure Container Registry>"
CONTAINER_REGISTRY_PASSWORD_myacr="<password for the registry>"
```

Set up Azure resources:

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://aka.ms/ava-click-to-deploy) will generate the **appsettings.json** and **.env** file with values filled out.


## Running the sample from Visual Studio Code

Detailed instructions for running the sample can be found in the tutorials for AVA on IoT Edge. Below is a summary of key steps. Make sure you have installed the required [prerequisites](./../../README.md#prerequisites).

* Open your local clone of this git repository in Visual Studio Code, have the [Azure Iot Tools](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-tools) extension installed. 
* Right click on src/edge/deployment.template.json and select **“Generate Iot Edge deployment manifest”**. This will create an IoT Edge deployment manifest file in src/edge/config folder named deployment.amd64.json.
* Right click on src/edge/config /deployment.amd64.json and select **"Create Deployment for single device"** and select the name of your edge device. This will trigger the deployment of the IoT Edge modules to your Edge device. You can view the status of the deployment in the Azure IoT Hub extension (expand 'Devices' and then 'Modules' under your IoT Edge device).
* Right click on your edge device in Azure IoT Hub extension and select **"Start Monitoring Built-in Event Endpoint"**.
* Install python dependencies from `requirements.txt`. This can be done by running `pip install -r src\cloud-to-device-console-app\requirements.txt`.
* Select the "Cloud to Device - Console App" configuration in the run tab and start a debugging session (hit F5). You will start seeing some messages printed in the TERMINAL window. In the OUTPUT window, you will see messages that are being sent to the IoT Hub, by the AVAEdge module.

❗**Note:** *When running the debugger with the cloud-to-device-console project, the default launch.json creates a configuration with the parameter "console": "internalConsole". This does not work since internalConsole does not allow keyboard input. Changing the parameter to "console" : "integratedTerminal" fixes the problem.*

## Troubleshooting

See the [Azure Video Analyzer Troubleshooting page](https://docs.microsoft.com/azure/azure-video-analyzer/video-analyzer-docs/troubleshoot.md).

## Next steps

Experiment with different [pipeline topologies](https://docs.microsoft.com/azure/azure-video-analyzer/video-analyzer-docs/pipeline) by modifying `pipelineTopologyUrl` in operations.json.
