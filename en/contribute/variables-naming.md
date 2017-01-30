Openfisca variables naming guidelines
=====================================

General philosophy
------------------

If you consider naming variables, you are in a country-specific repository, where the [local language rule](language.md) apply. The domain language is thus one of the native ones of the modeled country. We consider each tax, collecting organism and country regulation as a domain-specific term. In the same fashion, well-known abbreviations of these domain-specific terms are accepted.

OpenFisca variables names should, as much as possible, be understandable by an external contributor who is **curious** about the country tax and benefits system, **without necessarily being an expert**.

One should be able to get a rough idea of the meaning of a variable by reading its name, or by quickly researching it on the web.

A particular effort should be made on variables that are likely to be reused.

**Examples:**

> **Good naming**

> `als_etudiant`: I don't know what `als` stands for. I look it up on a search engine, and I see ALS are a form of Aides Logement. I thus know this variable should be the amount of ALS for a student. This is enough to tell me if it is interesting in my context.

----------

> **Bad naming**

>`apje_temp`: I could find the meaning of APJE online, but the temp suffix remains a mystery.

>`rto_net`. I can guess it's an amout after some kind of deduction, but looking RTO on a search engine doesn't give me anything.


Do's and don'ts
---------------

### Acronyms

Acronyms are ok as long as they are broadly accepted and their meaning is quickly findable online.
>**OK**: RSA, RFR

>**KO**: PAC

### Abbreviations

Abbreviations should be avoided unless they are undoubtedly transparent.
>**OK**: nb_parents

>**KO**: nb_par, isol


### Scopes and prefixes

To show a variable belongs to a specific scope, it is better to use a prefix rather than a suffix.
>**OK**: rsa_nb_enfants

>**KO**: nb_enfants_rsa

Not specifying the scope of a specific variable should be avoided, as it is confusing for other users.
>**OK**: ir_nb_pac

>**KO**: nb_pac

### Entity suffixes

It happens that several variables have the same meaning, but for different entitities (individus, familles, etc.). Standard suffixes should be used to distinguish them.
>**OK**: ass_base_ressources_individu, statut_occupation_logement_famille


Legacy
------
Many variables on the current codebase of OpenFisca France do not respect the guidelines presented here. An exhautsive and global renaming is not considered as of today.

However, new variables should be compliant with these guidelines, and legacy ones should progressively and opportunistically be renamed.
