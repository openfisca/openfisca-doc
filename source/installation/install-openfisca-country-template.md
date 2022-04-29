# Install the OpenFisca-Country-Template

This section will allow you to run or modify the [source code of OpenFisca-Country-Template](https://github.com/openfisca/country-template) model.

## Prerequisites

OpenFisca runs with [Python](https://www.python.org/).
Its source code is managed through [Git](https://git-scm.com) version control system.

Python installation is compulsory to run OpenFisca code on your local environment. The [Install Python](./install-openfisca-country-template.html#install-python) section is here to help you through this journey.

Git installation is highly recommended. Here is the [documentation to install Git](https://git-scm.com/downloads) latest revision.

> If your local environement is already set, you can skip the next subsections and go to [Install OpenFisca-Country-Template](./install-openfisca-country-template.md#install-openfisca-country-template). 🙂

### Install Python

Python installation depends on your operating system.

And its version depend on the OpenFisca country model that you would like to use.

#### How to find the Python version of a model

We describe here how to find the Python version of the OpenFisca-Country-Template. Other country models have a similar structure.

To identify the Python revision of the `OpenFisca-Country-Template` we:
1. Look into the [setup.py file](https://github.com/openfisca/country-template/blob/master/setup.py) of its [repository](https://github.com/openfisca/country-template),
2. Check the `classifiers` values where the Python version is described by a value like `"Programming Language :: Python :: 3.7"` (here `3.7`)
3. When multiple Python versions are listed, we advise you to install the most recent one (3.8 for example if 3.7 and 3.8 are listed).

#### Default Python installation

You will find the default installation instructions in [Python official documentation](https://www.python.org/downloads/). See the Python version of your model as described above before choosing wich Python to install.

> [Docker](https://www.docker.com) users might find it easier to follow a different installation for Python and rely on [Python official image](https://hub.docker.com/_/python) instead. See the [Install OpenFisca in a Docker container](./install-openfisca-country-template.md#install-openfisca-country-template-with-docker) section.

#### Recommendations for Windows users

Microsoft Windows users, can also rely [conda](https://docs.conda.io/en/latest/) package and environment manager to use [OpenFisca-Country-Template](https://anaconda.org/search?q=openfisca-country-template) or one of the openfisca packages [published as conda packages](https://anaconda.org/search?q=openfisca).
  
We recommend this option for an easier installation but the [available packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
To install Python through conda: 
* install the [Anaconda distribution](https://anaconda.org) for Python and conda.
* or, for users with less disk space, install the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python and conda.

## Install OpenFisca-Country-Template

You will find the `OpenFisca-Country-Template` installation instruction in the [Install Instructions for Users and Contributors](https://github.com/openfisca/country-template#install-instructions-for-users-and-contributors) of its `README`.

💡 Other OpenFisca models have their own documentation. You will find the existing repositories list on [this page of openfisca.org](https://openfisca.org/en/countries/) website.

## Install OpenFisca-Country-Template with Docker

When you want to use OpenFisca, either to run it or edit its code, you need to setup a specific environement.

If you don't want the OpenFisca environment to interfere with your pre-existing setup, or if you don't have one, you can use a container platform such as [Docker](https://www.docker.com) that will set everything up for you. It will allow you to run a minimal image of Unix operating system.
In a container, you will have an isolated environment with user rights to install OpenFisca.

> Install free [Docker Community Edition](https://docs.docker.com/install/#supported-platforms) (also named `Docker Desktop`).
> * Follow default installation instructions (you will need to create a free Docker ID).
> * Run installed Docker application (to activate docker daemon). 
> On Windows operating system, you need to have Windows 10 or higher to use Docker.

### Install OpenFisca in a Docker container

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

   In both cases, the installation should end without error, and the `pip list` response should contain `OpenFisca-Country-Template`.


You're all set! You can now use `openfisca-country-template`.  

Any changes to your `my-openfisca/` local files will be reflected to `my-openfisca/` files in Docker, and vice-versa.
