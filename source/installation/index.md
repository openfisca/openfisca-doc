# <i class="fas fa-cogs"></i> Get started

```eval_rst
.. toctree::
   :hidden:

   call-hosted-web-api
   run-web-no-local-install
   install-openfisca-country-template
   install-openfisca-web-api
   install-with-docker
   offline-environment
```

This section guides you in installing the [`OpenFisca-Country-Template`](https://github.com/openfisca/country-template) country package as a generic example of an OpenFisca country package. This will also allow you to run the documentation examples on your local environment.

This model is fictitious and for your project, you will obviously want to work with one that models the set of rules of an actual jurisdiction. The steps for installing should be similar for every package, but we advise you to refer to your target country package repository documentation for specific instructions.

* If you are working on a web application or would like to test the web API online, no installation is needed if you [call a public instance](./call-hosted-web-api.md) of the web API.
* To use an OpenFisca country package without editing the model itself, the fastest is to [load the country package on a hosted web Python runtime](./run-web-no-local-install.md).
* In order to use a country package on your own machine, for example for operating your own web API instance with no usage limitations or to use local databases, [install the package locally](./install-openfisca-web-api.md).
* Finally, to both use and contribute to the rules of a country package, [install it in editable mode](./install-openfisca-country-template.md).
