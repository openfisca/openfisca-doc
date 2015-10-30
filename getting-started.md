# Getting started

This walkthrough presents what you can do with OpenFisca without installing it.

See the [getting started Jupyter Notebook] which illustrates this section.

## Explore the legislation

The [legislation explorer](http://legislation.openfisca.fr/) allows you to browse the variables and the parameters
of the tax and benefit legislation.

Each variable has its own URL and page, and the same for the parameters.

For example: [af](http://legislation.openfisca.fr/variables/af)

## Calculate a variable

### Using Python

Say we want to calculate the [af](http://legislation.openfisca.fr/variables/af)
of a family with 1 parent (they divorced) and 3 children.

Here is the script `test1.py` available
[here](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/scripts/getting_started/test1.py),
or in the [getting started Jupyter Notebook]:

```python
import datetime

from openfisca_france import init_country

TaxBenefitSystem = init_country()
tax_benefit_system = TaxBenefitSystem()

year = 2015

scenario = tax_benefit_system.new_scenario()
scenario.init_single_entity(
    period = year,
    parent1 = dict(
        birth = datetime.date(year - 30, 1, 1),
        salaire_de_base = 15000,
        ),
    enfants = [
        dict(birth = datetime.date(year - 10, 1, 1)),
        dict(birth = datetime.date(year - 12, 1, 1)),
        dict(birth = datetime.date(year - 18, 1, 1)),
        ],
    )

simulation = scenario.new_simulation()
af = simulation.calculate('af', '2015-01')
print af
```

Result:

```
[ 361.52359009]
```

The result is a vector of size 1, the number of `families` in our test case.

On the line `af = simulation.calculate('af', '2015-01')`, `'2015-01'` corresponds to a period (january 2015).

> OpenFisca uses periods intensively so it defines string shortcuts to express them.

### Using the web API

Let's do the same calculation using the web API hosted by the OpenFisca project.

The web API is callable from any language which supports HTTP requests and JSON.
We could write our example in Python or JavaScript, but let's use [curl](http://curl.haxx.se/)
and [jq](https://stedolan.github.io/jq/).

```bash
read -d '' json << EOF
{
  "scenarios": [
    {
      "test_case": {
        "familles": [
          {
            "parents": ["parent1"],
            "enfants": ["enfant1", "enfant2", "enfant3"]
          }
        ],
        "foyers_fiscaux": [
          {
            "declarants": ["parent1"],
            "personnes_a_charge": ["enfant1", "enfant2", "enfant3"]
          }
        ],
        "individus": [
          {
            "id": "parent1",
            "birth": "1985-01-01",
            "salaire_de_base": {"2015": 15000}
          },
          {
            "id": "enfant1",
            "birth": "2005-01-01"
          },
          {
            "id": "enfant2",
            "birth": "2003-01-01"
          },
          {
            "id": "enfant3",
            "birth": "1997-01-01"
          }
        ],
        "menages": [
          {
            "personne_de_reference": "parent1",
            "enfants": ["enfant1", "enfant2", "enfant3"]
          }
        ]
      },
      "period": "2015-01"
    }
  ],
  "output_format": "variables",
  "variables": ["af"]
}
EOF
curl -H "Content-Type: application/json" -X POST -d "$json" http://api-test.openfisca.fr/api/1/calculate | jq .value[0]
```

Result:

```json
{
  "af": {
    "2015-01": [
      361.5235900878906
    ]
  }
}
```

This is sightly more verbose than the previous example because we express all the entities explicitly,
whereas in Python we had the helper method `init_single_entity`.
That's because most of the time the JSON payload of an HTTP request is generated programatically.

## Test the impact of a reform

OpenFisca can be used to test the impact of a reform. For the purpose of this tutorial we will work on a test case,
but it's possible to work on population data like surveys.

Let's use a reform which has already been coded: the .
A dedicated section of the documentation explains how to write an extension for coding a reform.

Here is the script `test2.py` available
[here](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/scripts/getting_started/test2.py)
or in the [getting started Jupyter Notebook]:

```python
import datetime

from openfisca_france import init_country
from openfisca_france.reforms import plfr2014

TaxBenefitSystem = init_country()
tax_benefit_system = TaxBenefitSystem()
reformed_tax_benefit_system = plfr2014.build_reform(tax_benefit_system)

year = 2013

scenario = reformed_tax_benefit_system.new_scenario()
scenario.init_single_entity(
    period = year,
    parent1 = dict(
        birth = datetime.date(year - 40, 1, 1),
        salaire_imposable = 13795,
        ),
    )

simulation = scenario.new_simulation(reference = True)
impo = simulation.calculate('impo', '2013')
print impo

reform_simulation = scenario.new_simulation()
reform_impo = reform_simulation.calculate('impo', '2013')
print reform_impo
```

Result:

```
[-74.39001465]
[ 0.]
```

The result is a vector of size 1, the number of `foyers_fiscaux` in our test case.

## Trace the calculation of a variable

Sometimes we would like to explain why the calculation of a variable gave a particular result.
This is possible using the [trace tool](http://www.openfisca.fr/outils/trace).

There is a way to open the trace tool directly from Python code in your web browser:

Add this line after the scenario declaration:

```python
from openfisca_core import web_tools
web_tools.open_trace_tool(scenario, variables = ['af'], api_url = 'http://api-test.openfisca.fr')
```

The requested variables (`'af' here`) will be calculated, and the trace tool will call the web API at the given
base URL.

[getting started Jupyter Notebook]: https://github.com/openfisca/openfisca-web-notebook/blob/master/documentation/getting-started.ipynb
