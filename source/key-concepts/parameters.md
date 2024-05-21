# Parameters

A parameter is a property of the legislation that changes over time.

Unlike a [variable](./variables.md), a parameter is **not** specific to a specific entity (person, household…).

For instance:

- the amount of the minimum wage;
- the amount of family allowance per children;
- the marginal tax scale used to calculate the income tax;
- the maximum age at which a person is entitled to some benefits;
- the list of regions in which a tax is applicable…

Parameters are used in [formulas](./variables.md#formulas) to calculate variable values.

It is always advisable when modelling legislation in OpenFisca to create a parameter for any number described in the law and used in formulas rather than "hard coding" the number within a formula. Thus, if the parameter changes over time, OpenFisca will automatically retrieve the right parameter value for your calculation period.

[Read more about their implementation in OpenFisca](../coding-the-legislation/legislation_parameters.md).
