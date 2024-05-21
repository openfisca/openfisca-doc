# API endpoints

Each OpenFisca Country Package web API comes with a set of endpoints including an OpenAPI specification on the `/spec` route.
You can check out the demonstration [swagger documentation](https://legislation.demo.openfisca.org/swagger) to see how the endpoints work.

The OpenFisca web API can be used to:

- access information about the parameters (e.g. `/parameters`), the variables (e.g. `/variables`), and entities (e.g. `/entities`) of the Country Package,
- run simulations (e.g. `/calculate`) on a specific situation. To describe a situation, learn more about the web API [inputs and outputs](input-output-data.md),
- analyse a simulation calculation (e.g. `/trace`) on a specific situation.
