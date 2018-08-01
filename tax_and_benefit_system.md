# Tax and Benefit System

#### Definition

The tax and benefit system is the higher-level instance in OpenFisca.
Its goal is to model the legislation of a country.

Basically a tax and benefit system contains simulation [variables](variables.md) (source code) and [legislation parameters](parameters.md) (data).


This instance may host as many versions as there are countries in the world. 

> The OpenFisca core engine is able to simulate any country legislation once it is (partially) represented as source code.


Therefore you have to instantiate and use the version corresponding to your country of interest.

#### Application: how to call the Python module

The system for France is currently the only one well implemented, so your first action should be:

```python
# Call module describing the French System
from openfisca_france import FranceTaxBenefitSystem

# Initialize the legislation
tax_benefit_system = FranceTaxBenefitSystem()

```

 

