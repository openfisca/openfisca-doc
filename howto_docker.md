# How to use Docker and Openfisca

## Run OpenFisca on Docker

1. Install Docker
2. create a docker file in the directory you wish to work on.
```
FROM python:2-stretch 
RUN pip install OpenFisca-country-template
WORKDIR /app
```
3. Build the container
```sh
docker build --rm -t openfisca-country-template .
```
4. Run the container
```sh
docker run -it openfisca-country-template bash
``` 

## Interface local files with OpenFisca on Docker

If you need to run local files with your Docker image, you can interface (i.e. mont) a local directory with a directory.
E.g. You need to update a country package such as `openfisca-country-template`

1. Create a Dockerfile with `openfisca-core` in your `project` directory

The Dokerfile:
```
FROM python:2-stretch 
RUN pip install OpenFisca-core
WORKDIR /country-template
```

2. clone the [`country-template`](https://github.com/openfisca/country-template) in the directory

The directory:
```
project
│   README.md
│   Dockerfile    
│
└───country-template
```

3. Build the container
```sh
docker build --rm -t openfisca-core .
```

4. Run the container

```sh
docker run -it -v /path/to/directory/project/country-template/:/country-template openfisca-core bash
```

5. Use `country-template` in the Docker container
Use the `country-template` in the docker container, any changes to the `country-template` local files will affect the `country-template` files in the container.
