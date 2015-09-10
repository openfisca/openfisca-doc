# Profiling code

To profile the execution of a controller, for example the `calculate` endpoint, add these lines to
`openfisca_web_api/controllers/calculate.py`:

```python
@wsgihelpers.wsgify
def api1_calculate(req):
+    import cProfile
+    pr = cProfile.Profile()
+    pr.enable()

    total_start_time = time.time()

    ctx = contexts.Ctx(req)

    [...]

+    pr.disable()
+    pr.dump_stats('calculate.profile')
    return wsgihelpers.respond_json(ctx, response_data, headers = headers)
```

Each time you call the endpoint a `calculate.profile` file is written.
To prevent it to be overwritten, you can rename it after each call.

Then you can use the [runsnakerun](http://www.vrplumber.com/programming/runsnakerun/) GUI to inspect the profile data.

> Under Debian GNU/Linux:
>
>     aptitude install runsnakerun
