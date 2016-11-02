# Periods

> For a better understanding of this section please read first the [periods](periods.md) definition

Every variable formulas needs to be defined over a specific period or needs values of other variables on a specific period.  
We show you here how to call the right period in the definition function.

First note : every period formulas is defined *relatively* to the period for which they are called. For example the period given in the input data.

Let's say for the seek  of the demo that we have given the year 2015 as input.

```python
from openfisca_core import periods 
period = periods.period('2015')
```
As told previously, this module will convert our date as :
 - an unit ('year')
 - a starting instant ('2015, 1, 1')
 - a quantity ('1' for one year)

>NB: it gives as default starting instant the beginning of the year, as though we had given '2015-01-01'

##### Defining a period from an instant
















##### Calling for the present year/month

If you want to define the variable over the present month or year, just use the function `this_year` or `this_month`

Example : the [`irpp`](https://legislation.openfisca.fr/variables/irpp) is defined for the present year:

```python
class irpp(Variable):
    ...
    def function(self, simulation, period):
       ...
        period = period.this_year
```





> Code Source is in the [periods.py](https://github.com/openfisca/openfisca-core/blob/master/openfisca_core/periods.py) file in the `Openfisca_core` module
