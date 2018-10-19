# Inferences

Here are the places in which inferences take place in OpenFisca:

- In period management, through `calculate_output`, which can automatically sum or divide values over periods to match the requested period.
- In period management, through `set_input`, which can automatically sum or divide input values over periods to match the computable period.
- In some formulas, through `base_function`, which can yield values that the original requested formula could not compute on its own.
- In some formulas, through `max_nb_cycles`, which can block the computation toward the past and thus not allow some values to be computed.

These inferences are not considered good practice, as they tend to make computations less consistent and predictable. You should tend to avoid relying on them as much as possible.


## Known issues

### With `base_function`

Default values in input variables are the source of the issue: if a formula needs values that are undefined (e.g. because they are in previous months from the calculation), it won't crash nor log anything because the input variables return their default values. This inference behaviour seems to be fine for simulations based on a large population, but production would expect a time-based inference, where the value is copied from its closest defined value rather than a global default one.

The advised workaround is to _always_ request the period when requesting parameters, and to never rely on the fragile concept of a “simulation period”.
