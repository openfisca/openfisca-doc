# Endpoints

OpenFisca endpoints allow you to access legislation elements and run calculation providing a [situation](input-output-data.md):
the consultation endpoints use the [GET](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) method, whereas the computation endpoint uses the [POST](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) method. 

To request information from OpenFisca, several endpoints are available.
 - GET `/spec` document the API in the OpenAPI format
 - GET `/parameters` 
 - GET `/parameter/<parameter_id>`
 - GET `/variables`
 - GET `/variable/<variable_id>`
 - POST `/calculate` with a [situation](input-output-data.md) 
