# Reforms

##### Definition

 OpenFisca can also be used to test the impact of new propositions concerning the Tax and Benefit system: it is the module `Reform`

An *reform* represents a modified version of the Tax and Benefit legislation whose purpose is to be experimental.

It can be for adding, removing or modifying a variable, or a legislation parameter.




##### Implementation in OpenFisca

*Reforms* do not modify the *TaxBenefitSystem* itself, they create a shallow copy and modify only what changed.

Reforms are loaded given a *TaxBenefitSystem* and return an extended one.
They are published in their own `git` [repository](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/reforms).

###### Application: how to call a reform

Here we test a reform project already implemented: the fiscal reform of Landais, Piketty and Saez on the income tax (http://www.revolution-fiscale.fr/la-reforme-proposee)

```python
from openfisca_france.reforms import landais_piketty_saez
reform = landais_piketty_saez.landais_piketty_saez(tax_benefit_system)
```
Then you can follow the normal working flow (see the [Getting_Started Notebook](https://github.com/openfisca/openfisca-france/blob/master/notebooks/getting-started.ipynb)).

> For coding your own reform, see the [Reform section](coding-the-legislation/reforms.md) in the "Coding the Legislation" Section
