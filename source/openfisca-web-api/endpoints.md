# Endpoints

Each OpenFisca Country Package web API comes with a set of endpoints including an OpenAPI specification on the `/spec` route.
You can check out the `OpenFisca-France` [swagger documentation](https://fr.openfisca.org/legislation/swagger) to see how their endpoints work.

The Openfisca Web API can be used to:
 - access information about the parameters (e.g. `/parameters`) and variables (e.g. `/variables`) of the Country Package.
 - run simulations (e.g. `/calculate`) on a specific situation. To describe a situation, learn more about the Web API [inputs and outputs](input-output-data.md).
