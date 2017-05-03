# Legislation parameters

## Definition

The legislation parameters are stored in XML files in the directory `parameters` ([example in OpenFisca-France](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/parameters)).

Those files contain parameters which can be simple parameters (`<CODE>` tags) or scales (`<BAREME>` tags).

Parameters are organised in a tree defined by `<NODE>` tags.

Here is a simple parameter example:

```xml
<CODE code="full_rate" description="Full rate of social security protections" format="percent">
  <VALUE deb="2005-01-01" valeur=".042" />
  <VALUE deb="1998-01-01" valeur=".038" />
  <VALUE deb="1997-01-01" valeur=".01" />
</CODE>
```

## Parameters and time

Coding a parameter means defining a list of values, and for each value the date at which it starts to hold.

Example: a minimum wage

```xml
  <NODE code="labour" description="Labour parameters">
    <CODE code="minimum_wage" description="Minimum wage" format="integer" type="monetary">
      <VALUE deb="2014-01-01" valeur="1084" />
      <VALUE deb="2013-01-01" valeur="1016" />
      <VALUE deb="2012-01-01" valeur="960" />
      <VALUE deb="2010-01-01" valeur="878" />
    </CODE>
    ...
  </NODE>
```

Example: the threshold of the [`decote`](https://legislation.openfisca.fr/parameters/impot_revenu.decote.seuil)

### The `<PLACEHOLDER>` tag

When a value is expected to change at a given date but the value is not published yet, a tag `<PLACEHOLDER>` is used.

Example: if the minimum wage is expected to change in 2018, the previous example would become

```xml
  <NODE code="labour" description="Labour parameters">
    <CODE code="minimum_wage" description="Minimum wage" format="integer" type="monetary">
      <PLACEHOLDER deb="2018-01-01" />
      <VALUE deb="2014-01-01" valeur="1084" />
      <VALUE deb="2013-01-01" valeur="1016" />
      <VALUE deb="2012-01-01" valeur="960" />
      <VALUE deb="2010-01-01" valeur="878" />
    </CODE>
    ...
  </NODE>
```

The script [`find_placeholders.py`](https://github.com/openfisca/openfisca-core/tree/master/openfisca_core/scripts/find_placeholders.py) finds all placeholders in a legislation. It can be used periodically to alert on parameters about to change.

### The `<END>` tag 

When a parameter is removed from the legislation, a tag `<END>` is used.

Example: if the minimum wage is removed from legislation in 2017, the previous example would become

```xml
  <NODE code="labour" description="Labour parameters">
    <CODE code="minimum_wage" description="Minimum wage" format="integer" type="monetary">
      <END deb="2017-01-01" />
      <VALUE deb="2014-01-01" valeur="1084" />
      <VALUE deb="2013-01-01" valeur="1016" />
      <VALUE deb="2012-01-01" valeur="960" />
      <VALUE deb="2010-01-01" valeur="878" />
    </CODE>
    ...
  </NODE>
```

## Usage in formulas

See [this example](coding-the-legislation/10_basic_example.html#example-with-legislation-parameters).