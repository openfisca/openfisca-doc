# <i icon-name="download"></i> Getting started

```{toctree}
:hidden:

call-existing-web-api
installation-requirements
install-country-web-api
install-country-package
python-api-browser
access-countrys-source-code
install-with-docker
offline-environment
windows-no-admin
```

This section is a guide to the various methods of accessing or installing OpenFisca. Follow the guide below to establish what the use case is and get directed to the appropriate section(s).

## 1) Identify the country package

The most common approach involves a specific country or jurisdiction package and so in this scenario it's important to identify if that package exists and then continue to step 2 _"Clarify use case"_.
If the goal is contributing to OpenFisca directly (such as this documentation); have a look at the [Contribute](/contribute/index.md) section of this site and also the [OpenFisca Github repositories](https://github.com/openfisca/).

## 2) Clarify use case

With a specific country or jurisdiction package in mind; ask whether the use case requires [contributions to the rules](index.md#contributing-to-the-rules), or intends to just [utilise existing rules](index.md#utilising-existing-rules) (for example: run simulations).

### Utilising existing rules

If the goal is just to utilise existing rules (rather than contributing to the rules) then consider the following options.

#### Web API

Best for online web applications. The two options are:

* If it exists, [call an existing web API](./call-existing-web-api.md) for your country (no installation necessarily), or
* [Install a country web API](./install-country-web-api.md) to operate your own web API with no usage limitations (see also [Install with Docker](./install-with-docker.md)).

#### Python API

Suitable for "desktop" processing and running large simulations:

* [Install a country package](./install-country-package.md) in a local environment (see also [Install with Docker](./install-with-docker.md)).
* Alternatively, access the [Python API in the browser](./python-api-browser.md).

### Contributing to the rules

If the goal includes contributing to the rules of a country package:

* when it already exists, [access a country's source code](./access-countrys-source-code.md).
* otherwise [bootstrap a new country package](/coding-the-legislation/bootstrapping_a_new_country_package.md)

## Edge cases

Finally, some specific edge cases have been described by the OpenFisca community as follows:

* Installing a specific country OpenFisca package in an [offline environment](./offline-environment.md).
* Installing a specific country OpenFisca package on a [Windows machine without administrative rights](./windows-no-admin.md).
