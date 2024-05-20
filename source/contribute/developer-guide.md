# Developer guide

## Source code repositories

The OpenFisca project is distributed across many Git repositories:

* [OpenFisca-Core](https://github.com/openfisca/openfisca-core)
* [Country-Template](https://github.com/openfisca/country-template)
* [OpenFisca-Documentation](https://github.com/openfisca/openfisca-doc)
* [Legislation-Explorer](https://github.com/openfisca/legislation-explorer)
* [OpenFisca-Survey-Manager](https://github.com/openfisca/openfisca-survey-manager)
* [OpenFisca-France](https://github.com/openfisca/openfisca-france) and other models etc.

## Debugging code

If you install [ipdb](https://github.com/gotcha/ipdb) (`pip install ipdb`) the API server will drop you into a debugger when an exception occurs:

```sh
$ paster serve --reload development-france.ini
Starting server in PID 3815.
serving on 0.0.0.0:2000 view at http://127.0.0.1:2000
model.py(52)get_cached_composed_reform()
     51
---> 52     full_key = '.'.join(
     53         tax_benefit_system.full_key + reform_keys

ipdb> tax_benefit_system
<openfisca_web_api.environment.TaxBenefitSystem object at 0x7f7eb8e88d10>
ipdb> tax_benefit_system.full_key
u'paris'
ipdb>
```

## Profiling code

To profile the execution of a portion of code, wrap it with these lines:

```diff
+    import cProfile
+    pr = cProfile.Profile()
+    pr.enable()

     [...portion of code...]

+    pr.disable()
+    pr.dump_stats('result.profile')
```

Each time you call the endpoint a `result.profile` file is written.
To prevent it from being overwritten, generate a dynamic name with [`tempfile.mkstemp`](https://docs.python.org/2/library/tempfile.html#tempfile.mkstemp).

Then you can use the [runsnakerun](http://www.vrplumber.com/programming/runsnakerun/) GUI to inspect the profile data.

> Under Debian GNU/Linux:
>
> ```sh
> aptitude install runsnakerun
> ```

For a throughout example on profiling and debugging please take a look at [How to profile the performance of a simulation](../simulate/profile-simulation.md).
