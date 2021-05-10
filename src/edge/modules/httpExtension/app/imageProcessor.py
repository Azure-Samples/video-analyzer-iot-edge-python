# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

import logging
import io
import numpy as np
import cv2 as cv

class ImageProcessor():
    def __init__(self):
        return
    
    def process_images(self, imgBytes):
        try:
            # Read image raw bytes
            imgBuf = io.BytesIO(imgBytes)
            imgBytes = np.frombuffer(imgBuf.getvalue(), dtype=np.uint8)
            
            # Convert to grayscale
            cvGrayImage = cv.imdecode(imgBytes, cv.COLOR_BGR2RGB)
            grayBytes = cvGrayImage.tobytes()

            # Calculate intensity
            totalColor = cvGrayImage.sum()
            avgColor = totalColor / len(grayBytes)
            
            colorIntensity = 'dark' if avgColor < 127 else 'light'

            logging.info('Color intensity: {}'.format(colorIntensity))

            result = [{
                    "type" : "entity",
                    "subtype" : "colorIntensity",
                    "entity" : {
                        "tag" : {
                            "value" : colorIntensity,
                            "confidence" : 1.0
                        }
                    }
                }]
            
            return result
        except:
            raise
