# Input and output data

## values by period

The value of a variable is always expressed in function of a definition period.

Example: `{salaire_de_base: {"2015-01": 5000}}`

When the period is not given, for example `enfant_a_charge: false`, the global period of the [scenario](#scenarios) is used.

Example: `{salaire_de_base: 5000}` is equivalent to `{salaire_de_base: {<scenario_period>: 5000}}`, `<scenario_period>` being defined in the [scenario](#scenarios).

If a `set_input` attribute is defined in the simulation variable, it's possible to specify a different period unit and let the Core dispatch the value. See also: [periods section](../coding-the-legislation/35_periods.md).

Example: `{salaire_de_base: {"2015": 5000}}`, given [`salaire_de_base`](https://legislation.openfisca.fr/salaire_de_base) defines `set_input = set_input_divide_by_period`.

## scenarios

A JSON scenario is an object structured this way:
* `axes` (a list of objects, default: null): the axes of the scenario, see [axes](#axes)
* `input_variables` (an object, mutually exclusive with `test_case`): the input variables, structured this way:
  * `<variable name (string)>` (the [value by period](#values-by-period)): an input variable
* `period` (a [JSON period](#periods), default: the current year): the period on which the variables of the decomposition will be computed
* `test_case` (an object, mutually exclusive with `input_variables`): the test case of the scenario, see [test cases](#test-cases)

> Either `test_case` or `input_variables` must be provided, not both.

> `axes` can't be used with `input_variables`, only `test_case`.

## test cases

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

## axes

A JSON axis is an object structured this way:
* `count` (integer, >= 1, required): the number of steps to go from min to max
* `index` (integer, >= 0, default: 0): the index of the person on which to apply the variation of the variable
* `max` (integer or float, required): the maximum value of the varying variable
* `min` (integer or float, required): the minimum value of the varying variable
* `name` (string, one of available [variable names](https://legislation.openfisca.fr/variables), required): the name of the varying variable
* `period` (a JSON period):

### Parallel axes

TODO

### Perpendicular axes

TODO

## instants

TODO

## parameters

TODO

## periods

A JSON period can be:
* a `string` like "2014", "2014-01", "2014-03:2"
* an `object` like `{start: "2014", unit: "year"}`
