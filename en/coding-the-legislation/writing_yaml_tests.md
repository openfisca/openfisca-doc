# Writing tests

The recommended way to write tests is to use YAML tests.

Each formula should be tested at least with one test, and better with specific boundary values (thresholds for example). // Do we need more guidelines to help determine which type of test is relevant or required ?

## Example

In [`irpp.yaml`](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/tests/formulas/irpp.yaml) we see:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input_variables:
    salaire_imposable: 20000
  output_variables:
    irpp: -1181
```

## Fields

- `name: `
- `period: `
- `keywords: `  (optional)
- `description: ` (optional)
- `absolute_error_margin: `  (optional) Do we have a convention on the error margins ?
- `relative_error_margin: `  (optional)
- `input_variables: `
- `output_variables: `

## Syntax
Start a test with a dash followed by a space, the field "name: ", and the test label as a string. 

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
```

Then, write one field per line, indenting the fields `period: `, `keywords: `, `description: `, `absolute_error_margin: ` (or `relative_error_margin: `), `input_variables: `, `output_variables: ` with two spaces.

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input_variables:
  output_variables:
```

List the relevant variables of input (and of output) of the function you want to test under `input_variables: ` (and `output_variables: `). Write each parameter on one line, indented with four spaces.

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input_variables:
    salaire_imposable: 20000
  output_variables:
    irpp: -1181
```

To test functions taking parameters related to many individuals or to a family, use the syntax implemented in the last test of [cotisations_sociales_simulateur_IPP.yaml](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/tests/fonction_publique/cotisations_sociales_simulateur_IPP.yaml#L241-L300) In this case:

- do not include the field `input_variables: `. Instead, define the components of the family and of the taxable household, and the variables related to the houseold. For instance, one can define a family, a household and a taxable household as follows:
```yaml
familles:
    parents: ["parent1", "parent2"]
    enfants: ["enfant1", "enfant2"]
menages:
    personne_de_reference: "parent1"
    conjoint: "parent2"
    enfants: ["enfant1", "enfant2"]
    zone_apl: 2
 foyers_fiscaux:
    declarants: ["parent1", "parent2"]
    personnes_a_charge: ["enfant1", "enfant2"]
```

  individus:
    - id: "parent1"
      date_naissance: 1972-01-01
      depcom_entreprise: "69381"
      primes_fonction_publique: 500
      traitement_indiciaire_brut: 2000
      taille_entreprise: 3  # TODO fix this
      categorie_salarie: 'public_titulaire_etat'
    - id: "parent2"
      date_naissance: 1972-01-01
      depcom_entreprise: "69381"
      primes_fonction_publique: 500
      traitement_indiciaire_brut: 2000
      taille_entreprise: 3  # TODO fix this
      categorie_salarie: 'public_titulaire_etat'
    - id: "enfant1"
      date_naissance: 2000-01-01
    - id: "enfant2"
      date_naissance: 2009-01-01

- precise the expected values of the output variables for all individuals whose characteristics are defined as input parameters. Each output variable takes a list of length equal to the number of individuals defined in the test. E.g, for a family of four individuals, the output variable salaire_super_brut is defined as follows:
```yaml
  output_variables:
    salaire_super_brut: [3500, 2500, 0, 0]
```


## Running a test:

In a ConEmu console, in openfisca-france, run:
```
python openfisca_france\tests\test_yaml.py openfisca_france\tests\your_test_directory\your_test_name.yaml
```

For instance, invoking the following will execute all tests in the fonction_publique directory:
```
python openfisca_france\tests\test_yaml.py openfisca_france\tests\fonction_publique 
```

## Next steps

Other kinds of tests exist, see [contribute/tests](../contribute/tests.html).
