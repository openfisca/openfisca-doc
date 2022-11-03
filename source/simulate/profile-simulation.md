# How to profile the performance of a simulation

Your simulation is way too slow, and you want to know why? We've got you covered! :)

Since [34.4.0](https://github.com/openfisca/openfisca-core/pull/895) you can generate a time performance flame graph in a web page to view the time taken by every calculation in a simulation.

In the following examples, we use [OpenFisca-France](https://github.com/openfisca/openfisca-france), but the profiling applies to any country package using `openfisca test`.

## Identify a slow simulation

The easier way to spot a slow simulation is to profile your test suite, as follows:

```py
PYTEST_ADDOPTS="$PYTEST_ADDOPTS --durations=10" openfisca test --country-package openfisca_france tests

...
Which gives you the 10 slowest tests:
9.69s call     tests/test_basics.py::test_basics[scenario_arguments12]
9.02s call     tests/reforms/test_plf2016_ayrault_muet.py::test_plf2016_ayrault_muet
8.91s call     tests/test_basics.py::test_basics[scenario_arguments11]
8.78s call     tests/formulas/irpp_prets_participatifs.yaml::
8.44s call     tests/formulas/irpp_prets_participatifs.yaml::
8.37s call     tests/formulas/revenu_disponible.yaml::
8.36s call     tests/formulas/revenu_disponible.yaml::
8.27s call     tests/formulas/revenu_disponible.yaml::
8.23s call     tests/formulas/revenu_disponible.yaml::
8.17s call     tests/test_tax_rates.py::test_marginal_tax_rate
```

Now, let's take a closer look at this test `tests/formulas/irpp_prets_participatifs.yaml`:

```py
PYTEST_ADDOPTS="$PYTEST_ADDOPTS --durations=3" openfisca test --country-package openfisca_france tests/formulas/irpp_prets_participatifs.yaml

...

9.03s call     tests/formulas/irpp_prets_participatifs.yaml::
7.75s call     tests/formulas/irpp_prets_participatifs.yaml::
3.02s call     tests/formulas/irpp_prets_participatifs.yaml::
```

Terrific! We now know that the first test in `tests/formulas/irpp_prets_participatifs.yaml` is the slowest, compared to the others.

## Generate the flame graph

To generate the flame graph, just pass the [`--performance`](https://openfisca.org/doc/openfisca-python-api/openfisca-run-test.html) option to `openfisca test`.

We'll also use the [`--name_filter`](https://openfisca.org/doc/openfisca-python-api/openfisca-run-test.html) option to profile the first test only.

```py
openfisca test --performance --name_filter ir_prets_participatifs_2016 --country-package openfisca_france tests/formulas
git status | grep html

...

performance_graph.html
```

## Open the flame graph

Now, you can open the file with your favorite browser.

For example, in OS X:

```py
open performance_graph.html
```

You'll be greeted by a very nice looking flame graph like this one:

[![Performance graph](https://cdn.rawgit.com/openfisca/openfisca-doc/master/source/static/img/performance_graph.png)](https://github.com/openfisca/openfisca-doc/blob/master/source/static/img/performance_graph.png)

Looking at the graph, we now know that the `impots_directs` formula takes quite a lot of time.

The question is, why?

## Find the bottleneck

In order to identify why the simulation is slow, we need to find the bottleneck. We'll use a line profiler to figure it out.

We'll start by installing `line_profiler`:

```py
pip install line_profiler
```

Then we'll use it to profile our formula by adding the `@profile` decorator:

```py
class impots_directs(Variable):
    value_type = float
    entity = Menage
    label = "Impôts directs"
    reference = "http://fr.wikipedia.org/wiki/Imp%C3%B4t_direct"
    definition_period = YEAR

    @profile
    def formula(menage, period, parameters):
```

Finally, we run our test with the `line_profiler` enabled:

```py
kernprof -v -l openfisca test --name_filter ir_prets_participatifs_2016 --country-package openfisca_france tests/formulas
```

We now know where our most time consuming line lies:

```py
Line #   Hits    Time      Per Hit      % Time         Line Contents
====================================================================

635         1    3488880.0 3488880.0    100.0          isf_ifi_i = menage.members.foyer_fiscal('isf_ifi', period)
```

Another formula... so we'll have to follow the breadcrumbs.

## Follow the breadcrumbs

We'll repeat the same operation until we find the culprit! You'll see that the results are coherent with the flame graph:

```py
Line #   Hits    Time      Per Hit      % Time         Line Contents
====================================================================

621         1    3433186.0 3433186.0    100.0          isf_ifi_apres_plaf = foyer_fiscal('isf_ifi_apres_plaf', period)
606         1    3446413.0 3446413.0     99.9          total_impots_plafonnement_isf_ifi = foyer_fiscal('total_impots_plafonnement_isf_ifi', period)
478         1    3518928.0 3518928.0     99.8          crds_i = foyer_fiscal.members('crds', period)
52          1    2013423.0 2013423.0     57.9          crds_pfam = individu.famille('crds_pfam', period)
285         1    1226506.0 1226506.0     61.8          paje = famille("paje", period, options=[ADD])
87         12    1247258.0  103938.2     98.9          paje_cmg = famille('paje_cmg', period)
509        12    1215246.0  101270.5     98.8          aah_i = famille.members('aah', period)
332        16    1354815.0   84675.9     99.8          aah_base = individu('aah_base', period)
311        16    1302427.0   81401.7     99.3          aah_base_ressources = individu.famille('aah_base_ressources', period) / 12
73         16    1282607.0   80162.9     98.2          base_ressource_eval_trim(),
58         16     810869.0   50679.3     63.5          base_ressource_activite_demandeur = famille.demandeur('aah_base_ressources_activite_eval_trimestrielle', period) - famille.demandeur('aah_base_ressources_activite_milieu_protege', three_previous_months, options = [ADD])
113        16     785874.0   49117.1     98.5          [individu(ressource, three_previous_months, options = [ADD]) for ressource in ressources_a_inclure]
148        31     777545.0   25082.1     99.0          chomage_imposable = individu("chomage_imposable", period)
134        37     857364.0   23172.0     99.5          csg_deductible_chomage = individu("csg_deductible_chomage", period)
52         37     820912.0   22186.8     97.9          taux_csg_remplacement = individu("taux_csg_remplacement", period)
28         25    1534376.0   61375.0     99.4          rfr = individu.foyer_fiscal("rfr", period=period.n_2)
2208        4    1418229.0  354557.2     89.8          rni = foyer_fiscal('rni', period)
1082        3    2746777.0  915592.3     99.9          rng = foyer_fiscal('rng', period)
1067        3    2763749.0  921249.7     99.8          rbg = foyer_fiscal('rbg', period)
1028        3    2757742.0  919247.3     99.9          revenu_categoriel = foyer_fiscal('revenu_categoriel', period)
983         3    2659102.0  886367.3     99.0          rev_cat_tspr = foyer_fiscal('revenu_categoriel_tspr', period)
617         3    2701246.0  900415.3    100.0          tspr_i = foyer_fiscal.members('traitements_salaires_pensions_rentes', period)
556         3    2674322.0  891440.7     99.3          revenu_assimile_salaire_apres_abattements = individu('revenu_assimile_salaire_apres_abattements', period)
416         4    2702072.0  675518.0    100.0          revenu_assimile_salaire = individu('revenu_assimile_salaire', period)
401         4    2579118.0  644779.5     97.2          salaire_imposable = individu('salaire_imposable', period, options = [ADD])
```

From `salaire_imposable`, we can follow two different branches:

1. The `indemnite_residence` branch:

    ```py
    Line #   Hits    Time        Per Hit    % Time         Line Contents
    ====================================================================

    199        48    1951692.0   40660.2     59.3          indemnite_residence = individu('indemnite_residence', period)
    737        48    1615270.0   33651.5     73.0          _P = parameters(period)
    ```

    Let's find out where `parameters` is defined by modifying the code as follows:

    ```diff
    class indemnite_residence(Variable):
        value_type = float
        entity = Individu
        label = "Indemnité de résidence des fonctionnaires"
        definition_period = MONTH
        set_input = set_input_divide_by_period

        def formula(individu, period, parameters):
    +       breakpoint()
    ```

    Then running `openfisca test` with [The Python Debugger](https://docs.python.org/3/library/pdb.html):

    ```py
    $ openfisca test --pdb tests/formulas/irpp_prets_participatifs.yaml

    ...

    (Pdb) parameters.__qualname__
    'TaxBenefitSystem.get_parameters_at_instant'
    ```

2. The `cotisations_salariales` branch:

    ```py
    Line #   Hits    Time        Per Hit    % Time         Line Contents
    ====================================================================

    202        48    1054648.0   21971.8     32.0          cotisations_salariales = individu('cotisations_salariales', period)
    180        48     784194.0   16337.4     74.7          cotisations_salariales_contributives = individu('cotisations_salariales_contributives', period)
    117        48     265682.0    5535.0     34.1          agff_salarie = individu('agff_salarie', period)
    224        48     264976.0    5520.3     99.9          variable_name = "agff_salarie"
    67        480     583017.0    1214.6     66.7          ) + (
    113        40      50839.0    1271.0     96.1          bareme_name = bareme_name,
    99       1000     360294.0     360.3     44.8          categorie_salarie = categorie_salarie,
    40       1192     449850.0     377.4     98.5          return - sum(iter_cotisations())
    37       2532     359388.0     141.9     77.2          round_base_decimals = round_base_decimals,
    ```

    Performing a search to find the definition of `iter_cotisations` gives us the following:

    ```py
        def iter_cotisations():
            # ...

                yield bareme.calc(
                    base * (categorie_salarie == categorie_salarie_type),
                    factor = plafond_securite_sociale,
                    round_base_decimals = round_base_decimals,
                    )
    ```

    Let's find out where `bareme.calc` is defined by modifying the code as follows:

    ```diff
        def iter_cotisations():
            # ...

    +           breakpoint()
                yield bareme.calc(
                    base * (categorie_salarie == categorie_salarie_type),
                    factor = plafond_securite_sociale,
                    round_base_decimals = round_base_decimals,
                    )

    ```

    Then running `openfisca test` with [The Python Debugger](https://docs.python.org/3/library/pdb.html):

    ```py
    $ openfisca test --pdb tests/formulas/irpp_prets_participatifs.yaml

    ...

    (Pdb) bareme.calc.__qualname__
    'MarginalRateTaxScale.calc'
    ```

Great! We've found two performance bottlenecks in OpenFisca-Core:

- `TaxBenefitSystem.get_parameters_at_instant`
- `MarginalRateTaxScale.calc`

How do we proceed?

## Follow to the core

We'll continue our profiling in core, following `TaxBenefitSystem.get_parameters_at_instant`.

For that, we need to install OpenFisca Core in editable mode:

```py
pip install -e /path/to/openfisca-core
```

And as before we add the `@profile` decorator:

```py
@profile
def get_parameters_at_instant(self, instant):
```

Let's see:

```py
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
   337                                               @profile
   338                                               def get_parameters_at_instant(self, instant):
   339                                                   """
   340                                                   Get the parameters of the legislation at a given instant
   341                                           
   342                                                   :param instant: string of the format 'YYYY-MM-DD' or `openfisca_core.periods.Instant` instance.
   343                                                   :returns: The parameters of the legislation at a given instant.
   344                                                   :rtype: :any:`ParameterNodeAtInstant`
   345                                                   """
   346      4351       4124.0      0.9      0.2          if isinstance(instant, Period):
   347      4254       5094.0      1.2      0.2              instant = instant.start
   348        97        101.0      1.0      0.0          elif isinstance(instant, (str, int)):
   349                                                       instant = periods.instant(instant)
   350                                                   else:
   351        97         54.0      0.6      0.0              assert isinstance(instant, Instant), "Expected an Instant (e.g. Instant((2017, 1, 1)) ). Got: {}.".format(instant)
   352                                           
   353      4351       3732.0      0.9      0.2          parameters_at_instant = self._parameters_at_instant_cache.get(instant)
   354      4351       2108.0      0.5      0.1          if parameters_at_instant is None and self.parameters is not None:
   355        50    2043730.0  40874.6     99.2              parameters_at_instant = self.parameters.get_at_instant(str(instant))
   356        50        150.0      3.0      0.0              self._parameters_at_instant_cache[instant] = parameters_at_instant
   357      4351       1672.0      0.4      0.1          return parameters_at_instant
```

Let's take a closer look at `parameters.get_at_instant`:

```py
class AtInstantLike(abc.ABC):
    # ...

    @profile
    def get_at_instant(self, instant):
        instant = str(periods.instant(instant))
        return self._get_at_instant(instant)
```

And the results of running the profiler:

```py
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
    14                                               @profile
    15                                               def get_at_instant(self, instant):
    16     54550     681341.0     12.5     61.4          instant = str(periods.instant(instant))
    17     54550     429057.0      7.9     38.6          return self._get_at_instant(instant)
```

This is the whole snippet for the expensive `periods.instant` function:

```py
def instant(instant):
    # ... 

    if isinstance(instant, str):
        # ...

        instant = periods.Instant(
            int(fragment)
            for fragment in instant.split('-', 2)[:3]
            )
```

We'll refactor it as follows:

```py
fragments = instant.split('-', 2)[:3]
fragments = [int(fragment) for fragment in fragments]
instant = periods.Instant(fragment for fragment in fragments)
```

So as to see where the bottleneck is:

```py
Line #  Hits     Time      Per Hit    % Time         Line Contents
==================================================================

40     44100     223427.0      5.1     31.4          fragments = [int(fragment) for fragment in fragments]
```

Perfect!

## Isolate the bottleneck

Now we're going to isolate it:

```py
fragments = instant.split('-', 2)[:3]
fragments = [parse_fragment(fragment) for fragment in fragments]
instant = periods.Instant(fragments)

# ...

@profile
def parse_fragment(fragment: str) -> int:
    return int(fragment)
```

And profile it again:

```py
Line #  Hits     Time      Per Hit    % Time         Line Contents
==================================================================

40     44100     442069.0     10.0     52.2          fragments = [parse_fragment(fragment) for fragment in fragments]
210   132300      72826.0      0.6    100.0          return int(fragment)
```

## Elevate the bottleneck

Now we need to choose a strategy to reduce the bottleneck's impact on performance.

We can either:

- reduce the impact per hit
- reduce the number of hits

Taking a look at the last line we profiled, we can see that:

- time per hit is very low —implementing a casting algorithm more efficient than the builtin `int` seems unlikely
- the range of reasonable values for the `fragment` argument is very low: 31 days, 12 months, 2021 → 2064
- there are 132300 hits, and that's just for a single simulation (!)

So let's try to reduce the number of hits!

Once again, we could for example:

- reduce recursion
- create a lookup table

In this case, creating a lookup table seems more cost-efficient:

- the function application has no side effects
- the range of reasonable values for `fragment` is very low
- return values are identical for identical values of `fragment`

We'll use `functools.lru_cache` for our lookup table:

```py
import functools

# ...

@functools.lru_cache(maxsize = 100)
def parse_fragment(fragment: str) -> int:
    return int(fragment)
```

Let's see how it does:

```py
Line #  Hits   Time        Per Hit    % Time         Line Contents
==================================================================

355       50   1809954.0   36199.1     99.0          parameters_at_instant = self.parameters.get_at_instant(str(instant))
16     44100    421208.0       9.6     49.0          instant = str(periods.instant(instant))
41     44100     97584.0       2.2     20.6          fragments = [parse_fragment(fragment) for fragment in fragments]
212       17        40.0       2.4    100.0          return int(fragment)
```

Wow! The number of hits to `parse_fragment` decreased by 99%, improving the generator performance by 353%!

That's it!

## Caching further

Once we know it works, can't we go further?

With a couple of extra caches and code refactoring, we could end up with something like this:

```py
from __future__ import annotations

# ...

import functools

# ...

from typing import Optional

# ...

@functools.lru_cache(maxsize = 1000)
def instant(instant) -> Optional[periods.Instant]:

    if instant is None:
        return None

    if isinstance(instant, str):
        if not config.INSTANT_PATTERN.match(instant):
            raise_error(instant)

        fragments = instant.split('-', 2)[:3]
        integers = [parse_fragment(fragment) for fragment in fragments]
        instant = periods.Instant(integers)

    elif isinstance(instant, datetime.date):
        instant = periods.Instant((instant.year, instant.month, instant.day))

    elif isinstance(instant, int):
        instant = (instant,)

    elif isinstance(instant, (list, tuple)):
        assert 1 <= len(instant) <= 3
        instant = tuple(instant)

    elif isinstance(instant, periods.Period):
        instant = instant.start

    elif isinstance(instant, periods.Instant):
        return instant

    else:
        return instant

    return globals()[f"instant_{len(instant)}"](instant)


@functools.lru_cache(maxsize = 1000)
def parse_fragment(fragment: str) -> int:
    return int(fragment)


@functools.lru_cache(maxsize = 1000)
def instant_1(instant: periods.Instant) -> periods.Instant:
    return periods.Instant((instant[0], 1, 1))


@functools.lru_cache(maxsize = 1000)
def instant_2(instant: periods.Instant) -> periods.Instant:
    return periods.Instant((instant[0], instant[1], 1))


@functools.lru_cache(maxsize = 1000)
def instant_3(instant: periods.Instant) -> periods.Instant:
    return periods.Instant(instant)
```

Please note that we're importing `annotations` from `__future__` so as to postpone the evaluation of type annotations ([PEP484](https://www.python.org/dev/peps/pep-0484/) and [PEP563](https://www.python.org/dev/peps/pep-0563/)), in order to avoid [cyclic imports](https://discuss.python.org/t/how-to-add-type-hints-for/7459).

Let's profile again:

```py
Line #  Hits    Time        Per Hit    % Time         Line Contents
===================================================================

355       50    1787843.0   35756.9     98.8          parameters_at_instant = self.parameters.get_at_instant(str(instant))
16     44100      92290.0       2.1     14.1          instant = str(periods.instant(instant))
48        50        349.0       7.0     22.2          integers = [parse_fragment(fragment) for fragment in fragments]
213       17         76.0       4.5    100.0          return int(fragment)
```

And overall?

```py
PYTEST_ADDOPTS="$PYTEST_ADDOPTS --durations=3" openfisca test --country-package openfisca_france tests/formulas/irpp_prets_participatifs.yaml

...

7.33s call     tests/formulas/irpp_prets_participatifs.yaml::
7.16s call     tests/formulas/irpp_prets_participatifs.yaml::
2.46s call     tests/formulas/irpp_prets_participatifs.yaml::
```

Looks promising!

## Beware of context

So we tried reducing the number of hits, what about reducing the impact per hit?

Looking back to `get_at_instant`, let's follow the next function call:

```py
Line #  Hits     Time      Per Hit    % Time         Line Contents
===================================================================

16     44100      76860.0      1.7     15.4          instant = str(periods.instant(instant))
17     44100     421350.0      9.6     84.6          return self._get_at_instant(instant)
```

Let's look at that code closer:

```py
def _get_at_instant(self, instant):
    for value_at_instant in self.values_list:
        if value_at_instant.instant_str <= instant:
            return value_at_instant.value
    return None
```

A linear search! I know what you're thinking, what if we do a binary search instead?

Let's try that out (naive implementation):

```diff
+import sortedcontainers

# ...

class Parameter(AtInstantLike):
    # ...

    def __init__(self, name, data, file_path = None):
        #...

        values_list = []
+       values_dict = sortedcontainers.sorteddict.SortedDict()
        
        # ...

            values_list.append(value_at_instant)
+           values_dict.update({instant_str: value_at_instant})

        self.values_list: typing.List[ParameterAtInstant] = values_list
+       self.values_dict = values_dict

        # ...


    def _get_at_instant(self, instant):
-       for value_at_instant in self.values_list:
-           if value_at_instant.instant_str <= instant:
-               return value_at_instant.value
-       return None
+       index = self.values_dict.bisect_right(instant)
+
+       if index > len(self.values_list):
+           return None
+
+       return self.values_list[::-1][index - 1].value
```

And performance wise?

```py
Line #  Hits     Time      Per Hit    % Time         Line Contents
===================================================================

16     44100      82468.0      1.9     10.6          instant = str(periods.instant(instant))
17     44100     696812.0     15.8     89.4          return self._get_at_instant(instant)
177   196150     596129.0      3.0     65.8          index = self.values_dict.bisect_right(instant)
```

It's actually worse... but why?

One hypothesis is, even if, compared to a linear search with complexity _O(n)_, a binary search should be more efficient in that it has a complexity of _O(log(n))_, it will actually be more efficient for large numbers of _n_, which is not usually the case here.

In fact, creating a lookup table for parameters would be theoretically more efficient. That would require refactoring, as the current `values_list` object is not hashable. Indeed, even using a more appropiate data structure could lead to better performance.

## Wrap up

Finally, let's run our base & proposed scenarios several times so as to have something more statistically sound.

IPython's `%timeit` comes handy:

```py
pip install ipython
ipython
%timeit -n 10 -r 3 !openfisca test --country-package openfisca_france tests/formulas/irpp_prets_participatifs.yaml

...

# Before
17.2 s ± 261 ms per loop (mean ± std. dev. of 3 runs, 10 loops each)

# After
17.1 s ± 49.2 ms per loop (mean ± std. dev. of 3 runs, 10 loops each)
```

Statistically irrelevant :/ but hey! Life is about the journey, not the destination :)

But now what? Reduce recursion? But how? Split-Apply-Combine?

To be continued...
