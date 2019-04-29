# <i class="fas fa-users"></i> Contribute

```eval_rst
.. toctree::
   :hidden:

   guidelines
   language
   commit-messages
   variables-naming
   semver
   documentation
   extensions
   developer-guide
   tests
   release-process
```

OpenFisca is a free software project and contributors are very welcome!

Feel free to fork the [source code repositories](https://github.com/openfisca) on GitHub and send us pull-requests.

You can [contact the community](../find-help.md) to ask for help.

Thanks for enhancing OpenFisca anyway!

## Why contribute to OpenFisca?

OpenFisca is a project being developed under the [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) license.
The source code is freely available and modifiable. Please refer to the [Publishing results based on OpenFisca](../licence.md) page for a detailed explanation of the implications of this provision.

We encourage users to send their comments and suggestions for improvement,
and to report any inaccuracy or error they might have found.
If you want to participate more actively in its development,
know that there are multiple ways contribute to the OpenFisca project.

## How to contribute?

### Use the API and direct its development

- Share your uses: you are welcome to keep us informed of the uses
you make of the API including visualizations you may create.
We'd love to be able to include them on the OpenFisca website.
- Suggest features: please tell us about the improvements
to the API you would like to see, so that we can make it meet your needs.
- Participate directly in the [API's development](https://github.com/openfisca/openfisca-core).

### Test and report errors (web API)

You can contribute to the development of OpenFisca by reporting errors you would find on the calculation of benefits and taxes.

To enable the OpenFisca developers to solve your problems quickly, please follow these few steps:

- try to create a minimal standard case that generates the error;
- verify [that this error is not already listed](https://github.com/openfisca/openfisca-france/issues?state=open);
- try to identify the source of the error by inspecting [the formulas for the different benefits and taxes](https://fr.openfisca.org/legislation);
- [report the error](https://github.com/openfisca/openfisca-france/issues/new), with as much information as possible. If possible, please provide the code that allows to reproduce the error or the JSON file of the standard case you created.

### Complete the implementation of the French tax and benefit system

Some pieces of legislation are not yet integrated. Given the magnitude of the task, our ambition is to build a community of developers, economists and experts on taxes or social benefits to maintain and improve the software. You can help by following these steps:

- identify the incomplete or missing taxes or benefits;
- gather the necessary documentation to fix this issue;
- propose patches that implement the incomplete or missing benefits and
taxes on [GitHub](https://github.com/openfisca/openfisca-france/).

### Write some legislation

From the point of view of someone (developer, economist, etc.) who wants to implement a part of the legislation, for example a new benefit, here are some key steps:

- understand the part of the legislation you want to implement
- identify the variable dependencies using the [legislation explorer](https://fr.openfisca.org/legislation/)
- identify the new variables you need to implement
- write the new variables with their formulas, and make sure their names respect the guidelines you can find [here](./variables-naming.md).
- store the new parameters
- if you implement a part of the official legislation, your code should go in OpenFisca-France, but if you implement a new idea or a future reform, your code should go in a reform.

### Write reforms


### Enhance other projects linked to OpenFisca

You can also participate in [other projects](../find-help.md) that make use of
OpenFisca.
