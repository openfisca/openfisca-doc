# Commit messages

## Variable name changes

To avoid OpenFisca users being surprised by the unexpected renaming of a variable that breaks their code, we use standard commit messages when renaming a variable. The syntax is formalised below. It must be respected precisely, to allow automatic information extraction.

### Renaming

Renaming one or several variables will be notified by a commit message that utilises **one independent line per renamed variable** with the following syntax:

```text
Rename former_name to new_name
```

No other information must appear on this line.

### Introducing

Introducing one or several new variables will be notified by a commit message that utilises, **one independant line per created variable** with the following syntax:

```text
Introduce new_name
```

No other information must appear on this line.

### Deprecating

If a variable must not be used anymore, it will be notified by a commit message that utilises **one independant line per deprecated variable** with the following syntax:

```text
Deprecate former_name
```

No other information must appear on this line.
