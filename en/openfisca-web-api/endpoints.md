# Endpoints

## calculate

Launch a simulation with an input test case, returning the computation results.

* URL path: `/api/1/calculate`
* method: POST
* required headers:
  * `Content-Type: application/json`
* JSON request structure:
  * `context` (string, default: null): returned as is in the JSON response
  * `output_format` (string, one of ["test_case", "variables"], default: "test_case"): the output format of `value` field in response.
    * `test_case`: `value` will be a list of test cases identical to the input test cases given in `scenarios` key, with computed variables dispatched in the right entity.
    * `variables`: `value` will be a list of objects like `{<variableName>: <variableValue>}`
  * `scenarios` (list of objects): a list of [scenarios](#scenarios)
  * `trace` (boolean, default: false): when true a traceback
  * `validate` (boolean, default: false): when true the simulation isn't launched, but the scenarios are [validated](#scenarios-validation)
  * `variables` (list of strings, one of available [variable names](https://legislation.openfisca.fr/variables)): the name of the variables to compute
* JSON response structure:
  * `suggestions` (list of objects): suggested variables values for the input test_case, actually used by the simulation. Different than variables default values since it depends on the input test_case.
  * `tracebacks` (list of TODO, if trace is true in request body): TODO
  * `variables` (list of TODO, if trace is true in request body): TODO
  * `value` (list or object, depending on the `output_format` value): The simulation result.
    Each output variable value is a list which length is equal to the number of entities on which the variable is defined.

> To use axes, you should add `"output_format": "variables"` to the JSON payload.

## entities

Get the entities metadata.

TODO

Example: https://api.openfisca.fr/api/1/entities

## formula

TODO

## graph

Get the graph (nodes and edges) of the variables called during the computation of the given variable.

* URL path: `/api/1/graph`
* GET parameters:
  * `context` (string, default: null): returned as is in the JSON response
  * `variable` (string, default: "revdisp", one of available [variable names](https://legislation.openfisca.fr/variables)): the name of the variable to query
* JSON response structure:
  * `edges` (list of objects): the oriented edges between the nodes, representing a variable dependency
  * `nodes` (list of objects): the nodes representing variables

Example: https://api.openfisca.fr/api/1/graph?variable=zone_apl

## parameters

Get information about legislation parameters.

* URL path: `/api/1/parameters`
* GET parameters:
  * `instant` (a [JSON instant](#instants), default: null): if given, returns the legislation parameters at this instant. If a period is given, the API will take its start instant.
  * `name` (string, repeated, default: null, one of available [parameter names](https://legislation.openfisca.fr/parameters)): the name(s) of the parameters to return. If null all the known parameters are returned.
* JSON response structure:
  * `parameters` (list of objects): a list of [JSON parameters](#parameters)

Examples:
* https://api.openfisca.fr/api/1/parameters
* https://api.openfisca.fr/api/1/parameters?name=

## reforms

Get the list of declared reforms.

TODO

Example: https://api.openfisca.fr/api/1/reforms

## simulate

Launch a simulation with an input test case, returning the computation results dispatched in a JSON decomposition
based on [decomp.xml](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/decompositions/decomp.xml).

* URL path: `/api/1/simulate`
* method: POST
* required headers:
  * `Content-Type: application/json`
* JSON request structure:
  * `context` (string, default: null): returned as is in the JSON response
  * `scenarios` (list of objects): a list of [JSON scenarios](#scenarios)
  * `trace` (boolean, default: false): when true a traceback
  * `validate` (boolean, default: false): when true the simulation isn't launched, but the scenarios are [validated](#scenarios-validation)
* JSON response structure:
  * `suggestions` (list of objects): suggested variables values for the input test_case, actually used by the simulation. Different than variables default values since it depends on the input test_case.
  * `tracebacks` (list of TODO, if trace is true in request body): TODO
  * `variables` (list of TODO, if trace is true in request body): TODO
  * `value` (object): the simulation result

## swagger

TODO

## variables

Get information about simulation variables.

TODO

Example: https://api.openfisca.fr/api/1/variables

# Deprecated endpoints

## field

> Deprecated, replaced by the `variables` endpoint.

Get info about a variable.

* URL path: `/api/1/field`
* GET parameters:
  * `context` (string, default: null): returned as is in the JSON response
  * `input_variables` (boolean, default: true): whether input variables info is inserted in each variable formula
  * `reform` (list of strings (one of [declared reforms](#reforms)), default: null): the reforms to load in order to know the variables they contain
  * `variable` (string, one of available [variable names](https://legislation.openfisca.fr/variables), default: "revdisp"): the name of the variable to query
* JSON response structure:
  * TODO

Example: https://api.openfisca.fr/api/1/field?variable=irpp

## fields

> Deprecated, replaced by the `variables` endpoint.

Get info about all known variables.

* URL path: `/api/1/fields`
* GET parameters:
  * `context` (string, default: null): returned as is in the response JSON body
* JSON response structure:
  * `columns`: list of input variables
  * `columns_tree`: tree of input variables grouped by entity name and by arbitrary categories.
    Intended to help building user interface.
  * `prestations`: list of calculated variables

Example: https://api.openfisca.fr/api/1/fields
