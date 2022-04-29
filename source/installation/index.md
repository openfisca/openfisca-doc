# <i class="fas fa-cogs"></i> Get started

```eval_rst
.. toctree::
   :hidden:

   run-web-no-local-install
   install-python
   install-openfisca-country-template
   install-openfisca-web-api
   call-hosted-web-api

   
   offline-environment
   windows-no-admin
   test_situations
```

This section guides you in installing the [`OpenFisca-Country-Template`](https://github.com/openfisca/country-template) country package as a generic example of an OpenFisca country package. This will also allow you to run the documentation examples on your local environment.

This model is fictitious and for your project, you will obviously want to work with one that models the set of rules of an actual jurisdiction. The steps for installing should be similar for every package, but we advise you to refer to your target country package repository documentation for specific instructions.

## The path to OpenFisca-Country-Template

You have nothing to install:

* If you are working on a web application or/and would like to test the web API online, no installation is needed. See further information on the [Call a public web API](call-hosted-web-api.md) page. 
* To test how to use an OpenFisca country package without editing its content, the faster is to run OpenFisca country model on the web! The [Run on the web](./run-web-no-local-install.md) section will allow you to run calculations and skip local installation. 

And here is the install documentation:

* If you want to call the model throught your own instance of OpenFisca Web API to run some calculations for a website. See the [Test or install the OpenFisca-Country-Template Web API](./install-openfisca-web-api.md) page.
* To test OpenFisca syntaxes and start editing some law or regulation rule. The [Install the OpenFisca-Country-Template page](./install-openfisca-country-template.md) is here for you!

## Installation issues in specific environments

As the OpenFisca community becomes larger, issues that only affect a small percentage of users arise.

The purpose of this section is to bring together the clever solutions the community came up with and share them with all OpenFisca users.

- [How to use OpenFisca on the web (no installation required on your computer)](./run-web-no-local-install.md)
- [How to use OpenFisca with Docker](./howto_docker.md)
- [How to install OpenFisca in an offline environment](./offline-environment.md)
- [How to work on OpenFisca on a Windows without being administrator](./windows-no-admin.md)
- [How to test your changes on "ready to use" situations](./test_situations.md)

> You're welcome to share your tips on how to solve technical issues! Please update [this section](https://github.com/openfisca/openfisca-doc/edit/master/recipes.md) (in english) or this [wiki FAQ](https://github.com/openfisca/tutorial/wiki) in your preferred language.
