# Describing a situation in OpenFisca

> All the example provided here are from the [country package template](https://github.com/openfisca/country-template).

When using the API `/calculate` endpoint, you will need to send information to the API concerning :
- The situation, meaning describe the entities (e.g. individuals, households) that you want to base your calulations on
- The variable you need to compute.

## Describing the situation

### Describing entities

The most important rule in describing a situation in OpenFisca is :

Every person has to belong to one of each group entity (e.g. household).
Every person in a group entity needs a role (e.g. parent)

> For example, if you wish to run a calculation on 2 households. One composed of to adults, the other of one adult and one child.


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

## Adding information to entities

To run a precise calculation, you can provide information on each person and group entity.


These information are called input variables and they have three caracteristics :
 - An entity type (e.g. Salary is an input variable for an Person, housing occupancy status is an input variable for a household)
 - A date format (e.g. Yearly, monthly ...),
 - A formula or a default value, that are used for computations when the input variable was not provided.


To provide an input variable, insert the value in the json, for the corresponding time period and entity.

> For example, if Ricarda has a salary (defined monthly for a Person) of 3500/month until september 2016, and 4000/month after that and if household_2 were tenant and became homeowners in march 2016 (housing_occupancy_status is defined monthly for a household) of the 57 sqm apartment they live in, you would write :

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
        "2016-01": "Tenant",
        "2016-02": "Tenant",
        "2016-03": "Owner",
        "2016-04": "Owner",
        "2016-05": "Owner",
        "2016-06": "Owner",
        "2016-07": "Owner",
        "2016-08": "Owner",
        "2016-09": "Owner",
        "2016-10": "Owner",
        "2016-11": "Owner",
        "2016-12": "Owner"
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
> note that because of the default value system in OpenFisca, the variables that have not been defined explicitly are either calculated or take on their default value.  


## Computing a variable

Once you have described the situation, you can compute all variables that have a formula.

To indicate you want a variable computed, insert the variable in the corresponding entity and indicate the time period followed by the term `null`.

> for example, to compute Ricarda's june income tax (defined monthly for a person) and household_2's housing tax (defined yearly for a household), you would write :

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
      "income_tax" : {
        "2016-06" : null
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
        "2016-01": "Tenant",
        "2016-02": "Tenant",
        "2016-03": "Owner",
        "2016-04": "Owner",
        "2016-05": "Owner",
        "2016-06": "Owner",
        "2016-07": "Owner",
        "2016-08": "Owner",
        "2016-09": "Owner",
        "2016-10": "Owner",
        "2016-11": "Owner",
        "2016-12": "Owner"
      },
      "accomodation_size": {
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
      "housing_tax" : {
        "2016" : null
      }
    }
  }
}
```

## Understanding the result

The API will return an identical JSON file where all the `null` (the variable that you asked OpenFisca to compute, see above for details) have been replace by the computed value.
```json
{
  "households": {
    "household_1": {
      "parents": [
        "Ricarda", 
        "Bob"
      ]
    }, 
    "household_2": {
      "accomodation_size": {
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
      "children": [
        "Janet"
      ], 
      "housing_occupancy_status": {
        "2016-01": "Tenant", 
        "2016-02": "Tenant", 
        "2016-03": "Owner", 
        "2016-04": "Owner", 
        "2016-05": "Owner", 
        "2016-06": "Owner", 
        "2016-07": "Owner", 
        "2016-08": "Owner", 
        "2016-09": "Owner", 
        "2016-10": "Owner", 
        "2016-11": "Owner", 
        "2016-12": "Owner"
      }, 
      "housing_tax": {
        "2016": 570.0
      }, 
      "parents": [
        "Bill"
      ]
    }
  }, 
  "persons": {
    "Bill": {}, 
    "Bob": {}, 
    "Janet": {}, 
    "Ricarda": {
      "income_tax": {
        "2016-06": 525.0
      }, 
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
    }
  }
}
```
> note that elements might appear in a different order in the response. However the structure of the file stay the same.
