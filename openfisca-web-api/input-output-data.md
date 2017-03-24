# Input and output data

## Values by period

The value of a variable always exists in a specific period.

Example: `{salaire_de_base: {"2015-01": 5000}}`

When the period is not given, for example `enfant_a_charge: false`, the global period of the [scenario](#scenarios) is used.

Example: `{salaire_de_base: 5000}` is equivalent to `{salaire_de_base: {<scenario_period>: 5000}}`, `<scenario_period>` being defined in the [scenario](#scenarios).

## Scenarios

A JSON scenario is an object structured this way:
* `axes` (a list of objects, default: null): the axes of the scenario, see [axes](#axes)
* `input_variables` (an object, mutually exclusive with `test_case`): the input variables, structured this way:
  * `<variable name (string)>` (the [value by period](#values-by-period)): an input variable
* `period` (see [periods and instants](../periodsinstants.md), default: the current year): the period on which the variables of the decomposition will be computed
* `test_case` (an object, mutually exclusive with `input_variables`): the test case of the scenario, see [test cases](#test-cases)

> Either `test_case` or `input_variables` must be provided, not both.

> `axes` can't be used with `input_variables`, only `test_case`.

## Test cases

A test case describes persons, entities and their associations.

A JSON test case is an object structured this way:
* `individus` (list of objects): defines persons with their input variables, structured this way:
  * `id` (string): the ID of the person
  * `<variable name (string)>` (the [value by period](#values-by-period)): an input variable
* `<entity key plural (string)>` (list of objects): the definition of the entity, structured this way:
  * `id` (string): the ID of the entity
  * `<role key (string)>` (list of strings): a list of persons IDs referencing the ones defined under the individus key
  * `<variable name (string)>` (the [value by period](#values-by-period)): an input variable

Entities and roles can be fetched dynamically with the [entities](#entities) API endpoint.

Example:

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

## Axes

A JSON axis is an object structured this way:
* `count` (integer, >= 1, required): the number of steps to go from min to max
* `index` (integer, >= 0, default: 0): the index of the person on which to apply the variation of the variable
* `max` (integer or float, required): the maximum value of the varying variable
* `min` (integer or float, required): the minimum value of the varying variable
* `name` (string, one of available [variable names](https://legislation.openfisca.fr/variables), required): the name of the varying variable
* `period` (see [periods and instants](../periodsinstants.md))
