# Reforms

OpenFisca can be used to evaluate the quantitative impact of legislation changes.

Such as determining who would win or lose from an income tax reform, what the impact would be of a social welfare redesign, or how to finance a universal basic income.

Within OpenFisca these are known as **reforms**. A reform is a set of modifications to be applied to a **reference** tax and benefit system. It generates a reformed tax and benefit system that differs from the original one. Calculations can be run on both of them and the results compared.

To use reforms or code your own ones, check the [reform documentation](../coding-the-legislation/reforms.md).

> Note that OpenFisca simulates only the _mechanics_ of taxes and benefits, it doesn't take into account the retro-action of economic agents. For instance, you can estimate the increase of the households disposable income if a universal basic income is introduced, but OpenFisca won't tell you anything about the consumption increase this policy may generate.

## Differences between reforms and extensions

Reforms are sometimes confused with another mechanism: [extensions](../contribute/extensions.md). These two mechanisms do not have the same purpose:

- Use a reform if you want to modify a tax and benefit system in order to study the impact of a legislation change.
- Use an extension if you want to write formulas that are based on a main tax and benefit system, while keeping the code separated from the main country package (e.g. for local benefits).
