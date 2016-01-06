## Install with conda

Installing numpy with apt-get on ubuntu, and then openfisca-core and -france with git as decribed in doc.openifisca.org is problematic on a fresh ubuntu 15.10 install (it looks like numpy gets compiled).

Miniconda (which is Anaconda with ~10 default packages instead of 100) seems to be a good alternative for simplicity. It looks like it can get your install sandboxed too (?)

### Install Miniconda

See http://conda.pydata.org/docs/install/quick.html
Then follow the [30 minutes guide](http://conda.pydata.org/docs/test-drive.html) (and make it a 10 minute read)

### Create your openfisca env

```
conda update conda
```

Create a new environment for OpenFisca named `OpenFisca` and packed with the required packages :
```
conda create --name OpenFisca numpy=1.9.3 PyYAML requests Babel node
```

Conda doesn't have the Biryani package... we'll use pip to install it inside our environment :

```
pip install Biryani
```

Activate your brand new environment :

```
source activate OpenFisca
```

Check your environment's packages :

```
conda list
```

### Install OpenFisca

Now follow the `Install with git` section of the Install page, **without** specifying the --user option (to keep our packages sandboxed) :

> It shouldn't compile anything and be instantaneous (except for git clone depending on your connection)

```bash
git clone https://github.com/openfisca/openfisca-core.git
cd openfisca-core
git checkout master
pip install --editable .
python setup.py compile_catalog

cd ..

git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
git checkout master
pip install --editable .
python setup.py compile_catalog
```

Run `conda list` again to see the installed packages, openfisca-core/-france should listed (-:).

Running `pip list` outside of your env, the packages we just installed should **not** be listed.
