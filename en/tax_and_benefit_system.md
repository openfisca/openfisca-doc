# Tax and Benefit System

#### Definition

The tax and benefit system is the higher-level instance in OpenFisca.
Its goal is to model the legislation of a country.

Basically a tax and benefit system contains simulation [variables](variables.md) (source code) and legislation parameters (data).


This instance may host so many versions as there are countries in the world. 

> The OpenFisca core engine is able to simulate any country legislation once it is (partially) represented as source code.


Therefore you have to call at the beginning of your work, the one corresponding to your country of interest.

#### Application : how to call the Python module

For now only France system is well implemented, your first action should then be :

```python
# Call module describing the French System
from openfisca_france import FranceTaxBenefitSystem

# Initialize the legislation
tax_benefit_system = FranceTaxBenefitSystem()

```

 

