# Work on OpenFisca on a Windows without being administrator

_Warning: running OpenFisca on a machine **with** administrator privileges would make your life much easier. Using a MacOS or a Linux would be even better._

_If you do not have a choice other than using a restricted Windows, this guide sums up the "recipe" to install OpenFisca in such an environment._

## 1. Install git

Git is a tool that will help you version your work. It also comes with a shell **terminal** that allows you to type commands in a more standard way than the Windows command line tool.

- Download git from [https://git-for-windows.github.io](https://git-for-windows.github.io).
- Install it. While installing, keep the default options.

## 2. Install python

Python is the programing language used in OpenFisca. It can be installed without administrators rights through a software named Miniconda.

- Download miniconda from [https://conda.io/miniconda](https://conda.io/miniconda). Make sure to choose the **Python 3.7** version for Windows. If you don't know if your system is 32-bit or 64-bit, pick 32-bit.
- Install it. At some point, the installer will ask you for a "Destination Folder". You can keep the default or choose another one, but in all case **copy paste the path to this folder somewhere**. It will be useful later. For instance, this path may look like `C:\Users\my-name\AppData\Local\Miniconda2`.
- Run the program "Git Bash" from the "Start" menu ("Démarrer"). This should open a command line. Copy and paste the following lines in the console, after **adapting the first line using the path you noted in the last step**:

```
echo 'MINICONDA_PATH="C:\Users\form\AppData\Local\Miniconda2"' >> .bashrc
echo 'function convert { echo /$1  | sed '\''s/\\/\//g'\'' | sed '\''s/://'\'' ; }' >> .bashrc
echo 'function add { export PATH=$(convert $1):$PATH ;}' >> .bashrc
echo 'add $MINICONDA_PATH' >> .bashrc
echo 'add "$MINICONDA_PATH/Scripts"' >> .bashrc
source .bashrc
conda create -n openfisca python=3.7  --offline --yes
echo 'source activate openfisca' >> .bashrc
source activate openfisca
```

To check that everything worked correctly, type in Git Bash:

```
pip --version
```

A version number should be printed, and no error message should appear. Congrats, you just set up a Python working environment!

## 3. Install OpenFisca

- Download the OpenFisca-France [installation files](https://github.com/openfisca/openfisca-france-offline/archive/master.zip)
- Extract the content of this archive in a directory.
- Go to that directory, then to the `windows` subdirectory. If you installed Python in 32 bits, **right-click** on `32-bits`. If you installed Python in 64 bits, **right-click** on the `64-bits` subdirectory. Choose "Git Bash Here"
- Run the command `pip install *`

To check that everything worked correctly, type in Git Bash:

```
python -c "from openfisca_france import CountryTaxBenefitSystem; CountryTaxBenefitSystem()"
```

No error message should appear. Congrats, you just installed OpenFisca-France!

## 4. Install atom

Atom is a modern text editor that doesn't require administrator priviledges to be installed. It will allow you to edit Python files with syntaxing coloring.

- Download atom from [https://atom.io/](https://atom.io/)

## 5. Write and run your own scripts

You can now write your own scripts, such as [this tutorial](https://raw.githubusercontent.com/Anna-Livia/formation-OF/master/calculer_param_reforme.py).

To edit a script, open it with atom.

To run it, save your modifications, go to the directory containing it, right click and chose "Gith Bash Here". Then type:

```sh
python name-of-the-script.py
```

In case you run into a problem, please [open an issue](https://github.com/openfisca/openfisca-core/issues/new).
