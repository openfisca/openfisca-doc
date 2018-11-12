Commit messages
===============


Variable name changes
---------------------

To avoid Openfisca users to be surprised by a non expected variable renaming breaking their code, we use standard commit messages when renaming a variable. The syntax is formalized below. It must be respected precisely, to allow automatic information extraction.


### Renaming

Renaming one or several variables will be notified by a commit message with the following syntax, **on one idependant line per renamed variable**:

```
Rename former_name to new_name
```

No other information must appear on this line.


### Introducing

Introducing one or several new variables will be notified by a commit message with the following syntax, **on one idependant line per created variable**:

```
Introduce new_name
```

No other information must appear on this line.


### Deprecating

If a variable must not be used anymore, it will be notified by a commit message with the following syntax, **on one idependant line per deprecated variable**:

```
Deprecate former_name
```

No other information must appear on this line.
