# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
FROM ubuntu:18.04 as base

# Install python
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip python3-dev libglib2.0-0 libsm6 libxext6 libxrender-dev\
    && cd /usr/local/bin \
    && ln -s /usr/bin/python3 python \
    && pip3 install --upgrade pip \
    && pip3 install numpy pillow opencv-python \
    && pip3 install requests protobuf grpcio \
    && apt-get install -y libgl1-mesa-dev && apt-get clean

# Copy AVA extension specific files
RUN mkdir /app
COPY ./app/*.py /app/
COPY ./app/grpc-proto/*.py /app/

# Starts the AVA gRPC extension server
FROM base as final
WORKDIR /app/
CMD ["python3", "main.py"]
