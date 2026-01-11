# <i icon-name="book"></i> Training materials

```{toctree}
:hidden:

kickoff
rac-background
getting-started
writing-code
web-api
python-api
```

## Introduction

### Kick-off

Ensuring everyone has the appropriate tools and background knowledge to start the training.

- [Slide deck](./kickoff.md).

<div class="iframe-wrapper">
  <iframe title="Training Kickoff" src="https://videos.lescommuns.org/videos/embed/037e9017-c78a-42d9-a575-659e55c18c6d" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

### Rules as Code background

Introducing Rules as Code (RaC) and how it fits with existing practices and institutional frameworks.

- [Slide deck](./rac-background.md).

## Modelling legislation

### Getting started

Clone the country template, set up a public git repository.

- [Slide deck](./getting-started.md).

<div class="iframe-wrapper">
  <iframe title="Getting started" src="https://videos.lescommuns.org/videos/embed/693e845f-b50f-4ea8-a9be-ae674c71114d" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

### Choosing which rules to start modelling

Understanding policy relevance, technical constraints and testing considerations.

- [Slide deck](https://cloud.openfisca.org/s/ebpn7LDpYNtyXtC).

<div class="iframe-wrapper">
  <iframe title="Modelling law" src="https://videos.lescommuns.org/videos/embed/af8c4e01-fe43-427d-944e-043631651ffd" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

### Writing OpenFisca code

Writing variables, formulas, parameters and test suites.

- [Slide deck](./writing-code.md).

<div class="iframe-wrapper">
  <iframe title="Writing OpenFisca code" src="https://videos.lescommuns.org/videos/embed/6a056675-61bf-4617-9331-5ac32e38fa8a" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

### Modelling collaboratively across silos and disciplines

A presentation highlighting the need for collaborative modelling in order to deliver a complete model, the difficulties in achieving it and the ways in which OpenFisca supports that goal.

- [Online version](./OpenFisca-Modelling-collaboratively-across-silos-and-disciplines-March-2025-online.pdf) for reading on your own.
- [Full presentation](./OpenFisca-Modelling-collaboratively-across-silos-and-disciplines-March-2025.pdf) with more intermediary steps for in-person delivery by trainers.

## Integrating calculations with APIs

### Python API

Leveraging OpenFisca calculations for datascience and large-scale computation.

- [Slide deck](./python-api.md).

### Web API

Integrating OpenFisca calculations in a web or mobile application.

- [Slide deck](./web-api.md).

<div class="iframe-wrapper">
  <iframe title="Using the web API" src="https://videos.lescommuns.org/videos/embed/71585a88-8089-495e-bcbd-c06f7e7ba8d3" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

### Building an OpenFisca-powered web application from scratch

A workshop guiding through building a web application from scratch to provide a graphical user interface over the [web API](../openfisca-web-api/index.md) of the [Country Template](https://github.com/openfisca/country-template/) demonstration model.

#### Session 1: Introduction to the Web API

- [Step-by-step guide](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/01-introduction.md).

#### Session 2: Web App Bootstrap

- [Step-by-step guide](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/02-app-bootstrap.md).

#### Session 3: Calculate Income Tax With Svelte

- [Calculate a variable for an individual](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/03-calculate-income-tax-1.md).
- [Recalculate a variable for an individual](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/03-calculate-income-tax-2.md).

#### Session 4: Calculate Disposable Income With React

- [Calculate a variable for a group of individuals](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/04-calculate-disposable-income-1.md).
- [Recalculate a variable for a group of individuals](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/04-calculate-disposable-income-2.md).

#### Session 5: Expand Disposable Income Over Axes With VueJS and D3

- [Expand a variable over axes](https://github.com/redte-ch/ReDistributeMe/blob/main/workshop/05-expand-disposable-income-over-axes.md).

## Credit

### Authors

- The training program was co-created by Hamish Fraser and Matti Schneider.
- The “Building an OpenFisca-powered web application” workshop was created by Mauko Quiroga.
- The “Modelling collaboratively across silos and disciplines” presentation was created by Thomas Guillet.

### Videos

The videos of the training sessions were recorded as part of the 2024 Cohort of the EU [GovTech4All](https://interoperable-europe.ec.europa.eu/collection/govtechconnect/govtech4all) program.

### Funders

These training materials were co-funded by the French Interministerial Direction for Digital Affairs ([DINUM](https://www.numerique.gouv.fr)) and the European Commission under the [GovTech4All](https://interoperable-europe.ec.europa.eu/collection/govtechconnect/govtech4all) program.

<div class="cofunders">
  <img src="../_static/img/training/dinum.png" alt="Co-funded by DINUM" />
  <img src="../_static/img/training/cofunded_by_eu.png" alt="Co-funded by the European Union" />
</div>
