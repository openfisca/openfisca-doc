# Community

## Slack

The OpenFisca community gathers around a [Slack space](https://openfisca.slack.com), which you can ask to join by sending a mail to [contact@openfisca.org](mailto:contact@openfisca.org?subject=Slack).

This space provides both community and official support, and centralises all countries’ channels.

### Channels and naming conventions

In order to increase discoverability of channels and ease navigation, the following prefixes are used:

- `of-` channels are about quick discussions and requests for help on a technical module. To make decisions on changes to apply to these modules, we use GitHub issues and Pull Requests on dedicated repositories.
- `share-` channels are newsrooms on which everyone is encouraged to share their news, learnings and accomplishments  :)

For tax and benefit systems models, the following conventions are applied:

- Channels that centralise discussions around a specific tax and benefit system are given the name of the distributed module, suffixed by `-system`. _For example: `france-system`_. If that full name is too long for the Slack channel character limit, then a shortened version of the name is used.
- Channels that centralise discussions around extensions to tax and benefit systems are given that system’s module name, followed by `-ext-` and an identifier for that extension. _For example: `france-ext-paris`_.
- System-specific group channels are campfires around which some specific organisations of contributors to a tax and benefits system gather. When a country becomes large enough, it often happens that several employers of contributors work concurrently on different parts of the system, and the main `-system` channel would become unreadable. These channels are called that system’s module name, followed by `-org-` and an identifier for that group. _For example: `france-org-gouv`_.

## Contact

You can contact the OpenFisca maintainers through:

- [GitHub](./contribute/guidelines.md#opening-issues) if you have any technical issue.
- Twitter [@OpenFisca](https://twitter.com/OpenFisca) for general inquiries and feedback.
- [email](mailto:contact@openfisca.org) for collaboration opportunities.


## Project history

The development of OpenFisca began in May 2011 at the [<abbr title="Centre d'analyse stratégique">CAS</abbr>](http://www.strategie.gouv.fr/) (renamed France Stratégie / Commissariat général à la stratégie et à la prospective in April 2013) with the support of the [<abbr title="Institut d'économie publique">IDEP</abbr>](https://www.idep-fr.org/).

OpenFisca was originally developed as a desktop application using the [Qt](http://www.qt.io/) library with a Python API. This original source code was released under a free software license in November 2011.

In the early 2014, [Etalab](https://www.etalab.gouv.fr/) started using OpenFisca and soon became a major contributor. It then decided to:

- separate the computing engine from its desktop user interface;
- offer a web API in addition to the Python API;
- demonstrate the value of the web API by developing sample applications including a web interface to simulate personal cases;
- offer a public access to this web API;
- stop the development of the [Qt version](https://github.com/openfisca/openfisca-qt).

The core was improved extensively by [Etalab](https://www.etalab.gouv.fr/), while the French model was being improved and updated by the [<abbr title="Commissariat général à la stratégie et à la prospective">CGSP</abbr>](http://www.strategie.gouv.fr/) with the help of the [<abbr title="Institut d'économie publique">IDEP</abbr>](https://www.idep-fr.org/) and the [<abbr title="Institut des politiques publiques">IPP</abbr>](http://www.ipp.eu/), soon to be joined by the French [State Startups incubator](https://beta.gouv.fr) which used and extended the model for digital public services purposes.

The 2016 <abbr title="OpenGovernment Partnership">OGP</abbr> Paris summit saw a demonstration that a small team could model the base of a tax and benefit system from scratch under 36 hours, when the [Sénégal](https://github.com/openfisca/openfisca-senegal-ui) income revenue tax was modelled and made usable with a web UI during the OGP hackathon, winning the team the first prize.

This led in 2017 to a joint effort from Etalab and beta.gouv.fr with a major focus on stability, ease of contribution and reusability. This lead to the full rewrite of the documentation, the opening of [openfisca.org](https://openfisca.org) to replace openfisca.fr, and the addition of new contributors from other French agencies, as well as international reusers with [Barcelona](https://github.com/jvalduvieco/openfisca-barcelona) joining [Tunisia](https://github.com/openfisca/openfisca-tunisia).
