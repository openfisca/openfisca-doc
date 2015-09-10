# Reforms

> This documentation explains how to declare an existing reform to an instance of the OpenFisca Web API that you host.
> To know how to write a reform, please read [OpenFisca-Core reforms](https://github.com/openfisca/openfisca-core/tree/next/docs/reforms.md)

Each OpenFisca Web API instance can handle a number of reforms.
Once a reform is known, the user can ask to apply one or many reforms in the HTTP request (see [endpoints doc](endpoints.md)). If no reform is specified in the HTTP request, no reform will be used in the computation.

## Add a reform

To add a reform, open the `development-france.ini` config file and add/extend the `reforms` config key.

For this example we add the `landais_piketty_saez` reform. Here we give you some more context around:

```ini
[app:main]
use = egg:OpenFisca-Web-API
country_package = openfisca_france
log_level = DEBUG
reforms =
  landais_piketty_saez = openfisca_france_reform_landais_piketty_saez.build_reform
;  inversion_revenus = openfisca_france.reforms.inversion_revenus.build_reform
;  trannoy_wasmer = openfisca_france.reforms.trannoy_wasmer.build_reform
```

> Some reforms are commented-out here, they are the reforms bundled with [OpenFisca-France](https://github.com/openfisca/openfisca-france/tree/next/openfisca_france/reforms).

> Be sure to respect the indentation level of 2 spaces so the INI file parser considers it's a list.

## Test if it works

Start the API HTTP server with

    paster serve --reload development-france.ini

Let's query for example the new variable `impot_revenu_lps`. Save the following JSON in a file named `landais_piketty_saez_test_1.json`:

```json
{
  "scenarios": [
    {
      "test_case": {
        "familles": [
          {
            "parents": ["ind0", "ind1"],
            "enfants": ["ind2"]
          }
        ],
        "foyers_fiscaux": [
          {
            "declarants": ["ind0", "ind1"],
            "personnes_a_charge": ["ind2"]
          }
        ],
        "individus": [
          {"id": "ind0"},
          {"id": "ind1"},
          {"id": "ind2"}
        ],
        "menages": [
          {
            "personne_de_reference": "ind0",
            "conjoint": "ind1",
            "enfants": ["ind2"]
          }
        ]
      },
      "period": "2014"
    }
  ],
  "variables": ["impot_revenu_lps"],
  "base_reforms": ["landais_piketty_saez"],
  "output_format": "variables"
}
```

> The `base_reforms` values must correspond to reform keys declared in the `development-france.ini` file.

Then with the excellent [httpie](http://httpie.org) tool:

    http :2000/api/1/calculate < landais_piketty_saez_test_1.json

You should have no error and the `value` key should be:

```json
"value": [
    {
        "charge_loyer": {
            "2014": [
                0.0
            ]
        }
    }
]
```

See also [OpenFisca-Web-API endpoints doc](https://github.com/openfisca/openfisca-web-api/blob/next/endpoints.md) to know more about the JSON input request format.
