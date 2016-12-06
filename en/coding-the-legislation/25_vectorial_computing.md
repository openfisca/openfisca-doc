# Vector calculus limitations

## Vector calculus

Openfisca calculation are all **vectorial**. This means that any calculation can be done at the same time for a big number of persons, families, etc. This enables fast calculations for a big population, but comes with some constraints.

## Forbidden operations and alternatives

Some classical control structures such as `if...else` or `switch`, and native python logical operators such as `or` and `not` **cannot** be used on a openfisca variable.

Here is a summary of the structures and operations you cannot use, and their licit alternatives:


| Forbidden             | Alternative                                                             |
|-----------------------|-------------------------------------------------------------------------|
| `if...else`, `switch` | `where`, `select`, `*` (See [Case disjunction](30_case_disjunction.md)) |
| `not`                 | `not_(x)`                                                               |
| `and`                 | `x * y`                                                                 |
| `or`                  | `x + y`                                                                 |
| `min`                 | `min_(x,y)`                                                             |
| `max`                 | `max_(x,y)`                                                             |
