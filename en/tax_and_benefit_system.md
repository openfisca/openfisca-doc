# Tax and Benefit System

The tax and benefit system is the higher-level instance in OpenFisca.
Its goal is to model the legislation of a country.

Basically a tax and benefit system contains simulation variables (source code) and legislation parameters (data).

This instance may host so many versions as there are countries in the world. 

> The OpenFisca core engine is able to simulate any country legislation once it is (partially) represented as source code.


Therefore you have to call at the beginning of your work, the one corresponding to your country of interest.

For now only France is well implemented, your first action should then be :

```
from openfisca_france import FranceTaxBenefitSystem   # Call module describing the French System

tax_benefit_system = FranceTaxBenefitSystem()  # Initialize the legislation

```

 

