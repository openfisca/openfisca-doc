# Variables

#### Definition

In Openfisca two types of variables coexist :
- *Input variables* : information given by the user.
- *Calculated variables* : taxes or benefits calculated by OpenFisca. 

*Input variables* are variables which are related to the situation of the user.  
Examples : ```date_de_naissance``` or ```salaire_de_base```

*Calculated variables* have a computation formula which will involve other variables to get the result. These variables are called the dependencies. The dependencies are either calculated, either looked in input variables. 
 > - If not dependencies are not found, default values are used (most of the time `0`).
 > - Calculated variables can be bypassed if an actual value is given.

Examples : ```irpp``` (impôt sur le revenu) or ```rsa``` (revenu de solidarité active).

#### The Legislation Explorer tool

You can have a look of all variables implemented in OpenFisca through the [Legislation Explorer](https://legislation.openfisca.fr/) tool.

You can choose between two visualizations:
- the [graph](https://legislation.openfisca.fr/graph/) which is a great view of the french legislation as a tree. This pedagogical tool allows you to explore all dependencies between the numerous taxes and benefits of the french system.
- the [list](https://legislation.openfisca.fr/variables) : all variables of OpenFisca is listed. This is an exhaustive panorama where you can navigate thanks to the search fonction of your navigator.

>  You will find on this website the **source code** of every variables which allows you to understand how they are computed in OpenFisca.

If you're searching a variable which is not yet implemented you can ask our team 

#### Variables and periods

Variables values (input or calculated) are associated to a period.

Input variables are defined given a period. For example you give a salary amount for a period of 6 months.

When a variable is called, a period is given.
For example you want to know the amount of a tax for a specific year.

But sometimes the asked period isn't calculable so the core engine returns the value for another period.
There are some strategies to deal with these periods mismatch, which are documented later.

The [legislation explorer](http://legislation.openfisca.fr/) presents each variable under its own URL.
For example [`irpp`](http://legislation.openfisca.fr/variables/irpp).