# Writing tests

The recommended way to write tests is to use YAML tests.

Each formula should be tested at least with one test, and better with specific boundary values (thresholds for example).

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

## Common keys

- `name: ` takes a string as argument
- `period: ` takes a period as argument
- `keywords: `  (optional)
- `description: ` (optional)
- `absolute_error_margin: `  (optional) takes a float or an integer as argument
- `relative_error_margin: `  (optional) takes a float or an integer as argument
- `input_variables: ` takes variables as arguments
- `output_variables: ` takes variables as arguments
- other: any class defined in the model

## Syntax
### Basics
Start a test with `- `, which is the YAML nested series entry indicator, followed by a space, the field "name: ", and the test label as a string. 

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
```

Then, begin listing the relevant dictionnaries (or associative arrays in YAML terminology) of your test. Usually, one specifies the values associated to the keys `period: `, `keywords: `, `description: `, `absolute_error_margin: ` (or `relative_error_margin: `), `input_variables: `, `output_variables: ` as follows:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input_variables:
  output_variables:
```

As elements of subdictionnaries of the dictionnaries `input_variables: ` (and `output_variables: `), specify the variables of input (and of output) of the function you want to test, as follows:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input_variables:
    salaire_imposable: 20000
    salaire_brut: 20000
  output_variables:
    irpp: -1181
```

### Testing functions taking many individuals' characteristics as arguments

To test functions taking variables related to many individuals or to a family as arguments, use the following syntax elements. These elements are notably implemented in the last test of [cotisations_sociales_simulateur_IPP.yaml](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/tests/fonction_publique/cotisations_sociales_simulateur_IPP.yaml#L241-L300) In this case:

- do not include the field `input_variables: `. Instead, define a family, a taxable household and a household as a list of empty dictionnaries as follows:
```yaml
- name: "IRPP - Famille ayant des revenus salariaux de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  familles:
  menages:
  foyers_fiscaux:
```

- Specify the list of variables componing the family, the taxable household and the household, and the associated values of these variables as elements of dictionnaries of lists, as follows:
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

- define the variables related to each individual in the family as follows. Each individual is refered to with the key `- id:` which has for associated value the label of the individual. Define the dictionnary containing the variables and values related to each individual as follows:
```yaml
  individus:
    - id: "parent1"
      date_naissance: 1972-01-01
      depcom_entreprise: "69381"
      primes_fonction_publique: 500
    - id: "parent2"
      date_naissance: 1972-01-01
      depcom_entreprise: "69381"
      primes_fonction_publique: 500
      traitement_indiciaire_brut: 2000
    - id: "enfant1"
      date_naissance: 2000-01-01
    - id: "enfant2"
      date_naissance: 2009-01-01
```

- finally, define a dictionnary of the expected values of the output variables for all individuals whose characteristics are defined as input variables. Each output variable takes a list of length equal to the number of individuals defined in the test. E.g, for a family of four individuals with two working parents and two unemployed children, the output variable salaire_super_brut is defined as follows:
```yaml
  output_variables:
    salaire_super_brut: [3500, 2500, 0, 0]
```
### Testing functions using variables defined for multiple periods

If one of the input or output variables needs to be defined for multiple periods, create a dictionnary under the variable. Each element of the dictionnary is takes a period label as key, and the value of the variable for the period as associated value. See below for an example of this element of syntax:

```yaml
  individus:
    salaire_de_base:
      2013-01: 35 * 52 / 12 * 9
      2013-02: 35 * 52 / 12 * 9
      2013-03: 35 * 52 / 12 * 9
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
