# <i class="fas fa-home"></i> Before you start

[OpenFisca](https://openfisca.org) is an open source engine to write rules as code.

Describe your tax and benefit system, provide a situation as input (i.e income), ask for a calculation as output (i.e. income tax), and get your results.

## Who uses OpenFisca

* **Economists and lawmakers**: calculate the effects of policies. Combine them with survey data to simulate the impact of a reform on a given government’s budget and on a population’s standard of living.
* **Developers and companies**: easily create web applications based on simulation results, thanks to the [web API](openfisca-web-api/index.md). You can build a great variety of services by coding formulas, hosting your own instance and building your own extensions.
* **Public administrations**: stop building your own micro-simulation software and tax & benefit calculators. Instead, contribute to OpenFisca, collaborate with other administrations and reduce costs to the taxpayer.

## Path to using OpenFisca

### 1 - Use an available country package or roll your own

To get started, you can:

* Use an existing tax and benefit system (see the [list of publicly-available country packages](https://openfisca.org/en/countries/)).
* [Build a new tax and benefit system](coding-the-legislation/bootstrapping_a_new_country_package.md) if it doesn’t exist already.
* [Contribute](contribute/index.md) to an existing system by adding or improving elements of the legislation.

Then, you will turn legal code into OpenFisca code, which is a subset of the Python programming language with many helpful tools:

* First, identify some legislation that can be expressed as an arithmetic operation.
* Then, translate them into [formulas, variables, parameters, etc.](coding-the-legislation/index.md)
* [Build some tests](coding-the-legislation/writing_yaml_tests.md) to verify your implementation of the law.
* Lost? You are not the first one to go through that! You can [find help](find-help.md) by reaching out to the community.

### 2 - Identify the input data you need

With OpenFisca, you can calculate the effect of legislation on a single situation or on a whole population by running a “[simulation](simulate/index.md)”. Since the data you need depends on what you’re trying to calculate, OpenFisca doesn’t provide any data up front.

Do you want to help users find their eligibility for a social benefit in your country? Build a user interface asking them for their income and demographic information in order to provide them with an answer (do not forget to comply with GDPR!).

Are you trying to assess the impact of a new housing tax on behalf of the OECD? Find your government's open survey data to simulate the impact of that tax reform on the poorest 20% of a country.

### 3 - Run simulations

There are two ways to calculate the effect of the rules modelled in a country package on the given input data with OpenFisca:

* If you have a background in web development or want to build a web application with the results of your simulation, you’ll want to use the [web API](openfisca-web-api/index.md).
* If you have a background in datascience, want to use large datasets, or want to dynamically apply changes to the system, you’ll rather use the [Python API](openfisca-python-api/index.md).

The output of this simulation will be either Python objects or JSON. Many other libraries will then help you represent these results graphically ([plot.ly](https://plot.ly) for instance will get you those nice charts you’ve seen elsewhere).

Please make sure you read our [license](license.md) before publishing results based on OpenFisca.

## Things OpenFisca won’t do for you

* **Behaviour-based analysis.** OpenFisca is a static micro-simulation model, so it will provide you with results “as-of-tomorrow”, without taking retroactive effects or “elasticity” into account (e.g. a new tax bracket won’t affect consumption).
* **Human decisions.** This might seem obvious, but is worth reiterating: any process that includes human judgement can not be automated. Human decisions can be modelled as input variables, but OpenFisca does not aim at doing machine learning on past decisions for probabilistic results, for example.
* **Zero effort modelling.** While our community is strong and you can often benefit from its shared efforts, OpenFisca is contributive: if the legislation you need is not described yet, you’re the best person to add it (take a look at our [contribution guidelines](contribute/index.md) first).
* **Magic legislation parsing.** OpenFisca is a framework for humans to collaborate on translating rules into code. It does not ingest lawyer speak and automatically produce developer speak. Regulation is ambiguous and needs human interpretation before being codified.
* **Textual comparisons.** OpenFisca shines in dealing with numbers: enumerated values are a later addition, and support for serving and testing string values is not built in.

## Feeling lost?

You’re not sure if OpenFisca can suit your project? [Drop us a line](mailto:contact@openfisca.org?subject=Contact%20from%20doc) and we’ll tell you!
