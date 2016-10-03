# Parameters


Each time a part of the legislation has a static value, we name it a *parameter*.

Parameters are involved in computation of [calculated variables](#calculated variables).

Legislation parameters are stored in an XML file:
[`param.xml`](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/param/param.xml).

They can be simple values or scales and are stored by date to collect the past values.
Even with simple values, there can be many values for the same parameter because of the multiple dates.

For instance, the calculation of the `irpp` variable will involve the `ir.recouvrement.min` parameter, also present in the [legislation explorer](http://legislation.openfisca.fr/parameters/ir.recouvrement.min).

There are functions to extract a subset of the whole legislation at a specific instant, which is necessary when writing the formula of a variable.

The [legislation explorer](http://legislation.openfisca.fr/) presents each parameter under its own URL.
For example [a simple value](http://legislation.openfisca.fr/parameters/prelsoc.rsa) or [a scale](http://legislation.openfisca.fr/parameters/ir.bareme)