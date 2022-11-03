# Variables and formulas

A variable is property of a person, or an entity (e.g. a family).

For instance:

* The _birth date_ of a person
* The amount of _basic income_ (in France, _RSA_) a family can get in a month.
* The amount of _income tax_ a household has to pay in a year.
* Whether a family is _living in Paris_, or not.

## Input variables

Some variables can only be given as inputs of a simulation. For instance, the _birth date_ of a person.

## Formulas

Other variables can be calculated thanks to a **formula**.

A formula is a **function** that calculates the value of given variable, for a given period. To do so, it performs (usually arithmetic) operations on the values of other variables, the formula **dependencies**.

For instance:

* The _basic income_ of a family can be calculated from its income, and some other information about its situation.
* The _income tax_ of a tax household can be calculated the same way.

It is important to note that **all variables can be used as inputs**. This means that even if the _basic income_ can be calculated from other variables, I can, for a given simulation, provide it as an input. Then, if another formula asks for the value of _basic income_ for a month, the input value will be returned, and the _basic income_ formula **won't be executed.**

## Default values

When OpenFisca is not able to calculate the value of a variable for a requested period, it returns a **default value**.

The default value of a variable is returned:

* When the value of an input variables is requested, if this variable has not been set in the input for the requested period.
    > For example:
    > Let's assume the input variable `student` default value is `False`. If the value of `student` for `2017-09` has **not** been set in the input of the simulation, then computing `student` for `2017-09` will return `False`.
* When the value of a variable with formulas is requested, if no formula is defined for the requested period.
    > For example:
    > Let's assume the variable `basic_income`'s formula is defined starting `2015-01-01`, and its default value is `0`. Computing `basic_income` for `2014-01-01` will return `0`, while computing `basic_income` for `2015-01-01` will use the formula.

Legislation writers can [define a specific default value](../coding-the-legislation/20_input_variables.md#setting-a-default-value) for each variable.
