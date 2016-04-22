# Debugging code

If you install [ipdb](https://github.com/gotcha/ipdb) (`pip install ipdb`)
the API server will drop you into a debugger when an exception occurs.

Screenshot:

```
$ paster serve --reload development-france.ini
Starting server in PID 3815.
serving on 0.0.0.0:2000 view at http://127.0.0.1:2000
> /home/harold/Dev/openfisca/openfisca-web-api/openfisca_web_api/model.py(52)get_cached_composed_reform()
     51
---> 52     full_key = '.'.join(
     53         tax_benefit_system.full_key + reform_keys

ipdb> tax_benefit_system
<openfisca_web_api.environment.TaxBenefitSystem object at 0x7f7eb8e88d10>
ipdb> tax_benefit_system.full_key
u'paris'
ipdb>
```
