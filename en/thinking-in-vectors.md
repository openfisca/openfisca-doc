# Thinking in vectors

## From test case to vectors

Because OpenFisca needs to accept test cases or data as input, it uses vector computing.
So we need to reason always with vectors instead of values.

Let's dive into OpenFisca's internals sightly.

Each variable of the tax and benefit legislation is represented by a vector.
The size of a vector is equal to the number of entities the variable is defined on.

This applies to all variables, whether or not calculated.

For example let's take the input variable [`"age"`](https://legislation.openfisca.fr/variables/age)
which is defined on `"individus"`. Say there are 3 persons defined, the vector contains 3 ages: `[30, 25, 15]`.

Now let's take the computed tax variable [`"irpp"`](https://legislation.openfisca.fr/variables/irpp)
which is defined on `"foyers_fiscaux"`. Say there is 1 `"foyer_fiscal"` defined, containing the 3 persons above,
the vector contains 1 value (here is a dummy value): `[999]`.

Test cases are just a syntactic sugar to generate vectors. This is a completely optional layer.

Entities and roles are encoded using special variables `"id*"` and `"qui*"` whose vectors contain respectively
unique identifiers of an entity and integers corresponding to a role.

For example, for `"familles"` we have
[`"idfam"`](https://legislation.openfisca.fr/variables/idfam) and
[`"quifam"`](https://legislation.openfisca.fr/variables/quifam).
For `"quifam"` the role `0` is "chef" (head of family), the role `1` is "part" (partner).

With `"id*"` and `"qui*"` variables, entities are modeled so the core engine knows which person is into which entity.

For example the following test case defined for the year `2015`:

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

can be expressed with these vectors:

```json
{
  "activite": [ 4, 2, 2, 4 ],
  "date_naissance": [ "1980-01-01", "2005-01-01", "2003-01-01", "1997-01-01" ],
  "idfam": [ 0, 0, 0, 0 ],
  "idfoy": [ 0, 0, 0, 0 ],
  "idmen": [ 0, 0, 0, 0 ],
  "quifam": [ 0, 2, 3, 4 ],
  "quifoy": [ 0, 2, 3, 4 ],
  "quimen": [ 0, 2, 3, 4 ],
  "salaire_de_base": [ 15000.0, 0.0, 0.0, 0.0 ],
  "loyer": [ 1500.0 ]
}
```

Notice the different sizes of the vectors, and the disappearance of the person identifiers
(`"parent1"`, `"enfant1"`, etc.).

Then OpenFisca core engine can start calculating the asked variables, using the given input variables as any
calculated variable result.