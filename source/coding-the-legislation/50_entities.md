# Entities

Every variable is defined for a type of [entity](../key-concepts/person,_entities,_role.md): for instance persons or households.

However, I may for instance:
- in a formula defined for a person, want to know some property of their household.
- in a formula defined for a household, want to know some property of the household members.

## Group entity composition

You can get the number of person with a given role in an entity with the `nb_persons(role)` method. If no role is given, it will return the numbers of people in the entity.

```py
    def formula(household, period):
        nb_persons = household.nb_persons()
        nb_adults = household.nb_persons(Household.ADULT)
        nb_children = household.nb_persons(Household.CHILD)
```

Note that roles are constants that can be accessed from their entity with the notation `Entity.ROLE` (in uppercase).

## Check if a person has a given role

You can know whether a person has a certain role with the `has_role(role)` method:

```py
    def formula(person, period):
        is_adult = person.has_role(Household.ADULT)
        is_child = person.has_role(Household.CHILD)
```


## Aggregation

For an entity, several methods allow you to aggregate the values of a quantity defined for its members.

`entity.members('variable_name', period)` allows you to calculate the value of a variable for all members of an entity.

`entity.sum(result)` sums previously calculated results. Similar functions such as `min`, `max`, `any`, and `all` work the same way.

For instance, let's imagine a basic income paid to households with the following rules:
* Any household is entitled to 500€ a month per adult, and 200€ a month per children.
* The sum of salaries from all household members are deducted from the amount of the benefit.

```py
class basic_income(Variable):
    value_type = float
    entity = Household
    label = u"Basic income paid to households"
    definition_period = MONTH

    def formula(household, period):
        nb_adults = household.nb_persons(Household.ADULT)
        nb_children = household.nb_persons(Household.CHILD)
        salaries = household.members('salary', period)
        sum_salaries = household.sum(salaries)

        result = nb_adults * 500 + nb_children * 200 - sum_salaries
        result = max_(result, 0)

        return result
```

## Projection

`person.entity('variable_name', period)` allows you to get the value of `variable_name` for the entity containing `person`.

Let's for example consider that any college student whose family benefits from the basic income will also individually be granted a scholarship of 100€ per month:

```py
class college_scholarship(Variable):
    value_type = float
    entity = Person
    label = u"College Scholarship for basic income recipients."
    definition_period = MONTH

    def formula(person, period):
        is_student = person('is_student', period)
        has_household_basic_income = person.household('basic_income', period) > 0

        return is_student * has_household_basic_income * 100
```

Similarly, `entity.unique_role('variable_name', period)` allows you to get the value of `variable_name` for `person` who has the role `unique_role` in `entity`.

For instance, let's assume `Household` has two unique roles, `main_declarant` and `partner`.

```py
def formula(household, period):
    household.main_declarant('salary', period) # main declarant's salary
    household.partner('salary', period) # partner's salary
```
