# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

from datetime import datetime
import io
import json
import os
import logging
import time
from flask import Flask, Response, Request, abort, request
import requests
import argparse
from imageProcessor import ImageProcessor

def init_logging():
    gunicorn_logger = logging.getLogger('gunicorn.error')
    if gunicorn_logger != None:
        app.logger.handlers = gunicorn_logger.handlers
        app.logger.setLevel(gunicorn_logger.level)

 # Get application arguments
parser = argparse.ArgumentParser()
parser.add_argument('-p', nargs=1, metavar=('http_server_port'), help='Port number to listen on.', type=int, default=8080)

_arguments = parser.parse_args()

# Default to port 8080
httpServerPort = _arguments.p

app = Flask(__name__)

init_logging()

processor = ImageProcessor()
app.logger.info('Http extension listening on port: {}'.format(httpServerPort))

# /score routes to scoring function 
# This function returns a JSON object with inference result
@app.route("/score", methods=['POST'])
def score():
    try:
        image_data = request.get_data()
        
        result = processor.process_images(image_data)

        if(result is not None):
            respBody = {
                "inferences" : result
            }

            respBody = json.dumps(respBody)
            return Response(respBody, status = 200, mimetype ='application/json')
        else:
            return Response(status = 400)
    except Exception as ex:
        logging.info('error: {}'.format(ex))
        abort(Response(response='Could not decode image', status = 400))

if __name__ == '__main__':
    # Running the file directly
    app.run(host='0.0.0.0', port=httpServerPort)