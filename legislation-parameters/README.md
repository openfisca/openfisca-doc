# Legislation parameters

## Definition

The legislation parameters are stored in a file named [`param.xml`](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/param/param.xml).

It contains parameters which can be simple parameters (`<CODE>` tags) or scales (`<BAREME>` tags).

It is ordered as a tree defined by `<NODE>` tags.

Here is a simple parameter sample:

```xml
<CODE code="taux_plein" description="taux plein de la CSG déductible" format="percent">
  <VALUE deb="2005-01-01" fin="2014-12-31" valeur=".042" />
  <VALUE deb="1998-01-01" fin="2004-12-31" valeur=".038" />
  <VALUE deb="1997-01-01" fin="1997-12-31" valeur=".01" />
</CODE>
```

The `param.xml` file itself has a start and an end date.

## Parameters and Time
 Coding a parameter means including the interval of time over which it is defined thanks to the attributes `deb` and `fin`.

 > HINT : Time is given as [Instant](../periodsinstants.md) with string syntax

 Example : the threshold of the [`decote`](https://legislation.openfisca.fr/parameters/ir.decote.seuil)

```xml
 <NODE code="decote" description="Décote">
      <CODE code="seuil" description="Seuil de la décôte" format="integer" type="monetary">
        <VALUE deb="2014-01-01" fuzzy="true" valeur="1016" />
        <VALUE deb="2013-01-01" fin="2013-12-31" valeur="1016" />
        <VALUE deb="2012-01-01" fin="2012-12-31" valeur="960" />
```
**The fuzzy attribute ** : if we don't know the end date of the parameter but it is still valid today we add the attribute `fuzzy = True`.   Example: for the `decote`, it will indefinitely have the 1016 value from the 1th January 2014.

## Query

Formulas retrieve parameters using the `simulation.legislation_at(instant)` method.

- if `instant` >= `root_end_date`
  - if value_end_date >= root_end_date return last known value
  - else return `0`
- else if `instant` <= `root_start_date`
  - if value_start_date <= root_start_date return first known value
  - else return `0`
- else return value

Usage example ([see in context](https://github.com/openfisca/openfisca-france/blob/6d82367a761ed36401f9b78e0fa5ed50d62673d1/openfisca_france/model/prelevements_obligatoires/impot_revenu/charges_deductibles.py#L436)):

```python
def function(self, simulation, period):
    period = period.start.offset('first-of', 'year').period('year')
    f6eu = simulation.calculate('f6eu', period)
    f6ev = simulation.calculate('f6ev', period)
    acc75a = simulation.legislation_at(period.start).ir.charges_deductibles.acc75a
    amax = acc75a.max * max_(1, f6ev)
    return period, min_(f6eu, amax)
```
