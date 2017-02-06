# Periods, Instants

#### Definition
OpenFisca manipulates time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.  
Example: the 15th June 2015
- *Period*: a succession of days.   
Example: a month ("July"), a year ("2015") or several months ("July and August")

####Implementation in OpenFisca

Time is defined using an ad-hoc strings format:  
            
            "year-month-day"

######Examples:
For *instants*:
- `"2015-02-15"` is an instant, February, 15th 2015.

For *periods*:  
-  `"2015"` is a year,   
`"2015-01"` is a month of a year, January 2015     
`"2015-06:3"` are the 3 months June, July and August of the year 2015. 


>Internally, time is stored as a start instant, a unit (month, year) and a quantity of units.

Functions exist to transform periods or turn them into an instant, which are documented [later](coding-the-legislation/periods.md).

