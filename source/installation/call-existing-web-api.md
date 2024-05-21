# Call an existing web API

The web API is made for online web applications. Before hosting your country web API, you can check if it already exists or use the demonstration of the `OpenFisca-Country-Template` web API hosted by OpenFisca community. It is available for testing and interacting with its web API endpoints through [this swagger interface](https://legislation.demo.openfisca.org/swagger). As with all OpenFisca country web APIs it does not require configuring or installing anything to access it.

For further information on the possible requests, [this section of the documentation](./../openfisca-web-api/endpoints.md) describes OpenFisca web APIs endpoints.

> 💡 Other OpenFisca models might have their own hosted web APIs. When looking for an already hosted web API of a specific country package, it is recommended to check the terms of use and contact the maintaining team.

The `OpenFisca-Country-Template` demonstration API provides examples of the endpoints that are available with all OpenFisca packages. To develop an application that requires calculations specific to a country, that country's OpenFisca web API will be required to access the variables and calculations specific to that country.

It is advised to host specific OpenFisca instances per application as changes to laws can often require application changes. This will give maintainers the ability to migrate the application to the latest version of a country package in their own timeframes.

Read [Install a country web API](./install-country-web-api.md) for more information.
