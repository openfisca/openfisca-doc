# <i class="fab fa-angellist"></i> Manifesto & history

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
