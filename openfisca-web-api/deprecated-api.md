# Deprecated API

```
This is the documentation for the old OpenFisca web API.  
Please use our [last API](http://openfisca.org/doc/openfisca-web-api) instead.
```

## Public instance for France

The OpenFisca project provides a free and unrestricted instance of the API, complete with the French tax and benefit system, on [`api.openfisca.fr`](https://api.openfisca.fr).

This instance is great for getting a feel of the API, testing, or even deploying small applications, but please note that it is continuously updated. Every update to the endpoints, or to the tax and benefit system, will be automatically deployed to this host without prior notice, including breaking changes.
If you use this host, it is your responsibility to stay up-to-date with all legislation changes that could impact your application.

### Conditions

The public instance comes with no warranty at all. We provide it on a _best-effort_ basis, with no [SLA](https://en.wikipedia.org/wiki/Service-level_agreement) and no performance engagement.

## Hosting an API instance

To allow app developers to access your country package information and computation, you can host your own API.
[deploy your own instance](https://github.com/openfisca/openfisca-web-api/tree/master/production-config).

## Endpoints

The examples on this page use [`curl`](http://curl.haxx.se/) to send the HTTP request.

You may use [`jq`](https://stedolan.github.io/jq/) to format the JSON response, like so:
```sh
curl https://api.openfisca.fr/foo | jq .
```

> `jq` won't be mentioned on each example, feel free to add it like above.

### `/`

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

### `/formula`

Computes a variable in a RESTful way.

> An implicit test case is created with a single person.

* URL path: `/api/2/formula/<period>/<variable_name>`
  * `<period>` is a [period encoded as a string](../periodsinstants.md#api)
  * `variable_name` is the name of you variable you want to compute.
* method: GET
* Inputs are given as query string parameters

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

### `/calculate`

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
  * `validate` (boolean, default: false): when true the simulation isn't launched, but the scenarios are validated.
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

### `/entities`

Gets the entities definition data. [Entities](../person,_entities,_role.md) are a key concept of OpenFisca.

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

### `/parameters`

**This route is now available in a simpler and more developper-friendly version. Please check our [official API](README.md) and give us feedback!**

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
  * `parameters` (list of objects): a list of OpenFisca parameters.

Examples:
* https://api.openfisca.fr/api/1/parameters
* https://api.openfisca.fr/api/1/parameters?name=impot_revenu.bareme

> JSON responses are too large to be copied here.

### `/reforms`

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

To declare an existing reform to an instance of the OpenFisca Web API that you host, see the [Reforms section](#Reforms).

### `/simulate`

> This endpoint is quite complex and you may want to use the [`formula`](#formula) endpoint.

Computes an input test case, returning the results dispatched in a decomposition of the tax and benefit system.

> The decomposition is based on [decomp.xml](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/decompositions/decomp.xml).

* URL path: `/api/1/simulate`
* method: POST
* required headers:
  * `Content-Type: application/json`
* JSON request structure:
  * `scenarios` (list of objects): a list of [JSON scenarios](#scenarios)
  * `reforms` (list of strings, one of the keys given by the [`reforms`](#reforms) endpoint, default: null): applies mentioned reforms to the simulation and returns results for before and after application.
  * `validate` (boolean, default: false): when true the simulation isn't launched, but the scenarios are validated.
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

> The JSON output is too large to be displayed here.

> See also the `calculate` endpoint.

### `/variables`

**This route is now available in a simpler and more developper-friendly version. Please check our [official API](README.md) and give us feedback!**

Gets the variables defined in the tax and benefit system.

* URL path: `/api/1/variables`
* method: GET
* query string parameters:
  * `name` (string, multi-valuated, default: null): the names of the variables to return. If null all the known variables are returned.
* JSON response structure:
  * `country_package_name` (string): the name of the Python package containing the tax and benefit system of the country loaded by the Web API.
    Example: `"openfisca_france"`.
  * `country_package_version` (string): the version of the Python package containing the tax and benefit system of the country loaded by the Web API
  * `currency` (string): the currency of the tax and benefit system of the country loaded by the Web API
  * `variables` (list of objects): a list of [JSON variables](#variables)

Examples:
* https://api.openfisca.fr/api/1/variables
* https://api.openfisca.fr/api/1/variables?name=irpp

> The JSON output is too large to be displayed here.

## Input and output data: JSON content

### Values by period

In OpenFisca, the value of a variable is always defined for a specific period.

This is encoded in JSON using the following format:

```JSON
{"salary": {"2015-01": 2000}}
```

This format allows you to encode an evolution of the variable over time:

```JSON
{
  "salary": {
    "2015-01": 2000,
    "2015-02": 2000,
    "2015-03": 2100,
    "2015-04": 2100,
  }
}
```

When you define the inputs of a simulation, you should in general define the period for which you are setting values (except for variables which cannot change over time, such as a birth date).

If no period is given, for example `{enfant_a_charge: false}`, your input will **only** be set for the global period of the [scenario](#scenarios).

Example: `{salaire_de_base: 5000}` is equivalent to `{salaire_de_base: {<scenario_period>: 5000}}`, `<scenario_period>` being defined in the [scenario](#scenarios).

### Scenarios

A JSON scenario is an object structured this way:
* `axes` (a list of objects, default: null): the axes of the scenario, see [axes](#axes)
* `input_variables` (an object, mutually exclusive with `test_case`): the input variables, encoded with the [value by period](#values-by-period) structure. For instance:
  * `{"salary": {"2015-04": 2000}, age: {"2015-04": 30}}`
* `period` (see [periods and instants](../periodsinstants.md)): the period on which the variables of the decomposition will be computed
* `test_case` (an object, mutually exclusive with `input_variables`): the test case of the scenario, see [test cases](#test-cases)

> Either `test_case` or `input_variables` must be provided, not both.

> `axes` can't be used with `input_variables`, only `test_case`.

### Test cases

A test case describes persons, entities and their associations.

Let's assume that your tax and benefit system defines a [person entity](../person,_entities,_role.md#person) named `persons`, and a [group entity]](../person,_entities,_role.md#group-entities) named `households`.

Let's also assume that within a `household`, you have `parents` and `children`.

A JSON test case is an object structured this way:
* `persons` (list of objects): defines persons with their input variables, structured this way:
  * `id` (string): the ID of the person
  * `<variable name (string)>` (the [value by period](#values-by-period)): an input variable
* `households` (list of objects): the definition of the entity, structured this way:
  * `id` (string): the ID of the entity
  * `parents` (list of strings): a list of persons IDs referencing the ones defined under the persons key
  * `children` (list of strings): a list of persons IDs referencing the ones defined under the persons key
  * `<variable name (string)>` (the [value by period](#values-by-period)): an input variable

Entities and roles can be fetched dynamically with the [entities](#entities) API endpoint.

Example using OpenFisca-France entities and roles:

```json
{
  "individus": [
    {
      "id": "Personne 1",
      "salaire_de_base": 50000
    }
  ],
  "familles": [
    {
      "id": "Famille 1",
      "parents": ["Personne 1"]
    }
  ],
  "foyers_fiscaux": [
    {
      "id": "Déclaration d'impôt 1",
      "declarants": ["Personne 1"]
    }
  ],
  "menages": [
    {
      "id": "Logement principal 1",
      "personne_de_reference": "Personne 1"
    }
  ]
}
```

### Axes

A JSON axis is an object structured this way:
* `count` (integer, >= 1, required): the number of steps to go from min to max
* `index` (integer, >= 0, default: 0): the index of the person on which to apply the variation of the variable
* `max` (integer or float, required): the maximum value of the varying variable
* `min` (integer or float, required): the minimum value of the varying variable
* `name` (string, one of available [variable names](https://legislation.openfisca.fr/variables), required): the name of the varying variable
* `period` (see [periods and instants](../periodsinstants.md))

# Reforms

This documentation explains how to declare an existing reform to an instance of the OpenFisca Web API that you host.

Each OpenFisca Web API instance can handle a number of reforms.
Once a reform is known, the user can ask to apply one or many reforms in the HTTP request
(see [endpoints section](#endpoints)). If no reform is specified in the HTTP request,
no reform will be used in the computation.

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

> Some reforms are commented-out here, they are the reforms bundled with OpenFisca-France.

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

Then with the excellent [httpie](https://httpie.org) tool:

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

See also [OpenFisca-Web-API endpoints doc](#endpoints)
to know more about the JSON input request format.
