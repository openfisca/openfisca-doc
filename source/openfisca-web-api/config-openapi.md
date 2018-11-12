# OpenAPI specification configuration

The OpenFisca Web API exposes a `/spec` route that documents how to use the API, using the OpenAPI standard.

Most the the `/spec` content is automatically built for you. However, some minimal configuration can make the provided examples more complete and relevant, and improve the [Swagger interactive documentation packaged in the Legislation Explorer](http://demo.openfisca.org/legislation/swagger).

This configuration is done in the initialisation of your `TaxBenefitSystem`. For example, in the [country package template](https://github.com/openfisca/country-template/blob/3.5.0/openfisca_country_template/__init__.py#L28-L33), you can see:

```py
  # We define which variable, parameter and simulation example will be used in the OpenAPI specification
  self.open_api_config = {
    "variable_example": "disposable_income",
    "parameter_example": "taxes.income_tax_rate",
    "simulation_example": couple,
    }
```

This defines:
  - `variable_example`: A variable of your model that you want to appear in the specification. Usually a well known variable (e.g. salary).
  - `parameter_example`: A parameter of your model that you want to appear in the specification. Usually a well known variable (e.g. minimum wage).
  - `simulation_example`: A Python `dict` representing a JSON that could be sent to the Web API. It should include some input values, and some values set to `null`/`None` so that they are calculated.

Note that if no OpenAPI configuration is provided, an arbitrary variable and an arbitrary parameter will be used, and no simulation example will be provided as an example.
