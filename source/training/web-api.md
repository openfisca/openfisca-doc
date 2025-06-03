# Using the web API

<div class="present"><div class="reveal"><div class="slides">

  <section class="has-dark-background" data-background="#240b35" data-background-image="../_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Using the web API / Application building</h2>
    <p>
      <small>(Rules as Code + OpenFisca) training series, session four.</small>
    </p>
    <p><a href="https://openfisca.org" class="logo"><img src="../_static/img/openfisca.svg" alt="OpenFisca" ></a></p>
  </section>

  <section>
    <h2>OpenFisca API</h2>
    <p>Simple input/output API design</p>
    <p>Not suitable for large scale simulations</p>
    <p>Documentation: <br/><a href="http://openfisca.org/doc/openfisca-web-api/index.html">http://openfisca.org/doc/openfisca-web-api/index.html</a></p>
  </section>

  <section>
    <h2>API Documentation</h2>
    <p>Supports OpenAPI specification, endpoint at '/spec', examples:</p>
    <p><a href="http://api.demo.openfisca.org/latest/spec">http://api.demo.openfisca.org/latest/spec</a></p>
    <p><a href="https://openfisca-aotearoa.synco.pt/spec">https://openfisca-aotearoa.synco.pt/spec</a></p>
  </section>

  <section>
    <h2>API and Swagger</h2>
    <p>Example:</p>
    <p><a href="http://legislation.demo.openfisca.org/swagger">http://legislation.demo.openfisca.org/swagger</a></p>
  </section>

  <section>
    <h2>Example API Calls</h2>
    <p>A collection of calls is explorable in the OpenFisca Aotearoa instance</p>
    <p><a href="https://github.com/BetterRules/openfisca-aotearoa/tree/master/openfisca_aotearoa/api_examples">https://github.com/BetterRules/openfisca-aotearoa/tree/master/openfisca_aotearoa/api_examples</a></p>
  </section>

  <section>
    <h2>Application Planning</h2>
    <p>Planning: divide inputs into:</p>
    <ul>
      <li>Computable<br><small> - "we know their birthdate so we can compute their age"</small></li>
      <li>Already known<br><small> - "this application is only applicable to citizens"</small></li>
      <li>User answers required<br><small> - "we need to know how much they've earned this week"</small></li>
    </ul>
  </section>

  <section>
    <small>Application cont.</small><br/>
    <p>Minimise the number of questions required.</p>
    <ul>
      <li>Create question logic trees<br><small> - "we only ask their income if they have a job"</small><br/><em>- this is often in tension with:</em></li>
      <li>If they answer this question first we can exit<br><em>- and/or:</em></li>
      <li>We have these 5 essential opening questions</li>
    </ul>
  </section>

  <section>
    <small>Application cont.</small><br/>
    <p>How much can we inform without questions?.</p>
    <ul>
      <li>"If you earn more than $120k you are not eligible"</li>
      <li>"Here is a table of all the possible results"</li>
      <li>"We will be asking these 5 essential opening questions"</li>
    </ul>
  </section>

  <section>
    <small>Application cont.</small><br/>
    <p>Mapping questions/answers to OpenFisca variables</p>
    <ul>
      <li>This question answers which inputs<br><em> - question asking is difficult, try to match context and legal terminology</em></li>
      <li>This result for variable X can be used in variable Y</li>
      <li>We need this group of answers to compute this variable</li>
    </ul>
  </section>

</div></div></div>

<br>

**Hotkeys**

- `f`: full screen
- `s`: speaker notes
- `b`: pause
- `←` / `→` / `space`: navigate through slides
- `cltr` / `alt`  + click to zoom
