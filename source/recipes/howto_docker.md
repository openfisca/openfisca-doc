# Use OpenFisca with Docker

When you want to use OpenFisca, either to run it or edit its code, you need to setup a specific environement.
If you don't want the OpenFisca environment to interfere with your pre-existing setup, or if you don't have one, you can use a container such as Docker that will set everything up for you.

## Install Docker

> On Windows operating system, you need to have Windows 10 or higher to use Docker.

Docker allows you to run a minimal image of operating system.
In this isolated environment, you will have user rights to install OpenFisca.

* Install free [Docker Community Edition](https://docs.docker.com/install/) (also named `Docker Desktop`).
  * Follow default installation instructions.
  * Run installed Docker application to activate docker daemon. 

## How to run OpenFisca on Docker

Let's say that you want to call the [openfisca_country_template](https://github.com/openfisca/country-template) as a Python library, without editing it.

And you want to work in a directory named `app`.


1. Build a container with Python 3.7 and terminal commands

   * For Linux/Unix/Mac operating systems, open a Terminal and run:
    ```sh
    docker run --rm -it -w /app python:3.7 bash
    ```

   * For Windows operating system, open a powershell and run:
    ```sh
    docker run --rm -it -w /app python:3.7 powershell
    ``` 

2. Check for installed libraries with `pip list` command.
   You should get this list of packages:
   ```sh
    Package    Version
    ---------- -------
    pip        *.*   
    setuptools *.*.* 
    wheel      *.*.* 
   ```

3. Install [openfisca_country_template](https://github.com/openfisca/country-template) as library:
   ```sh
   pip install openfisca_country_template
   ```

   The installation should end with: `Successfully installed (...) openfisca-country-template (...)`.
   And, now, `pip list` response shoud contain `OpenFisca-Country-Template`.


You're all set! You can know use `openfisca-country-template` as any Python library.

## How to edit OpenFisca locally and run it on Docker

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
