# How to code the evolution of definitions over time

Some [variables](variables.md) or [parameters](parameters.md) were valid only for a given period or have been modified since first definition.    

For example:
- the ["Prime pour l'emploi"](https://legislation.openfisca.fr/variables/ppe) has been deleted in 2015.
- the amount of the ["RSA socle"](https://legislation.openfisca.fr/parameters/minim.rmi.rmi) evolves every year.


#### Coding Variables 
There is two situations :
 - if the variable is only defined for a specific time interval
 - if the variable definition evolves over time.
 
###### Over a specific time interval
Add as function attribute the start and/or end date of the variable.

Example: the [`bouclier fiscal`](https://legislation.openfisca.fr/variables/bouclier_fiscal)
```python
class bouclier_fiscal(Variable):
    column = FloatCol(default = 0)
    entity_class = FoyersFiscaux
    label = u"bouclier_fiscal"
    start_date = date(2006, 1, 1)
    stop_date = date(2010, 12, 31)
   

    def function(self, simulation, period):
        ..
        return period, bouclier_fiscal
```

###### Evolving Definition

To take it into account we use *Dated Functions*.   
Let's take as example the [`Prime de Noël (aefa)`](https://github.com/openfisca/openfisca-france/blob/4.1.17/openfisca_france/model/prestations/minima_sociaux/aefa.py) throughout.

   - First you have to declare a `class` Python object with the option `DatedVariable`.

```python
class aefa(DatedVariable):
    '''
    Aide exceptionelle de fin d'année (prime de Noël)
    '''
```

- Then you define the variable over the first period of existence. Use the decorator `@dated_function` with the start date and the end date.

```python
@dated_function(start = date(2002, 1, 1), stop = date(2007, 12, 31))
    def function__2008_(self, simulation, period):
        period = period.this_year
        age_holder = simulation.compute('age', period)
        ...
```
> If you omit the start date, the formula is valid to the stop date.   
> If you omit the end date, it is valid from the start date.

- Repeat the process until your variable is defined for all periods.

```python
class aefa(DatedVariable):
    '''
    Aide exceptionelle de fin d'année (prime de Noël)
    '''
    column = FloatCol
    entity_class = Familles
    label = u"Aide exceptionelle de fin d'année (prime de Noël)"

    @dated_function(start = date(2009, 1, 1))
    def function(self, simulation, period):
        ...
        return period, aefa

    @dated_function(start = date(2008, 1, 1), stop = date(2007, 12, 31))
    def function(self, simulation, period):
        ...
        return period, aefa
```
### Coding parameters

See the Coding Section for Parameters