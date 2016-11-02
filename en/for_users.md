# For Users

[Jupyter Notebook](http://jupyter.org/) is a wonderful project widely used by scientists.

Basically it is a web interface running in your browser, in which you write code and it displays results.

A easy way to run OpenFisca is then to use this interface. There are several ways to use Jupyter Notebook:

|                          | registration | persistence | price |
| --                       | --           | --          | --    |
| Binder service           | no           | no          | [free](http://docs.mybinder.org/faq)  |
| OpenFisca private server | [yes](https://www.openfisca.fr/contact)          | yes         | free  |
| On your machine          | no           | yes         | free  |

## Binder service

For first insights – and without any installation – try the tutorial on Binder. Just click on this badge: [![Binder](http://mybinder.org/badge.svg)](http://mybinder.org:/repo/openfisca/tutorial) 

> **WARNING**: you won't be able to save your work on this platform. But you may download it.

## OpenFisca private server

The OpenFisca team provides a private Jupyter Notebook server: https://jupyter.openfisca.fr/

You have to request for access rights by contacting the [OpenFisca team](https://github.com/openfisca).

  >**WARNING**: There is no guarantee with your data so please backup your notebooks.

## On your machine

You can run OpenFisca locally on your own computer, and enjoy Jupyter Notebook too.

First follow the [For Developers](for_developers.md) install section.

Then install Jupyter Notebook:

```
pip install jupyter notebook
jupyter notebook
```

This will open a browser window on http://localhost:8080

See also: http://jupyter.org/install.html