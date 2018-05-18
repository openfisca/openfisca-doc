# How to use OpenFisca with Docker

When you want to use OpenFisca, either for running simulations or editing a country package, you need to setup a specific environement.
If you don't want the OpenFisca environment to interfere with your pre-existing setup, or if you don't have one, you can use a container such as Docker that will set everything up for you.


## Run OpenFisca on Docker

1. Install [Docker](https://docs.docker.com/install/)
2. Create a docker file in the directory you wish to work on
```
FROM python:2-stretch 
RUN pip install openfisca_country_template
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

If you need to run local files with your Docker image, you can interface (i.e. mount) a local directory with a directory in your docker interface.
E.g. You need to update a country package such as `openfisca-country-template`

1. Create a Dockerfile with `openfisca-core` in your `project` directory

The Dokerfile:
```
FROM python:2-stretch 
RUN pip install OpenFisca-core
WORKDIR /country-template
```

2. Clone the [`country-template`](https://github.com/openfisca/country-template) in the directory

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
docker run -it -v /absolute/path/to/country-template/:/country-template openfisca-core bash
```

5. Use `country-template` in the Docker container
Use the `country-template` in the docker container, any changes to the `country-template` local files will affect the `country-template` files in the container.
