# IoT Edge Samples

This folder contains IoT Edge deployment manifest templates and sample IoT Edge modules.

## Deployment manifest templates

Name | Description | Sample Tutorial | Supported Architecture | Inference Endpoint
:----- | :----  | :---- | :---- | :----
[deployment.template.json](deployment.template.json) | This file is a deployment manifest template that has the following modules defined in it: <br><ul><li>rtspsim - [RTSP simulator module](https://github.com/Azure/video-analyzer/tree/main/edge-modules/sources/rtspsim-live555)</li> <li>avaedge - Azure Video Analyzer on IoT Edge module</li> | [Detect motion and emit events](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/detect-motion-emit-events-quickstart?pivots=programming-language-python#generate-and-deploy-the-deployment-manifest), <br> [Detect motion and record video on edge devices](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/detect-motion-record-video-edge-devices?pivots=programming-language-python#generate-and-deploy-the-deployment-manifest)| x64, ARM64 | N/A
[deployment.httpExtension.template.json](deployment.httpExtension.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes a sample [httpExtension module](https://github.com/Azure-Samples/azure-video-analyzer-iot-edge-python/tree/main/src/edge/modules/httpExtension). | | BYO<sup>*</sup> | HTTP |
[deployment.grpc.template.json](deployment.grpc.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes a sample [grpcExtension module](https://github.com/Azure-Samples/azure-video-analyzer-iot-edge-python/tree/main/src/edge/modules/grpcExtension). | | BYO<sup>*</sup> | gRPC
[deployment.customvision.template.json](deployment.customvision.template.json) |In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the toy truck detector model built using [Custom Vision](https://www.customvision.ai/). This is an IoT Edge module that runs the Custom Vision model behind an HTTP endpoint. | [Analyze live video with Azure Video Analyzer on IoT Edge and Azure Custom Vision](https://docs.microsoft.com/azure/azure-video-analyzer/video-analyzer-docs/analyze-live-video-custom-vision)  | BYO<sup>*</sup> | HTTP
[deployment.grpcyolov3icpu.template.json](deployment.grpcyolov3icpu.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes this [YOLOv3 module](https://github.com/Azure/video-analyzer/tree/main/edge-modules/extensions/yolo/yolov3/grpc-cpu). This IoT Edge module runs the YOLOv3 ONNX model behind a gRPC endpoint, bound to port 44000.  | [Analyze live video with your own model - gRPC](https://aka.ms/ava-grpc-quickstart) | x64, ARM64 | gRPC
[deployment.grpctinyyolov3icpu.template.json](deployment.grpctinyyolov3icpu.template.json)  | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes this [Tiny YOLOv3 module](https://github.com/Azure/video-analyzer/tree/main/edge-modules/extensions/yolo/tinyyolov3/grpc-cpu). This IoT Edge module runs the Tiny YOLOv3 ONNX model behind a gRPC endpoint, bound to port 33000. | | x64, ARM64 | gRPC
[deployment.objectCounter.template.json](deployment.objectCounter.template.json) | In addition to the modules defined in [deployment.yolov3.template.json](deployment.yolov3.template.json), this deployment manifest template includes a sample [objectCounter module](https://github.com/Azure-Samples/azure-video-analyzer-iot-edge-python/tree/main/src/edge/modules/objectCounter). This template also has message routes defined to send messages from the avaedge module to the objectCounter module and vice versa, to enable event-based video recording when specified objects are found. | [Event-based video recording and playback](https://docs.microsoft.com/azure/azure-video-analyzer/video-analyzer-docs/record-event-based-live-video) | x64 | HTTP
[deployment.openvino.grpc.template.json](deployment.openvino.grpc.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the [OpenVINO™ module](https://aka.ms/ava-intel-ovms). This module uses the OpenVINO™ Model Server (OVMS), an inference server powered by the OpenVINO™ toolkit, that is highly optimized for computer vision workloads and developed for Intel architectures. | | x64<sup>**</sup> | gRPC
[deployment.openvino.grpc.xpu.template.json](deployment.openvino.grpc.xpu.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the [OpenVINO™ module](https://aka.ms/ava-intel-ovms). This module uses the OpenVINO™ Model Server (OVMS), an inference server powered by the OpenVINO™ toolkit, that is highly optimized for computer vision workloads and developed for Intel architectures. | | x64<sup>**</sup> | gRPC |
[deployment.openvino.template.json](deployment.openvino.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the [OpenVINO™ module](https://aka.ms/ava-intel-ovms). This module uses the OpenVINO™ Model Server (OVMS), an inference server powered by the OpenVINO™ toolkit, that is highly optimized for computer vision workloads and developed for Intel architectures. | [Analyze live video using OpenVINO™ Model Server – AI Extension from Intel](https://aka.ms/ava-intel-ovms-tutorial) | x64<sup>**</sup> | HTTP
[deployment.spatialAnalysis.ase.template.json](deployment.spatialAnalysis.ase.template.json) | In addition to the modules defined in [deployment.ase.template.json](deployment.ase.template.json), this deployment manifest template includes the [Spatial Analysis module](https://docs.microsoft.com/azure/cognitive-services/computer-vision/spatial-analysis-container?tabs=azure-stack-edge) from Azure Cognitive Services. This module supports operations that enable you to count people in a designated zone, to track when a person crosses a designated line or area, or when people violate a distance rule. | [Live Video with Computer Vision for Spatial Analysis](https://aka.ms/ava-spatial-analysis) | x64 | gRPC
[deployment.spatialAnalysis.generic.template.json](deployment.spatialAnalysis.generic.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the [Spatial Analysis module](https://docs.microsoft.com/azure/cognitive-services/computer-vision/spatial-analysis-container?tabs=azure-stack-edge) from Azure Cognitive Services. This module supports operations that enable you to count people in a designated zone, to track when a person crosses a designated line or area, or when people violate a distance rule. | [Live Video with Computer Vision for Spatial Analysis](https://aka.ms/ava-spatial-analysis)| x64 | gRPC
[deployment.yolov3.template.json](deployment.yolov3.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the [YOLOv3 module](https://github.com/Azure/video-analyzer/tree/main/edge-modules/extensions/yolo/yolov3/http-cpu). This is an IoT Edge module that runs the YoloV3 ONNX model behind an HTTP endpoint. | [Analyze live video with your own model - HTTP](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/analyze-live-video-use-your-model-http?pivots=programming-language-python), <br>[Track objects in a live video](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/track-objects-live-video), <br>[Record and stream inference metadata with video](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/record-stream-inference-data-with-video), <br>[Detect when objects cross a virtual line in a live video](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/use-line-crossing) | x64 | HTTP
[deployment.composite.template.json](deployment.composite.template.json) | In addition to the modules defined in [deployment.template.json](deployment.template.json), this deployment manifest template includes the [YOLOv3 module](https://github.com/Azure/video-analyzer/tree/main/edge-modules/extensions/yolo/yolov3/grpc-cpu) and the [Tiny YOLOv3 module](https://github.com/Azure/video-analyzer/tree/main/edge-modules/extensions/yolo/tinyyolov3/grpc-cpu). This is an IoT Edge module that runs both the YOLOv3 ONNX model, bound to port 44000, and Tiny YOLOv3 ONNX model, bound to port 33000, behind gRPC endpoints. | [Analyze live video streams with multiple AI models using AI composition](https://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-docs/edge/analyze-ai-composition) | x64, ARM64 | gRPC

<sup>*</sup>Bring your own model. You can leverage [Docker's documentation on architecture support](https://docs.docker.com/desktop/multi-arch/#:~:text=Docker%20images%20can%20support%20multiple%20architectures%2C%20which%20means,image%20variant%20that%20matches%20your%20OS%20and%20architecture.) to meet your edge device requirements.

<sup>**</sup>OpenVINO™ is only supported by Intel chipsets (CPU, iGPU, VPU).

## Deployment manifest template variables

The deployment manifest templates contains several variables (look for '$' symbol). The values for these variables need to be specified in a .env file that you should create in the same folder as the template files. This file should like the following

```env
SUBSCRIPTION_ID="<your Azure subscription id>"
RESOURCE_GROUP="<your resource group name>"
AVA_PROVISIONING_TOKEN="<the provisioning token>"
IOTHUB_CONNECTION_STRING="<IoT Hub connection string>"
VIDEO_INPUT_FOLDER_ON_DEVICE="<a folder on your edge device with MKV files, used by RTSP simulator>"
VIDEO_OUTPUT_FOLDER_ON_DEVICE="<a folder on your edge device used for recording video clips>"
APPDATA_FOLDER_ON_DEVICE="<a folder on your edge device used for storing application data>"
CONTAINER_REGISTRY_USERNAME_myacr="<user name for your Azure Container Registry>"
CONTAINER_REGISTRY_PASSWORD_myacr="<password for the registry>"
```

To generate a deployment manifest from the template, open your local clone of this git repository in Visual Studio Code, have the [Azure IoT Tools](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-tools) extension installed. Create the .env file with the above variables and their values. Then right click on the template file and select "Generate IoT Edge deployment manifest". This will create the corresponding deployment manifest file in a **./config** folder.

## Sample edge modules

### objectCounter

The folder **./modules/objectCounter** contains source code for an IoT Edge module that counts objects of a specified type and with a confidence above a specified threshold value (these are specified as twin properties in deployment.objectCounter.template.json). The module expects messages emitted by YOLOv3 module.

### httpExtension

The folder **./modules/httpExtension** contains source code for an IoT Edge module that exposes a HTTP endpoint where video frames can be posted. Upon receiving the frames, the module calculates the average color and classifies the image as 'light' or 'dark' and returns the result (using the inference schema defined by AVA) in the HTTP response message.


### grpcExtension

The folder **./modules/grpcExtension** contains source code for an IoT Edge module that exposes a gPRC endpoint where video frames can be sent to. Upon receiving the frames, the module calculates the average color and classifies the image as 'light' or 'dark' and returns the result (using the inference schema defined by AVA) in the gRPC response message.

## Learn more

* [Develop IoT Edge modules](https://docs.microsoft.com/azure/iot-edge/tutorial-develop-for-linux)
