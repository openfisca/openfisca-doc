# Variables


Variables can be calculated or input.

Input variables are normal variables but don't have any formula defined.
Their value is given by the caller who runs the simulation.

Calculated variable have a formula which can be bypassed if an actual value is given.
Calculated variables have dependencies: variables involved in the formula.
The dependencies are either calculated, either looked in input variables. If not found, default values are used (most of the time `0`).

Variables values (input or calculated) are associated to a period.

Input variables are defined given a period. For example you give a salary amount for a period of 6 months.

When a variable is called, a period is given.
For example you want to know the amount of a tax for a specific year.

But sometimes the asked period isn't calculable so the core engine returns the value for another period.
There are some strategies to deal with these periods mismatch, which are documented later.

The [legislation explorer](http://legislation.openfisca.fr/) presents each variable under its own URL.
For example [`irpp`](http://legislation.openfisca.fr/variables/irpp).