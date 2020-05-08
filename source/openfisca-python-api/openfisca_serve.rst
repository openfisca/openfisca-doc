===============
openfisca serve
===============

.. argparse::
   :module: openfisca_core.scripts.openfisca_command
   :func: get_parser
   :prog: openfisca
   :path: serve

Additional arguments
--------------------

``openfisca serve`` uses ``gunicorn`` under the hood. In addition to the arguments listed above, you can use any ``gunicorn`` arguments when running ``openfisca serve`` (e.g. ``--reload``, ``--workers``, ``--timeout``, ``--bind``).
See:

.. code-block:: shell

  gunicorn --help


Examples
--------

Basic use
^^^^^^^^^

.. code-block:: shell

  openfisca serve --country-package openfisca_france


Serving extensions
^^^^^^^^^^^^^^^^^^

.. code-block:: shell

  openfisca serve --country-package openfisca_france --extensions openfisca_paris


Serving reforms
^^^^^^^^^^^^^^^

.. code-block:: shell

  openfisca serve --country-package openfisca_france --reforms openfisca_france.reforms.plf2015.plf2015


Using a configuration file
^^^^^^^^^^^^^^^^^^^^^^^^^^
You can setup ``openfisca serve`` using a configuration file. Be careful as parameters with a '-' in their name on command line change to an '_' when used from the config file. See this example of configuration:

**config.py:**

.. code-block:: py

  port = 4000
  workers = 4
  bind = '0.0.0.0:{}'.format(port)
  country_package = 'openfisca_france'
  extensions = ['openfisca_paris']

**Command line:**

.. code-block:: shell

  openfisca serve --configuration-file config.py


Using gunicorn directly
^^^^^^^^^^^^^^^^^^^^^^^
If for any reason you nedd to run ``gunicorn`` directly, you can. See this example of ``gunicorn`` application:

**app.py:**

.. code-block:: py

  from openfisca_core.scripts import build_tax_benefit_system
  from openfisca_web_api.app import create_app

  country_package = 'openfisca_france'
  extensions = ['openfisca_paris']
  reforms = ['openfisca_france.reforms.plf2015.plf2015']

  tax_benefit_system = build_tax_benefit_system(
      country_package_name = country_package,
      extensions = extensions,
      reforms = reforms,
  )

  application = create_app(tax_benefit_system)

**Command line:**

.. code-block:: shell

  gunicorn app --bind 0.0.0.0:4000 --workers=4
