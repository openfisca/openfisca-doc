# Variables

#### Definition

In Openfisca two types of variable coexist :


 ###### 1- Input variable
 
It is information given by the user and related to her situation.  

Examples : ```date_de_naissance``` or ```salaire_de_base```

 ######2- Calculated variable

It is the taxes or benefits calculated by OpenFisca. Therefore they have a computation formula which will involve other variables to get the result. 

Examples : ```irpp``` (impôt sur le revenu) or ```rsa``` (revenu de solidarité active).

 > - Calculated variables can be bypassed if an actual value is given.

The other variables used for computation are called the *dependencies*. The dependencies might be either calculated or input variables.   


 > - If dependencies are not found, default values are used (most of the time `0`).

#### The Legislation Explorer tool

You can have a look of all variables implemented in OpenFisca through the [Legislation Explorer](https://legislation.openfisca.fr/) tool.

You can choose between two visualizations:
- the [graph](https://legislation.openfisca.fr/graph/) which is a great view of the french legislation as a tree. This pedagogical tool allows you to explore all dependencies between the multiple taxes and benefits of the french system.
- the [list](https://legislation.openfisca.fr/variables) : all variables of OpenFisca is listed. This is an exhaustive panorama where you can navigate thanks to the search fonction of your navigator.

>  You will find on this website the **source code** of every variables which allows you to understand how they are computed in OpenFisca.

Example : the revenu disponible,  [```"revdisp"```](https://legislation.openfisca.fr/variables/revdisp)

if you're searching a variable which is not yet implemented you can ask our team thanks to the [forum](https://forum.openfisca.fr/).

#### Variables and time

Some variables are measures that were valid only for a given period or that have been modified. For example, the "Prime pour l'emploi" has been deleted in 2015. It will then be a *Dated_fonction* and you will see in the Legislation Explorer its validity period. 

Example: [PPE](https://legislation.openfisca.fr/variables/ppe)