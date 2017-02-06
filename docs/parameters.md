# Parameters

#### Definition
Each time a part of the legislation has a static value, we name it a *parameter*.

Parameters are involved in computation of calculated variables.

They can be:
- simple values : ["âge limite des personnes à charge pour la CMU"](https://legislation.openfisca.fr/parameters/cmu.age_limite_pac)
- scales : ["barême de l'impôt sur le revenu"](https://legislation.openfisca.fr/parameters/ir.bareme)

You can find also all the past values of your parameter. 

As for the variable, you can have a view of all parameters implemented in OpenFisca on the [Legislation Explorer](https://legislation.openfisca.fr/parameters).

#### Application : where to find the parameters 

Legislation parameters are stored in an XML file:
[`param.xml`](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/param/param.xml). 