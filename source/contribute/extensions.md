# OpenFisca extensions

Extensions allow you to define new variables or parameters for a tax and benefit system, while keeping their code separated from the main country package. They can only _add_ variables and parameters to the tax and benefit system: they cannot _modify_ or _neutralize_ existing ones.

They are for instance used to code local prestations.

> Extensions are sometimes confused with another mechanism: reforms. [Read more about their respective uses](../key-concepts/reforms.md#differences-between-reforms-and-extensions).

Extensions can be manually loaded to a tax and benefit system using the [load_extension](http://openfisca.readthedocs.io/en/latest/tax-benefit-system.html#openfisca_core.taxbenefitsystems.TaxBenefitSystem.load_extension) method.

## Extension architecture

The architecture of an extension folder is the following:

```sh
{extension_name}/ # The folder name is by convention the name of the extension.
    {extension_name}/__init__.py # Empty file.
    {extension_name}/{some_formula}.py # File containing formulas
    {extension_name}/{other_formula}.py
    {extension_name}/parameters # Optional parameters directory.
    {extension_name}/parameters/{new_tax}
    {extension_name}/parameters/{new_tax}/{rate}.yaml
    {extension_name}/tests/{some_formula}.yaml # Optional test files
    {extension_name}/tests/{other_formula}.yaml
```
All python files located directly in `{extension_name}/` are imported in the tax and benefit system.

The syntax of the formulas within extension python files is the same than in the general country package formulas (e.g. `from openfisca_france.model.base import *`).

Variables inside an extension should not have the same name than any existing formula, nor than any formula in another extension being used.
