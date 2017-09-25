# Case disjunction

## Limitations

Built-in python conditionnal structures are not compatible with [vector calculus](25_vectorial_computing.md).  
The following formula would for instance **break**:

```py
# THIS IS NOT A VALID OPENFISCA FORMULA
def formula(person, period):
    salary = person('salary', period)
    if salary < 1000:
        return 200
    else:
        return 0
```

Some solutions though exist to emulate these structures.

## Simple multiplication

Applying a condition is in many cases equivalent to a simple multiplication. For instance, our previous example can be rewritten:

```py
def formula(person, period):
    condition_salary = person('salary', period) < 1000
    return condition_salary * 200
```

For a person, if  `condition_salary` is `True` (equivalent to `1` in logical algebra), the returned result will be `200`. 
However, if `condition_salary` is `False` (equivalent to `0`), the returned result will be `0`.

## Ternary condition
 
Let's now write a formula that still returns `200` if the person salary is lower than `1000`, but `100` if this condition is not met.

The helper function `where` offers a simple syntax to handle these cases.

```py
def formula(person, period):
    condition_salary = person('salary', period) < 1000
    return where(condition_salary, 200, 100)
```

`where` takes 3 arguments: the condition, the value to return if the condition is met, and the value to return otherwise.

## Multiples conditions

Let's consider a more complex case, where we want to attribute to a person:
- `200` if their salary is less than `500`
- `100` if their salary is strictly more than `500`, but less than `1000`
- `50` if their salary is strictly more than `1000`, but less than `1500`
- `0` otherwise

We can use the helper function `select` to implement this behaviour:

```py
def formula(person, period):
    salary = person('salary', period)
    return select(
        [salary <= 500, salary <= 1000, salary <= 1500, salary > 1500],
        [200, 100, 50, 0],
        )
```

`select` takes two arguments:
- A list of conditions
- A list of values

If the first condition is met, the first value will be returned, without considering the other conditions. For instance, if `salary = 100`, `salary <= 500` is true and therefore `200` will be returned. It doesn't matter that `salary <= 1000` is also true.

If the first condition is not met, then only the second condition will be considered.

If no condition is met, `0` will be returned. The previous formula is thus strictly equivalent to:

```py
def formula(person, period):
    salary = person('salary', period)
    return select(
        [salary <= 500, salary <= 1000, salary <= 1500],
        [200, 100, 50],
        )
```

## Complex conditions

Complex conditions can be coded combining `*` as `and` and `+` as `or`.

For instance, let's consider that a person will be granted `200` if either:
    - They are more than 25 *and* make less than `1000` per month
    - They are in a situation of handicap

```py
def formula(person, period):
    condition_age = person('age') >= 25
    condition_salary = person('salary', period) < 1000
    condition_handicap = person('handicap')
    condition = condition_age * condition_salary + condition_handicap
    return condition * 200
```

It is considered a good practice to always use helpers `where` and `select` when they are relevant, and not to emulate their behaviour manually with logical operations.

## Using a dynamic parameter calculation

If the result of your formula depends on a variable that can take only a finite amount of values, check out the [Computing a parameter that depends on a variable](legislation_parameters.md#computing-a-parameter-that-depends-on-a-variable) section.
