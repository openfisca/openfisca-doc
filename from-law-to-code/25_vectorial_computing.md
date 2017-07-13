# Vector calculus limitations

Openfisca calculation are all **vectorial**. This means that any calculation can be done at the same time for a big number of persons, families, etc.
This enables fast calculations for a big population, but comes with some constraints.

## Vectors

Each computation in OpenFisca returns a **vector**. For instance, for a simulation containing 3 persons whose ages are 45, 42, and 41, executing the following formula:

```py
def function(person, period):
    age = person('age', period)
    print(age)     
```

will print:
```
array([45, 42, 17])
```

Basic operations such as `+` or `*` behave the same way on vectors than on numbers, you can thus use them in OpenFisca. However, some operations and structures must be adapted.


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
| `round`               | `round_(x,y)`                                                           |
