# Variables and formulas

A variable is property of a person, or an entity (e.g. a family).

For instance:

* The *birth date* of a person
* The amount of *basic income* (in France, *RSA*) a family can get in a month.
* The amount of *income tax* a household has to pay in a year.
* Weather a family is *living in Paris*, or not.

### Input variables

Some variables can only be given as inputs of a simulation. For instance, the *birth date* of a person.

### Formulas

Other variables can be calculated thanks to a **formula**.

A formula is a **function** that calculates the value of given variable, for a given period. To do so, it performs (usually arithmetic) operations on the values of other variables, the formula **dependencies**.

For instance :
* The *basic income* of a family can be calculated from its income, and some other information about its situation.
* The *income tax* of a tax household can be calculated the same way.

It is important to note that **all variables can be used as inputs**. This means that even if the *basic income* can be calculated from other variables, I can, for a given simulation, provide it as an input. Then, if another formula asks for the value of *basic income* for a month, the input value will be returned, and the *basic income* formula **won't be executed.**


 

