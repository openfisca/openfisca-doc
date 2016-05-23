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
- First, name your test. Start a test with `- `, which is the YAML nested series entry indicator, followed by a space, the field `name: `, and the test label as a string. 

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
```

- Then, begin listing the relevant elements of your test dictionnary (or associative arrays in YAML terminology). Usually, one defines the keys `period: `, `keywords: `, `description: `, `absolute_error_margin: ` (or `relative_error_margin: `) and their associated chosen values as follows:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
```

- Create subdictionnaries associated with the key `input_variables: ` (and `output_variables: `). These subdictionnaries take the labels of the variables of input (and of output) of the function you want to test as keys. For each key, specify the chosen value you want to test for as value of the dictionnary. For instance:

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

To test functions taking variables related to many individuals or to a family as arguments, use the following syntax elements. (These elements are notably implemented in the last test of [cotisations_sociales_simulateur_IPP.yaml](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/tests/fonction_publique/cotisations_sociales_simulateur_IPP.yaml#L241-L300)).

In this case:

- Do not include the field `input_variables: `. Instead, define a family, a taxable household and a household as a list of empty dictionnaries as follows:
```yaml
- name: "IRPP - Famille ayant des revenus salariaux de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  familles:
  menages:
  foyers_fiscaux:
```

- Then, specify the lists of variables belonging to the family (parents, enfants), the taxable household (personne_de_reference, conjoint, enfants) and the household (declarants, personnes_a_charge). The associated values of these variables are lists composed of the relevant individual's labels, as follows:

```yaml
familles:
    parents: ["parent1", "parent2"]
    enfants: ["enfant1", "enfant2"]
menages:
    personne_de_reference: "parent1"
    conjoint: "parent2"
    enfants: ["enfant1", "enfant2"]
 foyers_fiscaux:
    declarants: ["parent1", "parent2"]
    personnes_a_charge: ["enfant1", "enfant2"]
```

- Define the variables related to each individual as follows. Each individual is refered to with the key `- id:` which has for associated value the label of the individual. Define the dictionnary containing the variables and associated values characterizing each individual as follows:
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

- Finally, define a dictionnary of the expected values of the output variables. Each output variable takes a list of length equal to the number of individuals defined in the test. E.g, for a family of four individuals with two working parents and two unemployed children, the output variable salaire_super_brut is defined as follows:
```yaml
  output_variables:
    salaire_super_brut: [3500, 2500, 0, 0]
```
### Testing functions using variables defined for multiple periods

Some input or output variables need to be defined for multiple periods. In this case, a dictionnary must be associated to the variable. Each element of the dictionnary is composed of a period label (key), and the value of the variable for the period (value). See below for an example of this element of syntax:

```yaml
  individus:
    salaire_de_base:
      2013-01: 35 * 52 / 12 * 9
      2013-02: 35 * 52 / 12 * 9
      2013-03: 35 * 52 / 12 * 9
```

## Running a test:

The script `test_yaml.py`allow user to run part or all YAML tests.

In the console, run:
```
python openfisca_france\tests\test_yaml.py openfisca_france\tests\your_test_directory\your_test_name.yaml
```

For instance, invoking the following will execute all tests in the fonction_publique directory:
```
python openfisca_france\tests\test_yaml.py openfisca_france\tests\fonction_publique 
```

For more details
```
python openfisca_france\tests\test_yaml.py
```

## Next steps

Other kinds of tests exist, see [contribute/tests](../contribute/tests.html).
