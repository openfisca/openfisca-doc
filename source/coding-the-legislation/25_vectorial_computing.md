# Vectorial computing

OpenFisca calculation are all **vectorial**. That means they operate on arrays rather than single (“scalar”) values.

The practical benefit is that computations are almost as expensive for one entity as they are for hundred thousands. This is how datasets can be analysed and how reforms can be modelled accurately. However, to support this feature, you will need to apply some constraints on how you write formulas.


## Formulas always return vectors

Each [formula](../variables.md#formulas) computation in OpenFisca must return a vector.

For instance, for a simulation containing 3 persons whose ages are 41, 42 and 45, executing the following formula:

```py
def formula(persons, period, parameters):
    age = persons('age', period)
    print(age)
    # ... do some computation and return a value
```

will print `array([41, 42, 45])`.

This formula code will work the same if there is one Person or three or three million in the modelled situation. Formulas always receive as their first parameter an array of the [entity](./50_entities.md) on which they operate (e.g. *n* Person, Household…) and they should return an array of the same length.

Most of the time, formulas will refer to other variables and NumPy will do the appropriate computation without you even noticing:

```py
def formula(persons, period, parameters):
    tax_rebate = parameters(period).tax_rebate  # let's say this is 500
    eligibility_multiplier = persons('eligibility_multiplier', period)  # and this is [2, 0, 1]: there are three Persons
    return eligibility_multiplier * tax_rebate  # this is [1000, 0, 500]. We've returned a vector, yay!
```

### What happens if you don't return a vector

As programmers, we more often work with scalars than vectors. We thus have a tendency to write straightforward code that returns a scalar rather than a unidimensional vector (in other words, an array of length 1), and get stuck when wanting to loop over it:

```py
# THIS IS NOT A VALID OPENFISCA FORMULA
def formula(persons, period, parameters):
    tax_rebate = parameters(period).tax_rebate  # let's say this is worth 500
    rebate_threshold = tax_rebate * persons[0].eligibility_multiplier  # so this is 1000; see how we've accidentally left out other Persons?
    return rebate_threshold  # and this returns 1000. But it's not a vector!
```

OpenFisca will help you notice this mistake by raising an error:

> The formula 'tax_rebate@2018' should return a NumPy array; instead it returned '1000.0' of type 'float'.

In a similar fashion, if you expect a formula to return a boolean and forget that you will actually get an array of boolean values (one for each entity in the situation), you will receive the following safeguard error:

> ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all().

The rest of this page gives practical replacements for situations in which you get such errors.


## Control structures

Some usual control structures such as `if...else`, `switch`, and native Python logical operators such as `or` and `not` do not work with vectors. Semantically however, they all have alternatives, and the only change is in syntax.


### `if` / `else`

Let's say you want to write that logically reads as:

```py
# THIS IS NOT A VALID OPENFISCA FORMULA
def formula(person, period):
    salary = person('salary', period)
    if salary < 1000:
        return 200
    else:
        return 0
```

This code does not work: it makes the assumption that there is always one single person, and that its salary is provided as a number, while `salary` is actually a vector of salaries that could be of any length.

In such a case, apply the comparison to the _vector_ of salaries, which will create a vector of booleans, and then multiply it:

```py
def formula(persons, period):
    condition_salary = persons('salary', period) < 1000
    return condition_salary * 200
```

What happens is that for every Person in `persons`, if `condition_salary` is `True` (equivalent to `1` in logical algebra), the returned value will be `200`. And if `condition_salary` is `False` (equivalent to `0`), the returned value will be `0`.

### Ternaries

Let's now write a formula that returns `200` if the Person’s salary is lower than `1000`, and `100` otherwise.

The NumPy function [`where`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.where.html) offers a simple syntax to handle these cases.

```py
def formula(persons, period):
    condition_salary = persons('salary', period) < 1000
    return where(condition_salary, 200, 100)
```

[`where`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.where.html) takes 3 arguments: a vector of boolean values (the “condition”), the value to set for this element in the vector if the condition is met, and the value to set otherwise.

This `where` function is provided directly by NumPy. There are many other [NumPy functions](https://docs.scipy.org/doc/numpy/reference/routines.math.html#sums-products-differences) provided that can be useful.

### Multiples conditions

Let's consider a more complex case, where we want to attribute to a person:
- `200` if their salary is less than `500`;
- `100` if their salary is strictly more than `500`, but less than `1000;`
- `50` if their salary is strictly more than `1000`, but less than `1500;`
- `0` otherwise.

We can use the NumPy function [`select`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.select.html) to implement this behaviour:

```py
def formula(person, period):
    salary = person('salary', period)
    return select(
        [salary <= 500, salary <= 1000, salary <= 1500, salary > 1500],
        [200, 100, 50, 0],
        )
```

If the first condition is met, the first value will be assigned, without considering the other conditions. For instance, if `salary = 100`, `salary <= 500` is true and therefore `200` will be assigned. It doesn't matter that `salary <= 1000` is also true.

If the first condition is not met, then only the second condition will be considered, and so on. If no condition is met, `0` will be assigned.

### Complex conditions

If no [NumPy function](https://docs.scipy.org/doc/numpy/reference/routines.math.html#sums-products-differences) helps you express a very specific condition, you can code arbitrary conditions using `*` instead of `and`, and `+` instead of `or`.

For instance, let's consider that a person will be granted `200` if either:

- they are more than 25 *and* make less than `1000` per month;
- or they are disabled.

```py
def formula(person, period):
    condition_age = person('age') >= 25
    condition_salary = person('salary', period) < 1000
    condition_handicap = person('handicap')
    condition = condition_age * condition_salary + condition_handicap
    return condition * 200
```

> You should always use [NumPy function](https://docs.scipy.org/doc/numpy/reference/routines.math.html#sums-products-differences) such as [`where`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.where.html) and [`select`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.select.html) when they are relevant: logical operations using arithmetic operators should be used as last resort as they are not very readable.


## Arithmetic operations

Basic arithmetic operations such as `+` or `*` behave the same way on vectors than on numbers, you can thus use them in OpenFisca formulas. However, some operations must be adapted.

| Scalar (won't work) | Vectorial alternative |
|---------------------|-----------------------|
| `min`               | `min_(x,y)`           |
| `max`               | `max_(x,y)`           |
| `round`             | `round_(x,y)`         |


## Boolean operations

| Scalar (won't work) | Vectorial alternative |
|---------------------|-----------------------|
| `not`               | `not_(x,y)`           |
| `and`               | `x * y`               |
| `or`             | `x + y`               |


## String concatenation

The `+` operator, as well as formatted `%s` strings for concatenation should be replaced by a call to `concat(x, y)`.
