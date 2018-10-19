# Troubleshooting

When a computation raises an error or returns a wrong or strange result, you can use one of these techniques to find out the reason.

## Enable the debug log
The debug log is printed by OpenFisca internals. It displays for each computed formula its inputs, its period and its result.
The computed variable appears last.

It uses the `logging` module of Python and is disabled by default.

Here is how to enable it:

```python
from openfisca_france import FranceTaxBenefitSystem
tax_benefit_system = FranceTaxBenefitSystem()
scenario = tax_benefit_system.new_scenario()
scenario.init_single_entity(
    period = 2015,
    parent1 = dict(
        salaire_de_base = 40000,
        ),
    )
simulation = scenario.new_simulation(debug=True)
irpp = simulation.calculate('irpp', 2015)
```

It displays (not shown here entirely):

```
INFO:openfisca_core.formulas:<=> enfant_a_charge@individus<2015>(age@individus<2015>[45], handicap@individus<2015>[False], quifoy@individus<2015>[0]) --> <2015>[False]
INFO:openfisca_core.formulas:<=> enfant_majeur_celibataire_sans_enfant@individus<2015>(age@individus<2015>[45], handicap@individus<2015>[False], quifoy@individus<2015>[0]) --> <2015>[False]
INFO:openfisca_core.formulas:<=> nbptr@foyers_fiscaux<2015>(nb_pac@foyers_fiscaux<2015>[0.0], maries_ou_pacses@foyers_fiscaux<2015>[False], celibataire_ou_divorce@foyers_fiscaux<2015>[True], veuf@foyers_fiscaux<2015>[False], jeune_veuf@foyers_fiscaux<2015>[False], nbF@foyers_fiscaux<2015>[0.0], nbG@foyers_fiscaux<2015>[0.0], nbH@foyers_fiscaux<2015>[0.0], nbI@foyers_fiscaux<2015>[0.0], nbR@foyers_fiscaux<2015>[0], nbJ@foyers_fiscaux<2015>[0], caseP@foyers_fiscaux<2015>[False], caseW@foyers_fiscaux<2015>[False], caseG@foyers_fiscaux<2015>[False], caseE@foyers_fiscaux<2015>[False], caseK@foyers_fiscaux<2015>[False], caseN@foyers_fiscaux<2015>[False], caseF@foyers_fiscaux<2015>[False], caseS@foyers_fiscaux<2015>[False], caseL@foyers_fiscaux<2015>[False], caseT@foyers_fiscaux<2015>[False]) --> <2015>[1.0]
INFO:openfisca_core.formulas:<=> indemnite_residence@individus<2015-01>(traitement_indiciaire_brut@individus<2015-01>[0.0], salaire_de_base@individus<2015-01>[3333.33], categorie_salarie@individus<2015-01>[0], zone_apl_individu@individus<2015-01>[2]) --> <2015-01>[0.0]
[...]
INFO:openfisca_core.formulas:<=> cotsyn@foyers_fiscaux<2015>(f7ac@individus<2015>[0], salaire_imposable@individus<2015>[32353.7], chomage_imposable@individus<2015>[0.0], retraite_imposable@individus<2015>[0.0]) --> <2015>[0.0]
INFO:openfisca_core.formulas:<=> rfr@foyers_fiscaux<2015>(rni@foyers_fiscaux<2015>[29118.7], f3va@individus<2015>[0], f3vi@individus<2015>[0], rfr_cd@foyers_fiscaux<2015>[0.0], rfr_rvcm@foyers_fiscaux<2015>[0.0], rpns_exon@individus<2015>[0.0], rpns_pvce@individus<2015>[0.0], rev_cap_lib@foyers_fiscaux<2015>[0.0], f3vz@foyers_fiscaux<2015>[0], microentreprise@foyers_fiscaux<2015>[0.0]) --> <2015>[29118.7]
INFO:openfisca_core.formulas:<=> cehr@foyers_fiscaux<2015>(rfr@foyers_fiscaux<2015>[29118.7], nb_adult@foyers_fiscaux<2015>[1.0]) --> <2015>[0.0]
INFO:openfisca_core.formulas:<=> irpp@foyers_fiscaux<2015>(iai@foyers_fiscaux<2015>[3091.05], credits_impot@foyers_fiscaux<2015>[0.0], cehr@foyers_fiscaux<2015>[0.0]) --> <2015>[-3091.05]
```

Note: if you work in a Jupyter notebook, you can activate logging by inserting this first cell in your notebook:

```python
import logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
```
