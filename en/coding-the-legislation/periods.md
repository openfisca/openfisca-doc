# Periods

> For a better understanding of this section please read first the [periods](periods.md) definition  
>  *The Code Source is to find  in the [periods.py](https://github.com/openfisca/openfisca-core/blob/master/openfisca_core/periods.py) file in the `Openfisca_core` module.*

Every variable formulas needs to be defined over a specific period or needs values of other variables on a specific period.  

This section is dedicated to a full comprehension of coding the time in OpenFisca.

First let's have a brief look on how to **convert time** in OpenFisca object:   
[The module `periods`](https://doc.openfisca.fr/en/coding-the-legislation/periods.html#the-module-periods)   
And then how to **code variable** with calls to convenient period:    
[Calling periods in variable definition](https://doc.openfisca.fr/en/coding-the-legislation/periods.html#calling-periods-in-variable-definition)
### The `periods` module

The OpenFisca `periods` module converts [OpenFisca formatted time string](https://doc.openfisca.fr/en/periodsinstants.html#implementation-in-openfisca) to *Instant* or *Periods*.

Let's say for the seek  of the demo that we have given the date 15th March 2015 as input.

```python
from openfisca_core import periods 
ourperiod = periods.period('2015-03-15')
# Return : Period((u'day', Instant((2015, 3, 15)), 1))
```
This module converts our date as :
 - an unit ('day')
 - a starting instant ('2015, 3, 15')
 - a quantity ('1' for one day)

>NB: If we have given as input only a year (ex: 2015) it puts as default starting instant the beginning of the year, as though we had given '2015-01-01'

#### The attributes of `period`

The goal of this section : having an overview of the object `period` in OpenFisca.
- The attribute `start`:

It returns from the tuple *period* the starting *instant* of our date.

```python
periods.period('2015-03-15').start
# Return : Instant((2015, 3, 15))
```

- The attribute `offset`  

1) *On an Instant*   

Taking as input the *starting instant*, it returns the first or the last *instant* of the corresponding year or the corresponding month.

It takes as first argument `'first-of'` or `'last-of'` and as second argument `'month'` or `'year'`. 

```python
ourperiod = periods.period('2015-03-15')
ourperiod.start.offset('first-of', 'year')
# Return : Instant((2015, 1, 1))
ourperiod.start.offset('first-of', 'month')
# Return : Instant((2015, 3, 1))
ourperiod.start.offset('last-of', 'year')
# Return : Instant((2015, 12, 31))
```
>**Note** : If the input period is a year (ex: '2015'),   
``` 
period.start = period.start.offset('first-of', 'year') 
             = period.start.offset('first-of', 'month')
             = Instant((2015, 1, 1))`
             ```
             
  2) *On a Period*   
 It takes as argument a number and returns the *period* back in the past over the given number of unit.
 
 ```python
periods.period('2015-03-15').offset(-2)
# Return : Period((u'day', Instant((2015, 3, 13)), 1))
periods.period('2015').offset(-2)
# Return : Period((u'year', Instant((2013, 1, 1)), 1))
```
 

- The attribute `period`  

It creates a period of the specified unit which begins at the given starting instant.


```python
ourperiod = periods.period('2015-03-15')
ourperiod.start.offset('first-of', 'year').period('year')
# Return : Period((u'year', Instant((2015, 1, 1)), 1))
ourperiod.start.offset('first-of', 'month').period('month')
# Return : Period((u'month', Instant((2015, 3, 1)), 1))
```
If you want several of this unit, add it as an argument.
```python
ourperiod.start.offset('first-of', 'year').period('year',3)
# Return : Period((u'year', Instant((2015, 1, 1)), 3))
```
This expression means three years starting in 2015.

       

### Calling periods in variable definition

We show you here how to call the right period in the definition formula of variables.

First note : every period of variable formulas is defined *relatively* to the period for which the variable is called.  

For example the period given in the input data. 


#### Calling for the current year/month
We call the current year/month the year/month corresponding to the period given in the input.

Following previous instructions, the current year is coded as this :
```python
current_year = period.start.offset('first-of', 'year').period('year')
current_month = period.start.offset('first-of', 'month').period('month')
```

But to simplify this line, the attributes  `this_year` and `this_month` have been created in OpenFisca.

Example : the [`irpp`](https://legislation.openfisca.fr/variables/irpp) is defined for the current year:

```python
class irpp(Variable):
    ...
    def function(self, simulation, period):
       ...
        period = period.this_year
```

#### Calling for past year/month

Sometimes function needs information for past years or months.

The syntax for getting last month is :
```python
last_month = period.start.offset('first-of','month').period('month').offset(-1)
```
If you need the information for several past months/years:

```python
last_2_year = period.start.offset('first-of','year').period('year',2).offset(-2)
```

Example : the [`rsa` eligibility](https://legislation.openfisca.fr/variables/rsa_base_ressources_minima_sociaux) depends of the resources for the past three months

```python
class rsa_base_ressources_minima_sociaux(Variable):
   ...

    def function(self, simulation, period):
        period = period.start.offset('first-of', 'month')
        three_previous_months = period.period('month', 3).offset(-3)
        ...
     
```
Actually exists in OpenFisca an abbreviate expression : `last_3_month` 

You will find in [periods.py](https://github.com/openfisca/openfisca-core/blob/master/openfisca_core/periods.py) file other syntax abbreviation as `last_year` or `kast_month`.


