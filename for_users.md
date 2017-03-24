# For Users

For first insights and without any installation, try the OpenFisca tutorial on Binder.

> Binder is a [free](http://docs.mybinder.org/faq) service which allows running [Jupyter](https://jupyter.org/) notebooks.
> Basically it is a web interface running in your browser, in which you write code and it displays results.

Just click on this link: http://mybinder.org/repo/openfisca/tutorial – it might take a couple of minutes to initialize. It yields an environment with the latest version of OpenFisca-France.

> **WARNING**: all the modifications made in a Binder environment will be lost. If you want to keep your work, use the notebook menu to download it.

> The private Jupyter Notebook server (`jupyter.openfisca.fr`) is now deprecated.

To go further you can install OpenFisca on your computer, and optionally install Jupyter Notebook too.

We recommend you to use a [virtual environment](https://virtualenv.pypa.io/en/stable/) (abbreviated as "virtualenv") via [pew](https://github.com/berdario/pew).

Launch a terminal on your computer and follow those instructions:

```sh
pip install --update pip
pip install pew
# Answer "Y" to the question about modifying your shell config file.

pew new openfisca
# It creates a virtual environment named "openfisca".
# The virtualenv you just created will be automatically activated.
# You can exit the virtualenv with "exit" (or Ctrl-D), and re-enter with "pew workon openfisca"

pip --version
# Should print at least 9.0 at the time we write this doc.

# Install OpenFisca in the virtual environment.
pip install openfisca-france

# Test OpenFisca-France is installed correctly:
python -m openfisca_france.tests.test_basics
# Should print: "OpenFisca-France basic test was executed successfully."

# If you want to use Jupyter Notebook on your computer:
pip install jupyter

# To launch jupyter
jupyter notebook
# This will open a browser at http://localhost:8080
```

Depending on what you want to do with OpenFisca, you may want to install other packages in your virtualenv.
For example, if you want to plot simulation results you may install [matplotlib](http://matplotlib.org/), or if you want to manage data you may install [pandas](http://pandas.pydata.org/).
