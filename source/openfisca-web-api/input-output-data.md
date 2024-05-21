# Using the /calculate endpoint

> All the examples provided here are from the [country package template](https://github.com/openfisca/country-template).

In order to run a computation on the web API, you need to send the following information to the API in the JSON format:

- The situation that describes the [entities](../key-concepts/person_entities_role.md) (e.g. individuals, households) that you want to base your calculations on.
- The variable you need to compute.

## Describing the situation

### Describing entities

When describing situations to OpenFisca, follow these two rules:

 1. Every person has to belong to one of each group entity (e.g. household).
 2. Every person in a group entity needs a role (e.g. parent)

> For example, if you wish to run a calculation on 2 households:
>
> - household_1 is composed of two adults;
> - household_2 is composed of one adult and one child.

```json
{
  "persons": {
    "Ricarda": {},
    "Bob": {},
    "Bill": {},
    "Janet": {}
    },
  "households": {
    "household_1": {
      "parents": [
        "Ricarda", "Bob"
      ]
    },
    "household_2": {
      "parents": [
        "Bill"
      ],
      "children":[
        "Janet"
      ]
    }
  }
}
```

### Adding information to entities

To run a precise calculation, you should provide information on each person and group entity.

These are the input [variables](../key-concepts/variables.md) of your simulation.

To provide an input variable, insert the value in the json, for the corresponding time period (e.g. `2015-06`) and entity (e.g. `person`, `household`).

The time period must respect the [definition period](../coding-the-legislation/35_periods.md) of the variable, and the entity must be the one the variable is defined for.

> For example, if Ricarda has a salary (defined monthly for a Person) of 3500/month until september 2016, and 4000/month after that and if `household_2` were tenants and became homeowners in March 2016 (`housing_occupancy_status` is defined monthly for a household) of the 57 sqm apartment they live in, you would write:

```json
{
  "persons": {
    "Ricarda": {
      "salary": {
        "2016-01": 3500,
        "2016-02": 3500,
        "2016-03": 3500,
        "2016-04": 3500,
        "2016-05": 3500,
        "2016-06": 3500,
        "2016-07": 3500,
        "2016-08": 3500,
        "2016-09": 4000,
        "2016-10": 4000,
        "2016-11": 4000,
        "2016-12": 4000
      }
    },
    "Bob": {},
    "Bill": {},
    "Janet": {}
  },
  "households": {
    "household_1": {
      "parents": [
        "Ricarda", "Bob"
      ]
    },
    "household_2": {
      "parents": [
        "Bill"
      ],
      "children":[
        "Janet"
      ],
      "housing_occupancy_status": {
        "2016-01": "tenant",
        "2016-02": "tenant",
        "2016-03": "owner",
        "2016-04": "owner",
        "2016-05": "owner",
        "2016-06": "owner",
        "2016-07": "owner",
        "2016-08": "owner",
        "2016-09": "owner",
        "2016-10": "owner",
        "2016-11": "owner",
        "2016-12": "owner"
      },
      "accommodation_size": {
        "2016-01": 57,
        "2016-02": 57,
        "2016-03": 57,
        "2016-04": 57,
        "2016-05": 57,
        "2016-06": 57,
        "2016-07": 57,
        "2016-08": 57,
        "2016-09": 57,
        "2016-10": 57,
        "2016-11": 57,
        "2016-12": 57
      }
    }
  }
}
```

**Note that due to the default value system in OpenFisca, the variables that have not been defined explicitly are either calculated or take on their [default value](../key-concepts/variables.md#default-values).**

## Computing a variable

Once you have described the situation, you can compute all variables in the Country Package.

To indicate you want a variable computed, insert the variable in the corresponding entity and indicate the time period followed by the term `null`.

> for example, to compute Ricarda's june income tax (defined monthly for a person) and household_2's housing tax (defined yearly for a household), you would write:

```json
{
  "persons": {
    "Ricarda": {
      "salary": {
        "2016-01": 3500,
        "2016-02": 3500,
        "2016-03": 3500,
        "2016-04": 3500,
        "2016-05": 3500,
        "2016-06": 3500,
        "2016-07": 3500,
        "2016-08": 3500,
        "2016-09": 4000,
        "2016-10": 4000,
        "2016-11": 4000,
        "2016-12": 4000
      },
      "income_tax": {
        "2016-06": null
      }
    },
    "Bob": {},
    "Bill": {},
    "Janet": {}
  },
  "households": {
    "household_1": {
      "parents": [
        "Ricarda", "Bob"
      ]
    },
    "household_2": {
      "parents": [
        "Bill"
      ],
      "children":[
        "Janet"
      ],
      "housing_occupancy_status": {
        "2016-01": "tenant",
        "2016-02": "tenant",
        "2016-03": "owner",
        "2016-04": "owner",
        "2016-05": "owner",
        "2016-06": "owner",
        "2016-07": "owner",
        "2016-08": "owner",
        "2016-09": "owner",
        "2016-10": "owner",
        "2016-11": "owner",
        "2016-12": "owner"
      },
      "accommodation_size": {
        "2016-01": 57,
        "2016-02": 57,
        "2016-03": 57,
        "2016-04": 57,
        "2016-05": 57,
        "2016-06": 57,
        "2016-07": 57,
        "2016-08": 57,
        "2016-09": 57,
        "2016-10": 57,
        "2016-11": 57,
        "2016-12": 57
      },
      "housing_tax": {
        "2016": null
      }
    }
  }
}
```

## Understanding the result

The API will return an identical JSON file where all the `null` values (the variables that you asked OpenFisca to compute) have been replaced with their computed values.

```json
{
  "persons": {
    "Ricarda": {
      "salary": {
        "2016-01": 3500,
        "2016-02": 3500,
        "2016-03": 3500,
        "2016-04": 3500,
        "2016-05": 3500,
        "2016-06": 3500,
        "2016-07": 3500,
        "2016-08": 3500,
        "2016-09": 4000,
        "2016-10": 4000,
        "2016-11": 4000,
        "2016-12": 4000
      },
      "income_tax": {
        "2016-06": 525
      }
    },
    "Bob": {},
    "Bill": {},
    "Janet": {}
  },
  "households": {
    "household_1": {
      "parents": [
        "Ricarda",
        "Bob"
      ]
    },
    "household_2": {
      "parents": [
        "Bill"
      ],
      "children": [
        "Janet"
      ],
      "housing_occupancy_status": {
        "2016-01": "tenant",
        "2016-02": "tenant",
        "2016-03": "owner",
        "2016-04": "owner",
        "2016-05": "owner",
        "2016-06": "owner",
        "2016-07": "owner",
        "2016-08": "owner",
        "2016-09": "owner",
        "2016-10": "owner",
        "2016-11": "owner",
        "2016-12": "owner"
      },
      "accommodation_size": {
        "2016-01": 57,
        "2016-02": 57,
        "2016-03": 57,
        "2016-04": 57,
        "2016-05": 57,
        "2016-06": 57,
        "2016-07": 57,
        "2016-08": 57,
        "2016-09": 57,
        "2016-10": 57,
        "2016-11": 57,
        "2016-12": 57
      },
      "housing_tax": {
        "2016": 570
      }
    }
  }
}
```

> Note that elements might appear in a different order in the response. However the structure of the JSON stays the same.
