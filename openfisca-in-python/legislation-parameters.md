# Legislation parameters

## Definition

The legislation parameters are stored in a file named [`param.xml`](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/param/param.xml).

It contains parameters which can be simple parameters (`<CODE>` tags) or scales (`<BAREME>` tags).

It is ordered as a tree defined by `<NODE>` tags.

Here is a simple parameter sample:

```xml
<CODE code="taux_plein" description="taux plein de la CSG déductible" format="percent">
  <VALUE deb="2005-01-01" fin="2014-12-31" valeur=".042" />
  <VALUE deb="1998-01-01" fin="2004-12-31" valeur=".038" />
  <VALUE deb="1997-01-01" fin="1997-12-31" valeur=".01" />
</CODE>
```

The `param.xml` file itself has a start and an end date.

## Query

Formulas retrieve parameters using the `simulation.legislation_at(instant)` method.

- if `instant` >= `root_end_date`
  - if value_end_date >= root_end_date return last known value
  - else return `0`
- else if `instant` <= `root_start_date`
  - if value_start_date <= root_start_date return first known value
  - else return `0`
- else return value

Usage example ([see in context](https://github.com/openfisca/openfisca-france/blob/6d82367a761ed36401f9b78e0fa5ed50d62673d1/openfisca_france/model/prelevements_obligatoires/impot_revenu/charges_deductibles.py#L436)):

```python
def function(self, simulation, period):
    period = period.start.offset('first-of', 'year').period('year')
    f6eu = simulation.calculate('f6eu', period)
    f6ev = simulation.calculate('f6ev', period)
    acc75a = simulation.legislation_at(period.start).ir.charges_deductibles.acc75a
    amax = acc75a.max * max_(1, f6ev)
    return period, min_(f6eu, amax)
```

## Merge with values from IPP

This section is specific to OpenFisca-France.

Each year [<abbr title="Institut des politiques publiques">IPP</abbr>](http://www.ipp.eu/) produces high quality rates and scales.

The aim of the OpenFisca project is to merge its XML parameters file with those of IPP.

IPP files are [Excel (XLS)](https://git.framasoft.org/french-tax-and-benefit-tables/ipp-tax-and-benefit-tables-xlsx) files, so there is a need to convert them first in a script-friendly format (which is YAML), then merge them with OpenFisca XLS file.

First XLS files are transformed into [raw YAML files](https://git.framasoft.org/french-tax-and-benefit-tables/ipp-tax-and-benefit-tables-yaml-raw) then into [clean YAML files](https://git.framasoft.org/french-tax-and-benefit-tables/ipp-tax-and-benefit-tables-yaml-clean) using [these scripts](https://git.framasoft.org/french-tax-and-benefit-tables/ipp-tax-and-benefit-tables-converters).

Then these clean YAML files are merged with the existing `param.xml` by [this script](https://github.com/openfisca/openfisca-france/blob/baremes-ipp/openfisca_france/scripts/merge_ipp_tax_and_benefit_tables_with_parameters.py) which produces a new XML legislation file for OpenFisca.

Also these clean YAML files are transformed into [CSV files](https://git.framasoft.org/french-tax-and-benefit-tables/taxipp-parameters) to be reused at the IPP by [TAXIPP](http://www.ipp.eu/outils/taxipp-outils/) by [this script](https://git.framasoft.org/french-tax-and-benefit-tables/ipp-tax-and-benefit-tables-converters/blob/master/ipp_tax_and_benefit_tables_yaml_to_taxipp_csv.py).

We are still working on this merge operation.

For now the source of truth for IPP parameters are the XLS files and for OpenFisca `param.xml`.
One day the source of truth will certainly be the YAML files, and their edition will probably be eased by a web tool like a modified version of the [Legislation Explorer](http://legislation.openfisca.fr/).