# Modelling legislation

<div class="present"><div class="reveal"><div class="slides">

  <section class="has-dark-background" data-background="#240b35" data-background-image="../_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Modelling legislation</h2>
    <p>
      <small>(Rules as Code + OpenFisca) training series, session three.</small>
    </p>
    <p><a href="https://openfisca.org" class="logo"><img src="../_static/img/openfisca.svg" alt="OpenFisca" ></a></p>
  </section>

  <section>
    <h2>Overview</h2>
    <p>
      <ol>
        <li>Variables</li>
        <li>Parameters</li>
        <li>Testing</li>
      </ol>
    </p>
  </section>

  <section>
    <h2>1. Variables</h2>
    <img src="../_static/img/training/variable.png" alt="Simple variable example showing 'fulltime employment'" />
    <p>Simple variable boolean example, note:</p>
    <small>
      <ul>
        <li>The reference url</li>
        <li>The entity the variable belongs to</li>
        <li>The definition period</li>
        <li>The lack of a formula</li>
      </ul>
    </small>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/variables/demographics/work.py">github.com/BetterRules/openfisca-aotearoa/.../demographics/work.py</a></small>
    </p>
  </section>

  <section>
    <small>Variables cont.</small>
    <img src="../_static/img/training/formula.png" alt="Parameter example from OpenFisca Aotearoa showing 'Age of majority'" />
    <p>Variable with formula example​</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/variables/demographics/work.py">github.com/BetterRules/openfisca-aotearoa/.../demographics/work.py</a></small>
    </p>
  </section>

  <section>
    <small>Variables cont.</small>
    <p>Working with vectors</p>
    <ul>
      <li>OpenFisca formulas should always return vectors</li>
      <li>The formulas need to preserve the incoming vector 'shape'</li>
      <li>This means if/else statements aren't possible</li>
  </section>


  <section>
    <h2>2. Parameters</h2>
    <img src="../_static/img/training/parameter.png" alt="Parameter example from OpenFisca Aotearoa showing 'Age of majority'" />
    <p>Simple parameter example​</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/master/openfisca_aotearoa/parameters/general/age_of_majority.yaml">github.com/BetterRules/openfisca-aotearoa/.../age_of_majority.yaml</a></small>
    </p>
  </section>

  <section>
    <small>Parameters cont.</small>
    <img src="../_static/img/training/parameter-refencing.png" alt="Parameter example from OpenFisca Aotearoa showing References to data point sources" />
    <p>Referencing: note ref. urls for source data​</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/parameters/social_security/schedule_5/asset_limits_1.yml">github.com/BetterRules/openfisca-aotearoa/.../asset_limits_1.yml</a></small>
    </p>
  </section>

  <section>
    <small>Parameters cont.</small>
    <img src="../_static/img/training/parameter-time.png" alt="Parameter example showing value changes over time" />
    <p>Time based values​</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/parameters/social_security/schedule_5/asset_limits_1.yml">github.com/BetterRules/openfisca-aotearoa/.../asset_limits_1.yml</a></small>
    </p>
  </section>

  <section>
    <small>Parameters cont.</small><br/>
    <img src="../_static/img/training/parameter-scale.png" alt="Parameter example showing value changes over time" />
    <p>Scale example with use case</p>
    <img src="../_static/img/training/parameter-scale2.png" alt="Utilising the parameter in a formula" />
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/parameters/social_security/income_test_1.yaml">github.com/BetterRules/openfisca-aotearoa/.../income_test_1.yaml</a></small>
    </p>
  </section>

  <section>
    <small>Parameters cont.</small><br/>
    <img src="../_static/img/training/parameter-complex1.png" alt="Parameter example showing value changes over time" />
    <p>Complex example and use case</p>
    <img src="../_static/img/training/parameter-complex2.png" alt="Utilising the parameter in a formula" />
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/parameters/social_security/jobseeker_support/base.yaml">github.com/BetterRules/openfisca-aotearoa/.../jobseeker_support/base.yaml</a></small>
    </p>
  </section>

  <section>
    <h2>3. Tests</h2>
    <img src="../_static/img/training/tests-simple.png" alt="Simple test example" />
    <p>Simple test with multiple inputs and one output</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/tests/social_security/disability_allowance/entitled.yaml">github.com/BetterRules/openfisca-aotearoa/.../entitled.yaml</a></small>
    </p>
  </section>
   
  <section>
    <small>Tests cont.</small><br/>
    <img src="../_static/img/training/tests-example2.png" alt="Simple test example with multiple scenarios" />
    <p>Testing a single formula from multiple scenarios</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/tests/social_security/child.yaml">github.com/BetterRules/openfisca-aotearoa/.../child.yaml</a></small>
    </p>
  </section>
   
  <section>
    <small>Tests cont.</small><br/>
    <img src="../_static/img/training/tests-entities.png" alt="Testing with entities" />
    <p>Testing example that utilises entities (families)</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/tests/social_security/community_services_card.yaml">github.com/BetterRules/openfisca-aotearoa/.../community_services_card.yaml</a></small>
    </p>
  </section>
   
  <section>
    <small>Tests cont.</small><br/>
    <img src="../_static/img/training/tests-entities.png" alt="Testing with entities" />
    <p>Testing example that utilises entities (families)</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/tests/social_security/community_services_card.yaml">github.com/BetterRules/openfisca-aotearoa/.../community_services_card.yaml</a></small>
    </p>
  </section>
   
  <section>
    <small>Tests cont.</small><br/>
    <img src="../_static/img/training/tests-entities2.png" alt="Testing with entities and multiple people" />
    <p>Testing example that utilises multiple family members</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/tests/social_security/community_services_card.yaml">github.com/BetterRules/openfisca-aotearoa/.../community_services_card.yaml</a></small>
    </p>
  </section>
   
  <section>
    <small>Tests cont.</small><br/>
    <img src="../_static/img/training/tests-complex.png" alt="Testing multiple scenarios over multiple periods" />
    <p>Testing multiple scenarios over multiple periods</p>
    <p>
      <small><a href="https://github.com/BetterRules/openfisca-aotearoa/blob/main/openfisca_aotearoa/tests/social_security/jobseeker_support/base.yaml">github.com/BetterRules/openfisca-aotearoa/.../jobseeker_support/base.yaml</a></small>
    </p>
  </section>

</div></div></div>

<br>

**Hotkeys**

- `f`: full screen
- `s`: speaker notes
- `b`: pause
- `←` / `→` / `space`: navigate through slides
- `cltr` / `alt`  + click to zoom
