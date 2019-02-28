# Using OpenFisca with Docker

When you want to use OpenFisca, either to run it or edit its code, you need to setup a specific environement.
If you don't want the OpenFisca environment to interfere with your pre-existing setup, or if you don't have one, you can use a container platform such as Docker that will set everything up for you.

> On Windows operating system, you need to have Windows 10 or higher to use Docker.

## Install Docker

Docker allows you to run a minimal image of operating system.
In this docker container, you will have an isolated environment with user rights to install OpenFisca.

* Install free [Docker Community Edition](https://docs.docker.com/install/) (also named `Docker Desktop`).
  * Follow default installation instructions.
  * Run installed Docker application (to activate docker daemon). 

## How to install OpenFisca on Docker

Let's say that you want to install the [openfisca-country-template](https://github.com/openfisca/country-template) model. And you want to work in a directory named `openfisca` where any change you do is visible on both sides, locally and on Docker.



1. Build a container with Python 3.7, Git and terminal commands.
   > Git comes with Python image.

   * For Linux/Unix/Mac operating systems, open a Terminal and run:
    ```sh
    docker run --rm -it -v $PWD:/openfisca -w /openfisca python:3.7 bash
    ```

   * For Windows operating system, open a powershell and run:
    ```sh
    docker run --rm -it -v %cd%:/openfisca -w /openfisca python:3.7 powershell
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

3. Install [openfisca-country-template](https://github.com/openfisca/country-template):
   
   * To edit `openfisca-country-template`, get its source code with:
   ```sh
   git clone https://github.com/openfisca/country-template.git
   ```
   And, install it with:
   ```sh
   make install
   ``` 

   * Or, to run `openfisca-country-template` without modifying it, install it as a library with:
   ```sh
   pip install openfisca_country_template
   ```

   In both cases, the installation should end without error.
   And, now, `pip list` response shoud contain `OpenFisca-Country-Template`.


You're all set! You can know use `openfisca-country-template`.
Any changes to your `openfisca/` local files will affect the `openfisca/` files in Docker.
