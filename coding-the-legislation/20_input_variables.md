# Introducing an input variable

The syntax to introduce an input variable is very similar to the one we used to code a formula.

For instance:

```py
class salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Salary earned by a person for a given month"
    period_behavior = MONTH
```


The only difference is that we do **not** have a formula to calculate the value of a variable.

If we ask the value of `salary` for a given month, the returned result will be:
* The **input** that was provided when initializing the simulation if it exists.
* The **default value** of the Variable if no input has been provided.

When declaring an input variable, you can change its default value by adding the argument `default` to the `column` attribute:

```py
class french_citizen(Variable):
    column = BoolCol(default = True)
    entity = Person
    label = u"Whether the person is a French citizen"
    period_behavior = YEAR
```

The default default value of a `Variable` is `0` for numeric variables and  `False` for boolean ones.
