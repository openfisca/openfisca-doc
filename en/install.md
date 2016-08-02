# Install

## What to install?

Depending on your usage you'll want to install some parts of OpenFisca, or none:

- If you need to implement some parts of the legislation as OpenFisca formulas, or fill some values for parameters of the legislation, you'll want to install OpenFisca-France.
- If you're developing a web application and need to trigger a computation, you won't need to install anything. Just [send an AJAX request](../openfisca-web-api/index.html) to the public Web API.
  - But if you generate too much traffic we ask you to deploy your own version of the web API. This happens with important applications like https://mes-aides.gouv.fr/

## For which use ?

Furthermore you might use OpenFisca with two different approaches:

* if you're more an economist who just want to do some tax simulations, or implement your own fiscal reforms, follow the instruction in section "Basic Use"

* if you want to contribute to the source code and to develop and/or fix part of it, you will have to install OpenFisca on your machine. Just follow the section "Install for development"

## Supported operating systems

The supported operating systems are GNU/Linux distributions (in particular Debian and Ubuntu), Mac OS X and Microsoft Windows.

Other OS should work if they can execute Python and NumPy.

On Microsoft Windows:
- The Conda installer adds by default the commands `conda` and `python` to the system PATH.
- We recommend using [ConEmu](https://conemu.github.io/) instead of the default console.

## Install for development
