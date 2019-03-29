# How to analyse a simulation

> https://openfisca.org/doc/openfisca-python-api/tracer.html

## Call simulation tracer

```py
simulation.trace = True

simulation.tracer.print_computation_log(aggregate=True) # population
simulation.tracer.print_trace('variable', '2019-01', max_depth=1, aggregate=False, ignore_zero=False)
```

## Analyse simulation steps

