==============
openfisca test
==============

.. argparse::
   :module: openfisca_core.scripts.openfisca_command
   :func: get_parser
   :prog: openfisca
   :path: test

Examples
--------

Let's assume that in the country package ``openfisca_france``, ``net_salary`` is always 80% of ``gross_salary``.

Basic use
^^^^^^^^^

**test.yaml:**

.. code-block:: yaml

    - name: "Basic test"
      period: 2015
      input:
        gross_salary: 2000
      output:
        net_salary: 2000 * 0.8

**Command line:**

.. code-block:: shell

  openfisca test -c openfisca_france test.yaml
  # Success

  openfisca test test.yaml
  # Success: the country package is automatically detected.
  # May fail if several country packages are installed in your environment.
  # In that case, specify which package to use with the --country_package option


Error margin
^^^^^^^^^^^^

**test_2.yaml:**

.. code-block:: yaml

    - name: "Test defining a relative error margin"
      period: 2015
      relative_error_margin: 0.05
      input:
        gross_salary: 1000
      output:
        net_salary: 780 # the right value is 800

    - name: "Test defining an absolute error margin"
      absolute_error_margin: 10
      period: 2015
      input:
        gross_salary: 1000
      output:
        net_salary: 790 # the right value is 800

**test_3.yaml:**

.. code-block:: yaml

    - name: "Test not defining any error margin"
      period: 2015
      input:
        gross_salary: 1000
      output:
        net_salary: 795 # the right value is 800


**Command line:**

.. code-block:: shell

  openfisca test test_2.yaml
  # Success: the test pass, as the actual results are within the error margins

  openfisca test test_3.yaml
  # Failure: the test does not pass, as its error margin is by default 0


Name filter
^^^^^^^^^^^

**test_4.yaml:**

.. code-block:: yaml

    - name: "Test containing the word openfisca in its name"
      period: 2015
      input:
        gross_salary: 1000
      output:
        net_salary: 800

    - name: "Test that contains the magic word in its keywords"
      keywords:
        - some keyword
        - openfisca
      period: 2015
      input:
        gross_salary: 1000
      output:
        net_salary: 800

    - name: "Some other test that fails"
      period: 2015
      input:
        gross_salary: 1000
      output:
        net_salary: 0

**Command line:**

.. code-block:: shell

  openfisca test test_4.yaml
  # Failure: the third test does not pass

  openfisca test -n openfisca test_4.yaml
  # Success: the third test is not executed, as it doesn't contain the word 'openfisca'

Note that if a test file name contains the name filter, all the inner tests will be executed.


Extensions
^^^^^^^^^^

Let's now assume an extension to ``openfisca_france``, ``openfisca_paris`` is installed on our system, defines the variable ``paris_housing_benefit``, and that this variable is worth ``200`` if ``net_salary`` is ``0``.


**test_5.yaml:**

.. code-block:: yaml

    - name: "Test using an extension"
      period: 2015
      input:
        net_salary: 0
      output:
        paris_housing_benefit: 200


**Command line:**

.. code-block:: shell

  openfisca test test_5.yaml
  # Failure: the test returns an error:
  # the country package openfisca_france does not references a variable named paris_housing_benefit

  openfisca test -e openfisca_paris test_5.yaml
  # Success: The test passes, as the extension is loaded in the tax benefit system before running the test


Reforms
^^^^^^^

Let's assume that I want to test a reform that lowers ``net_salary`` to 60% of ``gross_salary`` (instead of 80% in the regular ``openfisca_france``).

This reform is called ``increase_cotisation`` and available in the python module ``openfisca_france.reforms.increase_cotisation``.


**test_6.yaml:**

.. code-block:: yaml

    - name: "Test on a reform"
      period: 2015
      input:
        gross_salary: 1000
      output:
        net_salary: 600


**Command line:**

.. code-block:: shell

  openfisca test test_6.yaml
  # Failure: the test does not pass, as the regular openfisca_france is used

  openfisca test -r openfisca_france.reforms.increase_cotisation.increase_cotisation test_5.yaml
  # Success: The test passes, as the increase_cotisation reform is applied
