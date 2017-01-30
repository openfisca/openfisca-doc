# For Users

[Jupyter Notebook](https://jupyter.org/) is a wonderful project widely used by scientists.

Basically it is a web interface running in your browser, in which you write code and it displays results.

A easy way to run OpenFisca is then to use this interface. There are several ways to use Jupyter Notebook:

|                          | registration | persistence | price |
| --                       | --           | --          | --    |
| Binder service           | no           | no          | [free](http://docs.mybinder.org/faq)  |
| OpenFisca private server | [yes](https://www.openfisca.fr/contact)          | yes         | free  |
| On your machine          | no           | yes         | free  |

## Binder service

For first insights – and without any installation – try the tutorial on Binder. Just click on this link: http://mybinder.org:/repo/openfisca/tutorial 

> **WARNING**: you won't be able to save your work on this platform. But you may download it.

## OpenFisca private server

The OpenFisca team provides a private Jupyter Notebook server: https://jupyter.openfisca.fr/

You have to request for access rights by contacting the [OpenFisca team](https://github.com/openfisca).

  >**WARNING**: There is no guarantee with your data so please backup your notebooks.

## On your machine

You can run OpenFisca locally on your own computer, and enjoy Jupyter Notebook too.

Here is the recommended way:    
- First launch the terminal of your computer.


To avoid any dependencies problem we recommend you to use a [virtual environment](https://virtualenv.pypa.io/en/stable/), for example with the tool : [pew](https://github.com/berdario/pew#command-reference).

```python
pip install pew
# Answer "Y" to the question about modifying your shell config file.
```
- Now create the virtual environment with the command `pew new`

```python
pew new openfisca
# It creates a virtual environment with the name openfisca
# The virtualenv you just created will be automatically activated.
```
For OpenFisca you need an updated version of `pip`.
```python
# Pew will automatically update pip itself. Let's check:
pip --version
# Should print at least 9.0 at the time we write this doc.
```
- Now you have all the requirements to install OpenFisca in your virtual environment.

```python
pip install openfisca-france 
```
- If you want to use Jupyter Notebook as we recommended

```python
pip install jupyter
```
This will open a browser window on http://localhost:8080

> Other Python modules can be of your interest to install as matplotlib.

Later, you'll be able to activate the virtualenv to access to OpenFisca from the terminal like this:

```
pew workon openfisca
```