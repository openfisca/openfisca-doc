# Legislation parameters from IPP

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
