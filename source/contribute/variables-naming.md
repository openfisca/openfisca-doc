OpenFisca variables : naming guidelines
=======================================

General philosophy
------------------

The discussion below is concerned with naming the variables of a country package. In that case, the ["local language rule"](language.md) applies, and the appropriate language for modeling the domain is one of the native ones of the modeled country. We consider each tax, collecting organism and country regulation, and so on, as a domain-specific term. In the same fashion, well-known abbreviations of these domain-specific terms are accepted.

OpenFisca variables names should, as much as possible, be understandable by an external contributor who is **curious** about the country's tax and benefits system, **without necessarily being an expert**.

One should be able to get a rough idea of the meaning of a variable by reading its name, or by quickly researching it on the web.

A particular effort should be made on variables that are likely to be reused.

**Examples:**

> **Good naming**

> `als_etudiant`: The acronym ALS stands in English for "Amyotrophic lateral sclerosis", but browsing for that term in France is much more likely to return "Allocation de logement sociale", a form of housing aid. The suffix suggests that it is a specific formula for the case of student housing aid.

----------

> **Bad naming**

>`vat_sub1`: In English-speaking countries VAT would unambiguously refer to Value Added Tax, but the addition of a suffix for technical purposes (e.g. an intermediate step in the computation) should in
general be avoided. A better name might be `vat_on_exports` (assuming this is the intermediate step's
meaning).

>`cpstd`. Here the acronym might mean "Company Paid Short-Term Disability", but this acronym is not widely used or recognizable, and will not be found in a web search. Using a longer name is preferable.


Do's and don'ts
---------------

### Acronyms

Acronyms are OK as long as they are broadly accepted and their meaning is quickly findable online. A good
test for "findable" is that a web search *from the relevant country* should turn up the intended meaning as the first or second hit.

>**OK**: VAT (Value Added Tax, near-universal except in France), EBITDA (tax, unambiguous), RSA (French, social benefit rather than cryptography, recognizable in context)

>**KO**: most TLAs (Three-Letter Acronyms)…

### Abbreviations

Abbreviations should be avoided unless they are undoubtedly transparent.
>**OK**: nb_parents

>**KO**: nb_par, isol


### Scopes and prefixes

OpenFisca currently lacks a namespacing mechanism. In its absence, the need sometimes arises to use prefixes or suffixes to distinguish between variables which would otherwise have the same name, leading to errors or ambiguities. Some conventions have arisen:

Use a prefix to distinguish versions of a variable specific to a sub-domain.
>**OK**: housing_tax_nb_parents

>**KO**: nb_parents_housing_tax

Avoid mixing suffixed and non-suffixed versions of a similarly named variables, as this might cause confusion on which version to use where.
>**OK**: housing_tax_nb_parents, income_tax_nb_parents

>**KO**: nb_parents, housing_tax_nb_parents

Use a suffix if it is necessary to distinguish between versions of a variable at the level of different entities; this is often seen when aggregating from the individual level to e.g. the household level.
>**OK**: taxable_income_household, work_income_individual


Legacy
------
Some existing models (such as the France model, grown over several years) do not respect all the guidelines presented here. These guidelines may also evolve with improvements to the underlying computation engine (such as namespacing or improved approaches to aggregation and other relations between entity and group values). Since variables and parameters represent the external API of a model, and excessive migration labor may discourage the users of an API, it is preferable to avoid global renamings. However, new names should be compliant with these guidelines, and legacy ones should be improved progressively and opportunistically. Communicating your standards to contributors is an important part of maintaining your model.
