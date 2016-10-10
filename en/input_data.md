# Input Data

## Test cases or data

OpenFisca can take test cases or data (surveys with aggregated data or real population data) as input when calculating variables.

A test case describes persons and entities with their input variables whereas data contains potentially a huge quantity of persons and entities.

Test cases can be expressed in Python or in JSON when using the Web API (see specific sections of the documentation).

Here is a test case sample in JSON for a single person with 3 children:

```json
{
  "familles": [
    {
      "parents": ["parent1"],
      "enfants": ["enfant1", "enfant2", "enfant3"]
    }
  ],
  "foyers_fiscaux": [
    {
      "declarants": ["parent1"],
      "personnes_a_charge": ["enfant1", "enfant2", "enfant3"]
    }
  ],
  "individus": [
    {
      "id": "parent1",
      "date_naissance": "1980-01-01",
      "salaire_de_base": 15000
    },
    {
      "id": "enfant1",
      "date_naissance": "2005-01-01"
    },
    {
      "id": "enfant2",
      "date_naissance": "2003-01-01"
    },
    {
      "id": "enfant3",
      "date_naissance": "1997-01-01"
    }
  ],
  "menages": [
    {
      "personne_de_reference": "parent1",
      "enfants": ["enfant1", "enfant2", "enfant3"],
      "loyer": 1500
    }
  ]
}
```

Notice the input variables associated to the `"individus"` (`"date_naissance"` and `"salaire_de_base"`) and to the entity `"menages"` (`"loyer"`).

This is quite verbose but there are shortcuts to generate a test case in common situations.

Using data as input is not documented yet. Please consult this repository:
https://github.com/openfisca/openfisca-france-data

## Scenarios

To support both test cases and data, and for performance reasons,
OpenFisca is developed using vector computing via the [NumPy](http://www.numpy.org/) Python package.

Whatever the input is, a test case or data, OpenFisca will transform it to vectors internally.

Scenarios take a test cases as input and convert them into vectors.

They even offer a way to simplify the declaration of test cases when it contains only a single entity of each type.
