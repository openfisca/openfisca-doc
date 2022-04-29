# <i class="fas fa-home"></i> Before you start

[OpenFisca](https://openfisca.org) is an open source platform to write rules as code.

Describe your tax and benefit system, provide a situation as input (i.e income), ask for a calculation as output (i.e. income tax), and get your results.

* **For economists**: OpenFisca allows you to use survey data to simulate the impact of a  reform on a given government’s budget and on a population’s standard of living.
* **For developers**: OpenFisca allows you to easily create web applications based on your simulation results, thanks to the web API. You can build a great variety of other services by coding formulas, hosting your own instance or building your own extensions.
* **For public administrations**: OpenFisca allows you to stop building your micro-simulation software and tax & benefit calculators on your own. Instead, contribute to OpenFisca, collaborate with other administrations and reduce the bill for the taxpayer.

## How does OpenFisca work?

### 1 - Choose an available tax and benefit system or roll your own

With OpenFisca, you can:
* Use an existing tax and benefit system (see the [list of systems already built](https://openfisca.org/en/countries/))
* [Build a new tax and benefit system](coding-the-legislation/bootstrapping_a_new_country_package.md) if it doesn’t exist already
* [Contribute](contribute/index.md) to an existing system by adding or improving elements of the legislation

How to turn legal code into Python code?

* First, identify some legislation that can be expressed as an arithmetic operation.
* Then, try to translate them into [formulas, variables, parameters, etc.](coding-the-legislation/index.md)
* You can even [build some tests](coding-the-legislation/writing_yaml_tests.md) to verify your implementation of the law.
* Lost? You are not the first one to go through that! Join us [here](https://forms.gle/kA6bijAJBL4kJz4e8) to ask the community for some hints and to celebrate your progress.

### 2 - Choose what kind of input data you need

With OpenFisca, you can [run a simulation](simulate/index.md) on a single situation or on a whole population. OpenFisca doesn’t provide any data, the data you need depends on what you’re trying to calculate.

Do you want to help users find their eligibility for a social benefit in your country? Go and ask the users of your application to give you the income and demographic information you need in order to provide them with an answer (please do not forget to be GDPR compliant!).

Are you trying to simulate the impact of a new housing tax on behalf of the OECD? ask your government for the survey data you need to simulate the impact of that housing tax reform on the poorest 20% of a country.

### 3 - Use your results

There are two ways to use your results:

* If you want to build a web service with the results of your simulation, you’ll definitely want to take a look at our [web API](openfisca-web-api/index.md).

* If you’re working on your thesis, you’ll rather use our [Python API](openfisca-python-api/index.md).

Also, there are tons of libraries to help you illustrate your results ([plot.ly](https://plot.ly) for instance, will get you those nice charts you’ve seen elsewhere).

Please make sure you read our [licence information](licence.md) before using results based on OpenFisca.

## Things OpenFisca won’t do for you

* Behaviour-based analysis. OpenFisca is a static micro-simulation model, so it will provide you with results “as-of-tomorrow” (i.e. a new tax bracket won’t affect consumption).
* OpenFisca is contributive: if the legislation you need is not described yet, you’re the best person to add it (take a look at our [contribution guidelines](contribute/index.md)).
* OpenFisca shines in dealing with numbers: Enumerated values are a later addition, and support for serving/testing string values is not built in.

## Find inspiration

Wonderful products rely on OpenFisca! Check them out on our [showcase page](https://fr.openfisca.org/showcase/).

Feeling a bit lost? You’re not sure if OpenFisca can suit your project? [Drop us a line](mailto:contact@openfisca.org) and we’ll tell you!
