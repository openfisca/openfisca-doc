# Using the Python API

<div class="present"><div class="reveal"><div class="slides">

  <section class="has-dark-background" data-background="#240b35" data-background-image="../_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Using the Python API</h2>
    <p>
      <small>(Rules as Code + OpenFisca) training series, session five.</small>
    </p>
    <p><a href="https://openfisca.org" class="logo"><img src="../_static/img/openfisca.svg" alt="OpenFisca" ></a></p>
  </section>

  <section>
    <h2>OpenFisca Python API</h2>
    <p>Allows for large scale simulations</p>
    <p>Useful for modelling and large datasets</p>
    <p>Documentation: <br/><a href="http://openfisca.org/doc/openfisca-python-api/index.html">http://openfisca.org/doc/openfisca-python-api/index.html</a></p>
  </section>

  <section>
    <h2>Simulations</h2>
    <p>"OpenFisca works the same if there is one person, seven, or seven million in the modelled situation."</p>
    <p>Leverages Vector computing via the <a href="http://www.numpy.org/">NumPy</a> package</p>
    <p>Trace feature allows for analysis of simulation results</p>
  </section>

  <section>
    <h2>Test case simulations</h2>
    <p>Matches the Web API functionality</p>
    <p>Test cases can be written in Python</p>
    <p>Requires the SimulationBuilder and a CountryTaxBenefitSystem</p>
    <code>from openfisca_core.simulation_builder import SimulationBuilder</code>
    <code>from openfisca_country_template import CountryTaxBenefitSystem</code>
  </section>

  <section>
    <h2>Bulk data simulations</h2>
    <p>Data can come from database, csv file etc.</p>
    <p>At a minimum a simulation requires:
    <ul>
      <li>unique ids for persons and group entities</li>
      <li>applicable variable names from the CountryTaxBenefitSystem</li>
      <li>the period and entity for each set of values</li>
    </ul>
  </section>

  <section>
    <h2>Advanced simulations</h2>
    <p>Explore the OpenFisca documentation for topics like:</p>
    <ul>
      <li><a href="http://openfisca.org/doc/simulate/replicate-simulation-inputs.html">Replicating a situation along axes</a></li>
      <li><a href="http://openfisca.org/doc/simulate/analyse-simulation.html">Analysing or debugging a simulation</a></li>
      <li><a href="http://openfisca.org/doc/simulate/profile-simulation.html">Profiling a simulation's performance</a></li>
    </ul>
  </section>

  <section>
    <h2>OpenFisca Python API Documentation</h2>
    <p>Extensive documentation can be found on the OpenFisca <a href="http://openfisca.org/doc/">documentation site</a></p>
  </section>

</div></div></div>

<br>

**Hotkeys**

- `f`: full screen
- `s`: speaker notes
- `b`: pause
- `←` / `→` / `space`: navigate through slides
- `cltr` / `alt`  + click to zoom
