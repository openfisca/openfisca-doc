# Edge Case: Offline environment

If there is a need to install OpenFisca on a server with no internet access, the following is how that can be achieved.

The big picture: download Python packages on a machine with internet access, copy them to the server and install them in a [virtualenv](https://virtualenv.pypa.io/en/stable/).

It's assumed that it is possible to copy files to the server, i.e. via a USB stick.

## On the machine with Internet access

First create a virtual environment and use `pip` to download the `.whl` files to a specific directory.

```sh
    mkdir ~/openfisca-packages
    cd ~/openfisca-packages

    # Create and instigate a virtual environment
    python3.11 -m venv .venv
    source .venv/bin/activate

    # Upgrade pip itself
    pip install --upgrade pip
    pip --version
    # Prints 24.0 at the time this doc was written.

    mkdir country-template
    cd country-template
    pip download OpenFisca-Country-Template
    # You should see the downloaded files in the current directory.
```

Copy the files in the `~/openfisca-packages/country-template` directory to the server via a USB stick, or for example with `scp`.

Example with `scp`:

```sh
    scp -r ~/openfisca-packages/country-template user@server:
```

## On the server

The following assumes the files are now stored in `~/openfisca-packages/country-template` on the server.

The following commands show how to install Python packages without any Internet access.
If you already have a virtual environment, activate it. Otherwise create a new one following the same instructions as above.

```sh
    pip install ~/openfisca-packages/country-template/*
    Processing ./isodate-0.5.4.tar.gz
    [...]
    Installing collected packages: StrEnum, sortedcontainers, typing-extensions... openfisca-country-template
    Successfully installed StrEnum, sortedcontainers, typing-extensions... openfisca-country-template

    # Step completed, the following can be utilised to confirm success and versions of the packages installed.
    pip list | grep openfisca-country_template
    openfisca-country_template 7.1.1

    pip list | grep OpenFisca-Core
    OpenFisca-Core 41.4.5
```

Now copy these files on the server (say in the `~/openfisca-packages` directory), either via a USB stick, or with `scp`, or any other way.

Example with `scp`:

```sh
scp -r ~/openfisca-packages user@server:
```

To check that everything works correctly, run the following command:

```sh
python -c "from openfisca_country_template import CountryTaxBenefitSystem; CountryTaxBenefitSystem()"
```

No error message should appear. You can now utilise this environment to [run simulations](../simulate/run-simulation.md).
