# Variables and formulas

The legislation of a country contains entities characteristics and computable rules. Entities characteristics are modelled into **input variables**. Computable rules can be modelled into **variables with formulas**.

A **variable** is property of a _person_, or a _group entity_ (e.g. a _family_).

For instance:

* The **birth date** of a _person_
* The amount of **basic income** a _family_ can get in a month.
* The amount of **income tax** a _household_ has to pay in a year.
* Whether a _family_ is **living in Paris**, or not.

## Input variables

Some variables can only be given as inputs of a simulation. For instance, the **birth date** of a _person_.

## Formulas

Other variables can be calculated thanks to a **formula**.

A formula is a **function** that calculates the value of a given variable, for a given period. To do so, it performs (usually arithmetic) operations on the values of other variables, the formula's **dependencies**.

For instance:

* The **basic income** of a _family_ can be calculated from its **income**, and some other information about its situation.
* The **income tax** of a tax _household_ can be calculated the same way.

It is important to note that **all variables can be used as inputs**. This means that even if the **basic income** can be calculated from other variables, it can, for a given simulation, be provided as an input. In this situation if another formula asks for the value of **basic income** for a month, the input value will be returned, and the **basic income** formula _won't be executed_.

## Default values

When OpenFisca is not able to calculate the value of a variable for a requested period, it returns a **default value**.

The default value of a variable is returned:

* When the value of an input variable is requested and this variable has not been set in the input for the requested period.
    > For example:
    > Let's assume the default value of the input variable `student` is `False`. If the value of `student` for `2017-09` has **not** been set in the input of the simulation, then computing `student` for `2017-09` will return `False`.
* When the value of a variable with a formula is requested and no formula is defined for the requested period.
    > For example:
    > Let's assume the formula for the variable `basic_income` is defined as starting in `2015-01-01` and its default value is `0`. Computing `basic_income` for `2014-01-01` will return `0`, while computing `basic_income` for `2015-01-01` will use the formula.

Legislation modellers can [define a specific default value](../coding-the-legislation/20_input_variables.md#setting-a-default-value) for each variable.
