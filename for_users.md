# For Users

## First try online

For first insights and without any installation, try the [OpenFisca tutorial](http://mybinder.org/repo/openfisca/tutorial) on Binder. This might take a couple of minutes to initialize, but will offer a fresh environment with the latest version of OpenFisca-France.

Beware, this is only for trying out OpenFisca and see if it can suit your needs: **your changes won't be saved.** If you want to keep your work, use the notebook menu to download it.

> Binder is a [free](http://docs.mybinder.org/faq) service which allows running [Jupyter](https://jupyter.org/) notebooks.
> Basically it is a web interface running in your browser, in which you write code and it displays results.

## Saving your progress

To go further you can install OpenFisca on your computer.

We recommend you use a [virtual environment](https://virtualenv.pypa.io/en/stable/) (abbreviated as "virtualenv") with [pew](https://github.com/berdario/pew).

Launch a terminal on your computer and follow these instructions:

```sh
pip install --update pip
pip install pew  # answer "Y" to the question about modifying your shell config file.

# This command creates a virtual environment named "openfisca".
# The virtualenv you just created will be automatically activated.
# You can exit the virtualenv with "exit" (or Ctrl-D), and re-enter with "pew workon openfisca"
pew new openfisca

pip --version  # should print at least 9.0 at the time we write this doc.

# Install OpenFisca in the virtual environment.
pip install openfisca-france

# Test OpenFisca-France is installed correctly.
python -m openfisca_france.tests.test_basics  # "OpenFisca-France basic test was executed successfully"
```

If you are not comfortable editing code directly, you can also install Jupyter Notebook in order to get an interactive web editor just like on Binder.

```sh
pip install jupyter

# Open a browser at http://localhost:8080
jupyter notebook
```

Depending on what you want to do with OpenFisca, you may want to install yet other packages in your virtualenv.
For example, if you want to plot simulation results you may install [matplotlib](http://matplotlib.org/), or if you want to manage data you may install [pandas](http://pandas.pydata.org/).
