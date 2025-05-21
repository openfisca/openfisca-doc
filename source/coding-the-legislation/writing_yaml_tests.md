# Writing YAML tests

The recommended way to write tests is to use YAML tests.

Each formula should be tested at least with one test, and better with specific boundary values (thresholds for example).

> Terminology: Python dictionaries are called associative arrays in YAML.

## Example

In [`irpp.yaml`](https://github.com/openfisca/openfisca-france/blob/29.3.7/tests/formulas/irpp.yaml) we see:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input:
    salaire_imposable: 20000
  output:
    irpp: -1181
```

## Common keys

- `name` (string)
- `period` (string with period syntax)
- `keywords`  (list of strings, optional)
- `description` (string, optional, multiline)
- `absolute_error_margin` (number, optional)
- `relative_error_margin` (number, optional)
- `input` (associative array, keys are variable names, values are numbers)
- `output` (associative array, keys are variable names, values are numbers)
- `reforms` (list of openfisca reform modules to be applied to the baseline tax-benefit system)
- other (any key defined in the model)

## Syntax

### Testing formulas by giving input variables

This is the simplest way to test formulas when you only need to give input values for only one individual.

- First, name your test. Start a test with `-`, which is the YAML list separator, followed by a space, the field `name`, and the test name as a string.

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
```

- Then add the other relevant keys to your test. Usually, one defines the keys `period`, `keywords`, `description`, `absolute_error_margin` (or `relative_error_margin`) and their associated chosen values as follows:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
```

- Create nested dictionaries within the keys `input` and `output`,
which keys are variable names and values are numbers, respectively input and expected values.
For instance:

```yaml
- name: "IRPP - Célibataire ayant des revenus salariaux (1AJ) de 20 000 €"
  period: 2012
  absolute_error_margin: 0.5
  input:
    salaire_imposable: 20000
    salaire_brut: 20000
  output:
    irpp: -1181
```

- If variables are defined for different periods, you can
override the default period specified for the test by providing
periodic values.
For instance:

```yaml
- name: Income below 50,000 and Age at or over 55 qualifies
  period: 2021-12-01
  input:
    age: 55 # Defined with the period DAY
    income: # Defined with the period YEAR
      2021: 49999
  output:
    eligible: True
```

### Testing formulas by giving a test case

This is the simplest way to test formulas when you need to give input values for many individuals
which are dispatched into entities.

> See the last test of [cotisations_sociales_simulateur_IPP.yaml](https://github.com/openfisca/openfisca-france/blob/221147983dabb7d3971b7f1ed86d44346fca449a/tests/cotisations_sociales_simulateur_IPP.yaml#L186-244)

In this case, there is another convention:

- Do not include the variables directly as keys of the `input`. Instead, define new keys corresponding to the entities:

    ```yaml
    - name: "IRPP - Famille ayant des revenus salariaux de 20 000 €"
      period: 2012
      absolute_error_margin: 0.5
      input:
        individus:
          # ...
        familles:
          # ...
        menages:
          # ...
        foyers_fiscaux:
          # ...
    ```

- Define the individuals with their `id` and their variables:

    ```yaml
      individus:
        parent1:
          date_naissance: 1972-01-01
          depcom_entreprise: "69381"
          primes_fonction_publique: 500
        parent2:
          date_naissance: 1972-01-01
          depcom_entreprise: "69381"
          primes_fonction_publique: 500
          traitement_indiciaire_brut: 2000
        enfant1:
          date_naissance: 2000-01-01
        enfant2:
          date_naissance: 2009-01-01
    ```

- Specify the relations between individuals and their entity:

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

- Specifying all entities is not mandatory. For any entity that is not specified, all individuals are assumed to be in "a group of their own". Which means if you do not specify any families, OpenFisca assumes that each individual is the lone member of a one-person family. This applies to web API payloads as well as test cases.

- Finally, define a dictionary of the expected values of the output variables. Each output variable takes a list of length equal to the number of individuals defined in the test. E.g, for a family of four individuals with two working parents and two unemployed children, the output variable salaire_super_brut is defined as follows:

    ```yaml
    output:
        salaire_super_brut: [3500, 2500, 0, 0]
    ```

### Testing formulas using variables defined for multiple periods

Input or output variables can be defined for multiple periods by giving an associated array
which keys are a period expression and values are the value for that period.

Values can be arithmetic expressions too.

```yaml
  individus:
    salaire_de_base:
      2013-01: 35 * 52 / 12 * 9
      2013-02: 35 * 52 / 12 * 9
      2013-03: 35 * 52 / 12 * 9
```

### Testing a variable using a reform

[Reforms](./reforms.md) can be applied to the baseline tax and benefit system, in the reforms key, as a list.

```yaml
- name: "Combination of 2 reforms"
  reforms:
    - module.of.first_reform
    - module.of.second_reform
```

You can find examples of YAML tests of tax and benefit systems with reforms applied on the [country template](https://github.com/openfisca/country-template/tree/main/openfisca_country_template/tests/reforms).

## Running a test

To run YAML tests, use the command line tool [`openfisca test`](../../openfisca-python-api/openfisca_test):

```sh
openfisca test path/to/file.yaml
```

## Next steps

Other kinds of tests exist, see [contribute/tests](../contribute/tests.md).
