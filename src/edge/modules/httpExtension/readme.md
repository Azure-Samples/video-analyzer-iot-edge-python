# Http Extension module

The HTTP extension module enables your own IoT Edge module to accept video frames as an http POST request.

## Prerequisites

1. [Install Docker](https://docs.docker.com/desktop/#download-and-install) on your machine
1. [Install IoT Edge Runtime](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-install-iot-edge?tabs=linux)

### Design

This http extension server is a Python terminal application that will house your custom AI and is built to handle http requests. The server reads the video frame, processes it using an Image Processor, and returns inference results as a json response.

*main.py*: this is the entry point of the application. It is responsible for the configuring and management of the http extension server.


```
Main()
```
In this method we:
1. Create an instance of http extension server.
2. Create an instance of the image processor.
3. Define a route for handling the client requests.
4. Set the address and port the http extension server will listen on for client requests.

*imageProcessor.py*: this class is responsible for processing the image. In a nutshell, it reads the raw bytes, converts an image to grayscale and determines if its color intensity is dark or light. You can add your own processor logic by adding a new class and implementing the method:

```
ProcessImages(self, imgBytes):
```
Once you've added the new class, you'll have to update the InferenceServer so it instantiates your class and invokes the **ProcessImage** method on it to run your processing logic.

### Building, publishing and running the Docker container

To build the image, use the Docker file named `Dockerfile`.

First, a couple assumptions

* We'll be using Azure Container Registry (ACR) to publish our image before distributing it
* Our local Docker container image is already logged into ACR.
* In this sample, our ACR name is "myregistry". Your name may defer, so please update it properly in the following commands.

> If you're unfamiliar with ACR or have any questions, please follow this [demo on building and pushing an image into ACR](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli).

`cd` onto the http extension's root directory 

```
sudo docker build -f .\docker\Dockerfile -t httpextension:latest .

sudo docker tag httpextension:latest myregistry.azurecr.io/httpextension:1

sudo docker push myregistry.azurecr.io/httpextension:1
```

Then, from the box where the container should execute, run this command:

`sudo docker run -d -p 5001:5001 --name httpextension myregistry.azurecr.io/httpextension:1 -p 5001`

Let's decompose it a bit:

* `-p 5001:5001`: it's up to you where you'd like to map the containers 5001 port. You can pick whatever port fits your needs.
* `--name`: the name of the running container.
* `registry/image:tag`: replace this with the corresponding location/image:tag where you've pushed the image built from the `Dockerfile`
* `-p`: the port the http extension server will listen on

### Updating references into pipelineTopologies, to target the Http inferencing container address
The [pipelineTopology](https://github.com/Azure/video-analyzer/tree/main/pipelines/live/topologies/httpExtension/2.0/topology.json) must define an inferencing URL:

* Http Extension inferencing URL Parameter
```
{
  "name": "inferencingUrl",
  "type": "String",
  "description": "inferencing Url",
  "default": "https://<REPLACE-WITH-IP-OR-CONTAINER-NAME>/score"
}
```
* Note the configuration of the extension processor
```
    "processors": [
      {
        "@type": "#Microsoft.VideoAnalyzer.HttpExtension",
        "name": "inferenceClient",
        "endpoint": {
          "@type": "#Microsoft.VideoAnalyzer.TlsEndpoint",
          "url": "${inferencingUrl}",
          "credentials": {
            "@type": "#Microsoft.VideoAnalyzer.UsernamePasswordCredentials",
            "username": "${inferencingUserName}",
            "password": "${inferencingPassword}"
          }
        },
        "samplingOptions": {
          "skipSamplesWithoutAnnotation": "false",
          "maximumSamplesPerSecond": "5"
        },
        "image": {
          "scale":
          {
            "mode": "Pad",
            "width": "416",
            "height": "416"
          },
          "format": {
            "@type": "#Microsoft.VideoAnalyzer.ImageFormatJpeg",
            "quality": "90"
          }
        }
      }
    ]

```
## Using the http extension container

Test the container using the following commands

### /score

To get the response of the processed image, use the following command

```bash
curl -X POST https://<REPLACE-WITH-IP-OR-CONTAINER-NAME>/score -H "Content-Type: image/jpeg" --data-binary @<image_file_in_jpeg>
```

If successful, you will see JSON printed on your screen that looks something like this

```JSON
{
  "inferences": [
    {
      "type": "classification",
      "subType": "colorIntensity",
      "classification": {
        "confidence": 1,
        "value": "dark"
      }
    }
  ]
}
```

Terminate the container using the following Docker commands

```bash
docker stop httpextension
docker rm httpextension
```

## Upload Docker image to Azure container registry

Follow instructions in [Push and Pull Docker images  - Azure Container Registry](http://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli) to save your image for later use on another machine.

## Deploy as an Azure IoT Edge module

Follow instruction in [Deploy module from Azure portal](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-deploy-modules-portal) to deploy the container image as an IoT Edge module (use the IoT Edge module option).
