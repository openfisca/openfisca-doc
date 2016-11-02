# Variables

#### Definition

In Openfisca two types of variable coexist :


 ###### 1- Input variable
 
It is information given by the user and related to her situation.  

Examples : ```date_de_naissance``` or ```salaire_de_base```

 ######2- Calculated variable

It is the taxes or benefits calculated by OpenFisca. Therefore they have a computation formula which might involve other variables to get the result. 

Examples : ```irpp``` (impôt sur le revenu) or ```rsa``` (revenu de solidarité active).

 > - Calculated variables can be bypassed if an actual value is given.

The other variables used for computation are called the *dependencies*. The dependencies might be either calculated or input variables.   


 > - If dependencies are not found, default values are used (most of the time `0`).

#### The Legislation Explorer tool

You can have a look of all variables implemented in OpenFisca through the [Legislation Explorer](https://legislation.openfisca.fr/) tool.

To understand how to use it, please see the corresponding documentation Section [here](web-tools/legislation_explorer.md).

 

