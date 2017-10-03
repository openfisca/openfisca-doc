## Endpoints

OpenFisca endpoints allow you to access legislation elements and run calculation providing a [situation](input-output-data.md):
the consultation endpoints use the [GET](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) method, whereas the computation endpoint uses the [POST](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) method. 

To request information from OpenFisca, several endpoints are available.
 - GET `/parameters` ([Documentation](http://openfisca.readthedocs.io/en/latest/parameters.html))
 - GET `/parameter/<parameter_id>`([Documentation](http://openfisca.readthedocs.io/en/latest/parameter.html))
 - GET `/variables`([Documentation](http://openfisca.readthedocs.io/en/latest/variables.html))
 - GET `/variable/<variable_id>`([Documentation](http://openfisca.readthedocs.io/en/latest/variable.html))
 - POST `/calculate` with a [situation](input-output-data.md) ([Documentation](http://openfisca.readthedocs.io/en/latest/variable.html))
