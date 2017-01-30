# Trace tool

The trace tool is available [here](http://www.openfisca.fr/tools/trace).

## Presentation

This tool helps understanding the results of a simulation.

The basic idea is to allow users to navigate between variables and their dependencies, and see their respective results.

The tool takes as input a JSON description of a scenario as accepted by the [web API](../openfisca-web-api/json-data-structures.md).

  It is an alternative to [print the trace](https://doc.openfisca.fr/en/first_step.html#print-the-trace) inside the notebook. 

## Using from the demonstrator

You can open the trace tool from the OpenFisca [demonstrator](http://ui.openfisca.fr/) by clicking on the menu "Action" then on the "trace" entry. The current scenario will be pre-filled.

## Using from Python

You can open the trace tool in your browser directly from Python code.

Add this line after the scenario declaration:

```python
from openfisca_core import tools
print(tools.get_trace_tool_link(scenario, ['af'], api_url='https://api.openfisca.fr/', trace_tool_url='https://www.openfisca.fr/tools/trace'))
```

The requested variables (`'af'` here) will be calculated, and the trace tool will call the web API at the given base URL.

Of course, the scenario JSON payload will be the one corresponding of your Python `scenario` variable.
