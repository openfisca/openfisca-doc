# How to get OpenFisca

## For which use ?

You might use OpenFisca with two different approaches:

* if you're more an economist, you might just want to do some tax simulations, or implement fiscal reforms. Then follow instructions in Section ["For Users"](for_users.md).

* if you want to contribute to the source code and to develop and/or fix part of it, you will have to install OpenFisca on your machine. Then follow the section ["For Developers"](install_for_development.md).
 
## What to install?

Depending on your use you'll want to install some parts of OpenFisca, or none:

- If you need to implement some parts of the legislation as OpenFisca formulas, or fill some values for parameters of the legislation, you'll want to install OpenFisca-France.

- If you're developing a web application and need to trigger a computation, you won't need to install anything. Just [send an AJAX request](../openfisca-web-api/index.html) to the public Web API.
  - But if you generate too much traffic we ask you to deploy your own version of the web API. This happens with important applications like https://mes-aides.gouv.fr/




