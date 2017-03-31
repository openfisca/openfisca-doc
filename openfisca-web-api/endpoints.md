# Endpoints

The examples on this page use [`curl`](http://curl.haxx.se/) to send the HTTP request.

You may use [`jq`](https://stedolan.github.io/jq/) to format the JSON response, like so:
```sh
curl https://api.openfisca.fr/foo | jq .
```

> `jq` won't be mentioned on each example, feel free to add it like above.

## index

Displays a friendly welcome message.

* URL path: `/`
* method: GET

Example:

```sh
curl https://api.openfisca.fr/
```

```json
{"apiVersion": 1, "message": "Welcome, this is OpenFisca Web API.", "method": "/"}
```

## formula

Computes a formula in a RESTful way. An implicit test case is created with a single person.

* URL path: `/api/2/formula/period/variable_name`
  * Replace `period` by a [period as string](../periodsinstants.md) and `variable_name` by the name of a variable.
* method: GET
* query string parameters correspond to input variables and their values.

Example:

```sh
curl "https://api.openfisca.fr/api/2/formula/2017-02/cout_du_travail?salaire_de_base=2300"
```

```json
{
  "values": {
    "cout_du_travail": 3078.4599609375
  },
  "params": {
    "salaire_de_base": 2300
  },
  "period": [ "month", [ 2017, 2, 1 ], 1 ],
  "apiVersion": "2.1.0"
}
```

## calculate

> This endpoint is quite complex and you may want to use the [`formula`](#formula) endpoint.

Computes a test case.

* URL path: `/api/1/calculate`
* method: POST
* required headers:
  * `Content-Type: application/json`
* JSON request structure:
  * `output_format` (string, one of ["test_case", "variables"], default: "test_case"): the output format of `value` field in response.
    * with `test_case`: `value` will be a list of test cases identical to the input test cases given in `scenarios` key, with computed variables dispatched in the right entity.
    * with `variables`: `value` will be a list of objects like `{<variableName>: <variableValue>}`
  * `reforms` (list of strings, one of the keys given by the [`reforms`](#reforms) endpoint, default: null): applies mentioned reforms to the simulation and returns results for before and after application.
  * `scenarios` (list of objects): a list of [scenarios](#scenarios)
  * `validate` (boolean, default: false): when true the simulation isn't launched, but the scenarios are [validated](#scenarios-validation)
  * `variables` (list of strings): the name of the variables to compute
* JSON response structure:
  * `suggestions` (list of objects): suggested variables values for the input test_case, actually used by the simulation. Different than variables default values since it depends on the input test_case.
  * `value` (list or object, depending on the `output_format` value): The simulation result.
    Each output variable value is a list which length is equal to the number of entities on which the variable is defined.

Example: let's run a simple simulation with a single person with no salary.

Create a file named `test_case.json` with these contents:

```json
{
  "scenarios": [
    {
      "test_case": {
        "familles": [
          {
            "parents": ["individu0"]
          }
        ],
        "foyers_fiscaux": [
          {
            "declarants": ["individu0"]
          }
        ],
        "individus": [
          {
            "date_naissance": "1980-01-01",
            "id": "individu0"
          }
        ],
        "menages": [
          {
            "personne_de_reference": "individu0"
          }
        ]
      },
      "period": "2015"
    }
  ],
  "variables": ["revenu_disponible"]
}
```

```sh
curl https://api.openfisca.fr/api/1/calculate -X POST --data @./test_case.json --header 'Content-type: application/json'
```

The output is:

```json
{
  "apiVersion": 1,
  "method": "/api/1/calculate",
  "params": {
    [...]
  },
  "url": "http://api.openfisca.fr/api/1/calculate",
  "value": [
    {
      "familles": [
        {
          "id": 0,
          "parents": [
            "individu0"
          ]
        }
      ],
      "foyers_fiscaux": [
        {
          "id": 0,
          "declarants": [
            "individu0"
          ]
        }
      ],
      "individus": [
        {
          "id": "individu0",
          "date_naissance": "1980-01-01"
        }
      ],
      "menages": [
        {
          "id": 0,
          "personne_de_reference": "individu0",
          "revenu_disponible": {
            "2015": 5305.3701171875
          }
        }
      ]
    }
  ]
}
```

What is important is the `value` key containing the value of `revdisp` for the period `2015`: `5332.37`.

> See also the `simulate` endpoint.

## entities

Gets the entities definition data. Entities are a [key concept of OpenFisca](../person,_entities,_role.md).

* URL path: `/api/2/entities`
* method: GET

Example:

```sh
curl https://api.openfisca.fr/api/2/entities
```

```json
{
  "apiVersion": 1,
  "entities": {
    "famille": {
      "roles": [
        {
          "subroles": [
            "demandeur",
            "conjoint"
          ],
          "plural": "parents",
          "key": "parent",
          "label": "Parents"
        },
        {
          "plural": "enfants",
          "key": "enfant",
          "label": "Enfants"
        }
      ],
      "label": "Famille"
    },
    "foyer_fiscal": {
      "roles": [
        {
          "subroles": [
            "declarant_principal",
            "conjoint"
          ],
          "plural": "declarants",
          "key": "declarant",
          "label": "Déclarants"
        },
        {
          "plural": "personnes_a_charge",
          "key": "personne_a_charge",
          "label": "Personnes à charge"
        }
      ],
      "label": "Déclaration d’impôts"
    },
    "individu": {
      "isPersonsEntity": true,
      "label": "Individu"
    },
    "menage": {
      "roles": [
        {
          "max": 1,
          "key": "personne_de_reference",
          "label": "Personne de référence"
        },
        {
          "max": 1,
          "key": "conjoint",
          "label": "Conjoint"
        },
        {
          "plural": "enfants",
          "key": "enfant",
          "label": "Enfants"
        },
        {
          "plural": "autres",
          "key": "autre",
          "label": "Autres"
        }
      ],
      "label": "Logement principal"
    }
  },
  "method": "/api/2/entities",
  "params": {
    [...]
  }
}
```

This data is useful when building a dynamic UI with forms allowing the user to make a test case, for example.

## parameters

Gets the legislation parameters of the tax and benefit system.

* URL path: `/api/1/parameters`
* method: GET
* query string parameters:
  * `name` (string, multi-valuated, default: null): the name(s) of the parameters to return. If null all the known parameters are returned.
  * `instant` (see [periods and instants](../periodsinstants.md), default: null): if given, returns the legislation parameters at this instant. Can only be used in conjunction with the `name` query string parameter.
* JSON response structure:
  * `country_package_name` (string): the name of the Python package containing the tax and benefit system of the country loaded by the Web API.
    Example: `"openfisca_france"`.
  * `country_package_version` (string): the version of the Python package containing the tax and benefit system of the country loaded by the Web API
  * `currency` (string): the currency of the tax and benefit system of the country loaded by the Web API
  * `parameters` (list of objects): a list of [JSON parameters](./input-output-data.md#parameters)

Examples:
* https://api.openfisca.fr/api/1/parameters
* https://api.openfisca.fr/api/1/parameters?name=impot_revenu.bareme

> JSON responses are too large to be copied here.

## reforms

Get the list of reforms known by the Web API, with their keys and labels.

Those reforms keys can be passed either to the `calculate` or `simulate` endpoints.

Example:

```sh
curl https://api.openfisca.fr/api/1/reforms
```

```json
{
  "apiVersion": 1,
  "method": "/api/1/reforms",
  "params": {
    "context": null
  },
  "reforms": {
    "allocations_familiales_imposables": "Allocations familiales imposables",
    "ayrault_muet": "Amendement Ayrault-Muet au PLF2016",
    "cesthra_invalidee": "Contribution execptionnelle sur les très hauts revenus d'activité (invalidée par le CC)",
    "plf2015": "Projet de Loi de Finances 2015 appliquée aux revenus 2013",
    "plf2016": "Projet de Loi de Finances 2016 appliquée aux revenus 2014",
    "plf2016_counterfactual": "Contrefactuel du PLF 2016 sur les revenus 2015",
    "plf2016_counterfactual_2014": "Contrefactuel 2014 du PLF 2016 sur les revenus 2015",
    "trannoy_wasmer": "Loyer comme charge déductible (Trannoy-Wasmer)"
  },
  "url": "http://api.openfisca.fr/api/1/reforms"
}
```

## simulate

> This endpoint is quite complex and you may want to use the [`formula`](#formula) endpoint.

Computes an input test case, returning the results dispatched in a decomposition of the tax and benefit system.

> The decomposition is based on [decomp.xml](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/decompositions/decomp.xml).

* URL path: `/api/1/simulate`
* method: POST
* required headers:
  * `Content-Type: application/json`
* JSON request structure:
  * `scenarios` (list of objects): a list of [JSON scenarios](./input-output-data.md#scenarios)
  * `reforms` (list of strings, one of the keys given by the [`reforms`](#reforms) endpoint, default: null): applies mentioned reforms to the simulation and returns results for before and after application.
  * `validate` (boolean, default: false): when true the simulation isn't launched, but the scenarios are [validated](#scenarios-validation)
* JSON response structure:
  * `suggestions` (list of objects): suggested variables values for the input test_case, actually used by the simulation. Different than variables default values since it depends on the input test_case.
  * `value` (object): the simulation result


Example: let's run a simple simulation with a single person with no salary.

Create a file named `test_case.json` with these contents:

```json
{
  "scenarios": [
    {
      "test_case": {
        "familles": [
          {
            "parents": ["individu0"]
          }
        ],
        "foyers_fiscaux": [
          {
            "declarants": ["individu0"]
          }
        ],
        "individus": [
          {
            "date_naissance": "1980-01-01",
            "id": "individu0"
          }
        ],
        "menages": [
          {
            "personne_de_reference": "individu0"
          }
        ]
      },
      "period": "2015"
    }
  ]
}
```

```sh
curl https://api.openfisca.fr/api/1/simulate -X POST --data @./test_case.json --header 'Content-type: application/json'
```

The JSON output is too large to be displayed here.

> See also the `calculate` endpoint.

## variables

Gets simulation variables of the tax and benefit system.

* URL path: `/api/1/variables`
* method: GET
* query string parameters:
  * `name` (string, multi-valuated, default: null): the names of the variables to return. If null all the known variables are returned.
* JSON response structure:
  * `country_package_name` (string): the name of the Python package containing the tax and benefit system of the country loaded by the Web API.
    Example: `"openfisca_france"`.
  * `country_package_version` (string): the version of the Python package containing the tax and benefit system of the country loaded by the Web API
  * `currency` (string): the currency of the tax and benefit system of the country loaded by the Web API
  * `variables` (list of objects): a list of [JSON variables](./input-output-data.md#variables)

Examples:
* https://api.openfisca.fr/api/1/variables
* https://api.openfisca.fr/api/1/variables?name=irpp

> JSON responses are too large to be copied here.
