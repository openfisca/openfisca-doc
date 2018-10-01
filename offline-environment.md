# Installing OpenFisca in an offline environment

If you need to install OpenFisca on a server with no Internet access, here is how to do it.

The big picture: download Python packages on a machine with Internet access, copy them to the server and install them in a [virtualenv](https://virtualenv.pypa.io/en/stable/).

We assume that it is possible to copy files to the server, for example via an USB key. Or perhaps the server filters only outgoing connections, but accepts incoming connections allowing to copy the files.

## On the machine with Internet access

We are going to create a first virtualenv in which we'll use `pip` to download the `.whl` files in a specific directory.

Here we use [pew](https://github.com/berdario/pew) to simplify virtualenv management.

```sh
pip install pew
pew new openfisca-packages --python=python3.7

# Upgrade pip itself
pip install --upgrade pip
pip --version
# Should print at least 9.0 at the time we write this doc.

mkdir ~/openfisca-packages
cd ~/openfisca-packages
pip download OpenFisca-France
# You should see the downloaded files in the current directory.
```

Now copy these files on the server (say in the `~/openfisca-packages` directory), either via an USB key, or with `scp`, or any other way.

Example with `scp`:

```sh
scp -r ~/openfisca-packages user@server:
```

## On the server

Starting from here we assume you copied the packages on the server, say in `~/openfisca-packages`.

The following commands show how to install Python packages without any Internet access.
If you already have a virtualenv, activate it. Otherwise create a new one following the same instructions as above (for example with `pew new`).

```sh
pip install ~/openfisca-packages/*
    Processing ./isodate-0.5.4.tar.gz
    [...]
    Installing collected packages: pytz, Babel, Biryani, numpy, PyYAML, OpenFisca-Core, requests, OpenFisca-France, isodate
    Successfully installed Babel-2.3.4 Biryani-0.10.4 OpenFisca-Core-7.0.0 OpenFisca-France-15.1.0 PyYAML-3.12 isodate-0.5.4 numpy-1.12.0 pytz-2016.10 requests-2.13.0

pip list | grep OpenFisca-France
    OpenFisca-France 15.1.0
```

Run the basic tests which confirm that OpenFisca-France is correctly installed:

```sh
python -m openfisca_france.tests.test_basics
OpenFisca-France basic test was executed successfully.
```
