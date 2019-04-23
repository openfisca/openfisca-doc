# Using the /trace endpoint

> All the examples provided here are from the [country package template](https://github.com/openfisca/country-template).

When you [run a simulation](input-output-data.md) on a specific situation (e.g. use the `/calculate` endpoint), you might want to understand the calculation. The `/trace` endpoint is here to help you analyse the simulation calculation step by step.

## Application: analyse disposable income calculation for one person

Let's say that you want to calculate the `disposable_income` for one person earning a `salary` on the same period. You start with the following JSON situation description:

```json
{
  "households": {
    "_": {
      "parents": ["Alicia"]
    }
  },
  "persons": {
    "Alicia": {
      "birth": {
        "ETERNITY": "1980-01-01"
      },
      "disposable_income": {
        "2017-01": null
      },
      "salary": {
        "2017-01": 4000
      }
    }
  }
}
```

If you send this situation to your `country-template` model Web API or try it out on the `/trace` endpoint in the [Swagger interface](https://demo.openfisca.org/legislation/swagger), you get the following response composed of three sections:

* `entitiesDescription`: lists the persons and how they belong to the model group entities,
* `requestedCalculations`: lists the requested calculations (i.e. variables with values at `null`),
* `trace`: lists the calculation steps.

```json
{
  "entitiesDescription": {
    "households": [
      "_"
    ],
    "persons": [
      "Alicia"
    ]
  },
  "requestedCalculations": [
    "disposable_income<2017-01>"
  ],
  "trace": {
    "age<2017-01>": {
      "dependencies": [
        "birth<2017-01>"
      ],
      "parameters": {},
      "value": [
        37
      ]
    },
    "basic_income<2017-01>": {
      "dependencies": [
        "age<2017-01>"
      ],
      "parameters": {
        "benefits.basic_income<2017-01-01>": 600,
        "general.age_of_majority<2017-01-01>": 18
      },
      "value": [
        600
      ]
    },
    "birth<2017-01>": {
      "dependencies": [],
      "parameters": {},
      "value": [
        "Tue, 01 Jan 1980 00:00:00 GMT"
      ]
    },
    "disposable_income<2017-01>": {
      "dependencies": [
        "salary<2017-01>",
        "basic_income<2017-01>",
        "income_tax<2017-01>",
        "social_security_contribution<2017-01>"
      ],
      "parameters": {},
      "value": [
        3920
      ]
    },
    "income_tax<2017-01>": {
      "dependencies": [
        "salary<2017-01>"
      ],
      "parameters": {
        "taxes.income_tax_rate<2017-01-01>": 0.15
      },
      "value": [
        600
      ]
    },
    "salary<2017-01>": {
      "dependencies": [],
      "parameters": {},
      "value": [
        4000
      ]
    },
    "social_security_contribution<2017-01>": {
      "dependencies": [
        "salary<2017-01>"
      ],
      "parameters": {},
      "value": [
        80
      ]
    }
  }
}
```

As we calculated the `disposable_income` for `2017-01`, let's see how the `trace` section describes it:

```json
  {
    "disposable_income<2017-01>": {
      "dependencies": [
        "salary<2017-01>",
        "basic_income<2017-01>",
        "income_tax<2017-01>",
        "social_security_contribution<2017-01>"
      ],
      "parameters": {},
      "value": [
        3920
      ]
    }
  }
```

It contains these sub-sections:

* `value`: the calculated `disposable_income` on `2017-01` period,
* `dependencies`: the [variables](../key-concepts/variables.md) called by `disposable_income` formula and their calculation periods,
* `parameters`: the [parameters](../key-concepts/parameters.md) called by `disposable_income` formula and their periods.

You can see those variables and parameters in [disposable_income definition](https://demo.openfisca.org/legislation/disposable_income).

Following `dependencies` list, we can also see that:

* OpenFisca didn't need to calculate the `salary` value as it was given in situation inputs; thus the `/trace` doesn't evaluate its `dependencies` and `parameters`:
    ```json
    {
      "salary<2017-01>": {
        "dependencies": [],
        "parameters": {},
        "value": [
          4000
        ]
      }
    }
    ```
* OpenFisca needed to calculate the next variable, `basic_income`, before `disposable_income` evaluation:
    ```json
    {
      "basic_income<2017-01>": {
        "dependencies": [
          "age<2017-01>"
        ],
        "parameters": {
          "benefits.basic_income<2017-01-01>": 600,
          "general.age_of_majority<2017-01-01>": 18
        },
        "value": [
          600
        ]
      }
    }
    ```

    Note that, as a parameter depends only on its validity period, its evaluation is described in one line that includes its value.


So, with `/trace` endpoint, you can follow calculation steps by following the variable names and periods in its response `trace` section.

> Try it out on the [Swagger interface](https://demo.openfisca.org/legislation/swagger) of `country-template` model.
