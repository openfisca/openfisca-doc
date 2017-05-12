# Input and output data

## Values by period

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

## Scenarios

A JSON scenario is an object structured this way:
* `axes` (a list of objects, default: null): the axes of the scenario, see [axes](#axes)
* `input_variables` (an object, mutually exclusive with `test_case`): the input variables, encoded with the [value by period](#values-by-period) structure. For instance:
  * `{"salary": {"2015-04": 2000}, age: {"2015-04": 30}}`
* `period` (see [periods and instants](../periodsinstants.md)): the period on which the variables of the decomposition will be computed
* `test_case` (an object, mutually exclusive with `input_variables`): the test case of the scenario, see [test cases](#test-cases)

> Either `test_case` or `input_variables` must be provided, not both.

> `axes` can't be used with `input_variables`, only `test_case`.

## Test cases

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

## Axes

A JSON axis is an object structured this way:
* `count` (integer, >= 1, required): the number of steps to go from min to max
* `index` (integer, >= 0, default: 0): the index of the person on which to apply the variation of the variable
* `max` (integer or float, required): the maximum value of the varying variable
* `min` (integer or float, required): the minimum value of the varying variable
* `name` (string, one of available [variable names](https://legislation.openfisca.fr/variables), required): the name of the varying variable
* `period` (see [periods and instants](../periodsinstants.md))
