# Install with Docker

Using Containers such as Docker to install OpenFisca is useful when a reproducible environment is important or the [Installation requirements](installation-requirements.md) process is either not desirable or not possible.

A container platform such as [Docker](https://www.docker.com) sets up the required environment usually on a minimal image of a Unix operating system.
In a container, exists an isolated environment with user rights to install OpenFisca. The following instructions are for Docker, you may also want to check out [Podman.](https://podman.io).

> Install the free [Docker Community Edition](https://docs.docker.com/install/#supported-platforms) (also named `Docker Desktop`).
>
> - Follow default installation instructions (requires creation of a free Docker ID).
> - Run installed Docker application (to activate docker daemon).
>
> On the Windows operating system, Windows 10 or higher is required to use Docker.

## Install OpenFisca in a Docker container

These instructions are for the [openfisca-country-template](https://github.com/openfisca/country-template) but should be able to be followed for any OpenFisca country package.
The instructions create a directory named `my-openfisca` where any changes made are visible both on the local machine and in the Docker environment.

1. Setup a working directory:  
   + For these instructions create a new directory named `my-openfisca`.
   + Open the system console (`cmd.exe` for Windows OS, a bash Terminal for Unix/Linux/Mac) and run:

        ```sh
        cd my-openfisca # Updated with the real path to your working directory
        ```

2. Build a container with the [appropriate Python version](installation-requirements.md#how-to-find-the-python-version-of-a-model), Git and console commands.
   > Note that Git comes with the Python image.

   + For Linux/Unix/Mac operating systems, run the following command (swapping `python:3.11` for the appropriate Python version):

        ```sh
        docker run --rm -it -v $PWD:/my-openfisca -w /my-openfisca python:3.11 bash
        ```

   + For Windows operating system, run the following command (swapping `python:3.11` for the appropriate Python version):

        ```sh
        docker run --rm -it -v %cd%:/my-openfisca -w /my-openfisca python:3.11 bash
        ```

3. Check the installed libraries with the `pip list` command.
   This should result in the following list of packages:

    ```sh
     Package    Version
     ---------- -------
     pip        *.*.*   
     setuptools *.*.* 
     wheel      *.*.* 
    ```

4. Install the [openfisca-country-template](https://github.com/openfisca/country-template). The chosen approach depends on the use case, specifically if the intention is to contribute to the rules.

   + To contribute to the `openfisca-country-template`, get its source code with:

        ```sh
        git clone https://github.com/openfisca/country-template.git
        ```

        _Note for other OpenFisca country packages change the git repository address as appropriate._

        Then, install it with:

        ```sh
        cd country-template
        make install
        ```

   + Alternatively to run the `openfisca-country-template` without modifying it, install it as a library with:

        ```sh
        pip install openfisca_country_template
        ```

        _Note for other OpenFisca country packages, check first if it is published on [https://pypi.org/](https://pypi.org/) and substitute `openfisca_country_template` for the appropriate package name._

   In both cases, the installation should end without error, and the `pip list` response should contain `OpenFisca-Country-Template`.

This should complete the installation of `openfisca-country-template`, any changes to the local `my-openfisca/` files will be reflected in the `my-openfisca/` files in Docker, and vice-versa.
