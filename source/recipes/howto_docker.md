# Using OpenFisca with Docker

When you want to use OpenFisca, either to run it or edit its code, you need to setup a specific environement.
If you don't want the OpenFisca environment to interfere with your pre-existing setup, or if you don't have one, you can use a container platform such as [Docker](https://www.docker.com) that will set everything up for you.

> On Windows operating system, you need to have Windows 10 or higher to use Docker.

## Install Docker

Docker allows you to run a minimal image of Unix operating system.
In this docker container, you will have an isolated environment with user rights to install OpenFisca.

* Install free [Docker Community Edition](https://docs.docker.com/install/#supported-platforms) (also named `Docker Desktop`).
  * Follow default installation instructions (you will need to create a free Docker ID).
  * Run installed Docker application (to activate docker daemon). 

## Install OpenFisca in a Docker container

Let's say that you want to install the [openfisca-country-template](https://github.com/openfisca/country-template) model (or your specific country model). And you want to work in a directory named `my-openfisca` where any change you do is visible on both sides, locally and on Docker.

1. Go to your working directory:  
   * If you don't have one, create a new directory named `my-openfisca`.
   
   * Open your system console (`cmd.exe` for Windows OS, a bash Terminal for Unix/Linux/Mac) and run: 
        ```sh
        cd my-openfisca # Updated with the real path to your working directory
        ```   

2. Build a container with Python 3.7, Git and console commands.
   > Git comes with Python image.

   * For Linux/Unix/Mac operating systems, run:
        ```sh
        docker run --rm -it -v $PWD:/my-openfisca -w /my-openfisca python:3.7 bash
        ```

   * For Windows operating system, run:
        ```sh
        docker run --rm -it -v %cd%:/my-openfisca -w /my-openfisca python:3.7 bash
        ``` 

3. Check for installed libraries with `pip list` command.
   You should get this list of packages:
    ```sh
     Package    Version
     ---------- -------
     pip        *.*.*   
     setuptools *.*.* 
     wheel      *.*.* 
    ```

4. Install [openfisca-country-template](https://github.com/openfisca/country-template). Here are two main options: you can run it without modifying it or install it to edit its code.
   
   * To edit `openfisca-country-template`, get its source code with:
        ```sh
        git clone https://github.com/openfisca/country-template.git
        ```
        And, install it with:
        ```sh
        cd country-template
        make install
        ``` 

   * Or, to run `openfisca-country-template` without modifying it, install it as a library with:
        ```sh
        pip install openfisca_country_template
        ```

   In both cases, the installation should end without error.  
   And, now, `pip list` response shoud contain `OpenFisca-Country-Template`.


You're all set! You can now use `openfisca-country-template`.  
Any changes to your `my-openfisca/` local files will be reflected to `my-openfisca/` files in Docker, and vice-versa.
