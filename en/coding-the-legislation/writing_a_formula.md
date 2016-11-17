# Writing a formula
  
## Prerequisite:
  - Understand the concept of variables and formulas in Openfisca.



## Example with period handling

Sometimes, you need to estimate a variable for a different period that it is defined for. For instance, if our previous tax is paid yearly instead of monthly, we will need the sum of the salary for a given year, while a salary is by definition paid monthly.The `options` argument will help you in these cases:

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and yearly paid tax on salaries"

    def function(person, period, legislation):
        period = period.this_year
        salary = person('salary', period.last_year, options = [ADD])
        
        return period, salary * legislation(period).taxes.salary.rate
```


## Example with entity handling

Sometimes, several entities can be involved in a calculation.

### Aggregation

Let's imagine a basic income paid to households with the following rules:
* Any household is entitled to 500€ a month per adult, and 200€ a month per children.
* Salaries from all household members are deducted from the amount of the benefit.

```py
class basic_income(Variable):
    column = FloatCol
    entity = Household
    label = u"Basic income paid to households"

    def function(household, period):
        period = period.this_month
        nb_adults = household.nb_persons(Household.ADULT)
        nb_children = household.nb_persons(Household.CHILD)
        salaries = household.members('salary', period)
        sum_salaries = household.sum(salaries)
        
        result = nb_adults * 500 + nb_children * 200 - sum_salaries
        
        return period, result
```

* The method `entity.nb_persons(role)` returns the number of person within an entity that have the given role. If no role is given, it will return the numbers of people in the entity.
* Roles can be accessed from their entity with the notation `Entity.ROLE`. 
*  `entity.members('variable_name', period)` allows you to calculate the value of a variable for all members of an entity.
*  `entity.sum(result)` sums previously calculated results. Similar functions such as `min`, `max`, `any`, `all` work the same way.

### Projection

Let's now consider that any college student whose family benefits from the basic income will also individually be granted a scholarship of 100€ per month.

```py
class college_scholarship(Variable):
    column = FloatCol
    entity = Person
    label = u"College Scholarship for basic income recipients."

    def function(person, period):
        period = period.this_month
        is_student = person('is_student', period)
        has_household_basic_income = person.household('basic_income', period) > 0
                
        return period, is_student * has_household_basic_income * 100
```
*  `person.entity('variable_name, period)` returns the value of a variable defined for the entity, projected on the person.
*  You can also project results the other way around. If we have defined two unique roles in our household, `main_declarant` and `partner`, you can use `household.main_declarant('salary', period)` to get, for a household, the value of the salary of its main declarant.