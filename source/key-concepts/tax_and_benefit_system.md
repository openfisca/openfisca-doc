# Tax and Benefit System

## Definition

The tax and benefit system is the higher-level instance in OpenFisca.

Its goal is to model the legislation of a country (or a more specific domain or jurisdiction).

A tax and benefit system contains simulation [variables](variables.md) (source code) and [legislation parameters](parameters.md) (data).

Instances of OpenFisca are created for specific countries,jurisdiction or domains and they all depend on the OpenFisca core engine.

> The OpenFisca core engine is able to simulate any country's legislation once it is (partially) represented as source code.

To instantiate and use OpenFisca requires choosing or creating a version that corresponds to your country, jurisdiction or domain of interest.

The following are examples of OpenFisca country instances:

 - OpenFisca Aotearoa
 - OpenFisca Canada
 - OpenFisca France
 - OpenFisca Italia
 - OpenFisca Japan
 - OpenFisca Senegal
 - OpenFisca Tunisia
 - OpenFisca UK
 - OpenFisca US

There is also state level instances such as:
 - OpenFisca New South Wales (Australia)
 - OpenFisca Missouri (USA)

And City level instances such as:
 - OpenFisca Paris
 - OpenFisca City of Vancouver

Each instance of OpenFisca is managed and published as open source digital infrastructure by teams positioned within the countries or jurisdictions they are modelling.
Each maintains their own instances and as they are able, contributes to `OpenFisca Core` and the wider OpenFisca ecology.
