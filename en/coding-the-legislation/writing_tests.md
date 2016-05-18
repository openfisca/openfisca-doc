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

## Fields

- `name`
- `period`
- `input_variables`
- `output_variables`

TODO

## Running a test

TODO

## Next steps

Other kinds of tests exist, see [contribute/tests](../contribute/tests.html).
