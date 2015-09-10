## OpenFisca Core

> GNU/Linux Debian users should read this dedicated doc: [GNU/Linux Debian / Ubuntu](./gnu-linux-debian.md).

> Microsoft Windows users should read this dedicated doc: [Microsoft Windows](./microsoft-windows.md).

Requirements:

* [Git](http://www.git-scm.com/)
* [Python](http://www.python.org/) 2.7
* numpy and scipy, scientific computing packages for Python.
Since they are developed in C you should install them pre-compiled for your operating system.

Clone the OpenFisca-Core Git repository on your machine and install the Python package.

Assuming you are in an `openfisca` working directory:


```bash
git clone https://github.com/openfisca/openfisca-core.git
cd openfisca-core
git checkout next
pip install --editable . --user # Microsoft Windows users must not use the `--user` option
python setup.py compile_catalog
```

Once OpenFisca-Core is installed, the next step is to install the a tax and benefit system.
Choose one of:

- [OpenFisca-France](https://github.com/openfisca/openfisca-france)
- [OpenFisca-Tunisia](https://github.com/openfisca/openfisca-tunisia)
