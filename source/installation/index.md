# <i class="fas fa-cogs"></i> Get started

```eval_rst
.. toctree::
   :hidden:

   presets
   call-hosted-web-api
   run-web-no-local-install
   install-wheel
   install-openfisca-country-template
   install-openfisca-web-api
   install-with-docker
   windows-no-admin
   offline-environment
```

This section guides you in installing the [`OpenFisca-Country-Template`](https://github.com/openfisca/country-template) country package as a generic example of an OpenFisca country package. This will also allow you to run the documentation examples on your local environment.

This model is fictitious and for your project, you will obviously want to work with one that models the set of rules of an actual jurisdiction. We advise you to refer to your target country package repository documentation for specific instructions. Nevertheless, the steps for installing should be similar for every package. 

If you are working on a web application or would like to test the web API online:
* No installation is needed if you [call a public instance](./call-hosted-web-api.md) of the web API.
* [Install the country package web API](./install-openfisca-web-api.md) to operate your own web API instance with no usage limitations or to send requests with private data, .

If you want to use an OpenFisca country package without editing the model rules:
* The fastest is to [load the country package on a web hosted Python runtime](./run-web-no-local-install.md).
* To call calculations from your machine, you can [install the country package on your local environment](./install-wheel.md).

If you want to both, use and contribute to the rules of a country package, [install it in editable mode](./install-openfisca-country-template.md).

Finally, some edge cases has been identified by the OpenFisca community. Here is some additional documentation to help you:
* If you need to [install OpenFisca on a Windows machine without administrative rights](./windows-no-admin.md).
* If you need to [install OpenFisca on a server without internet access](./offline-environment.md).
