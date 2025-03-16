# RaC Background

<div class="present"><div class="reveal"><div class="slides">

  <section class="has-dark-background" data-background="#240b35" data-background-image="/_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Rules as Code Background</h2>
    <p>
      <small>(Rules as Code + OpenFisca) training series, session one.</small>
    </p>
    <p><a href="https://openfisca.org" class="logo"><img src="/_static/img/openfisca.svg" alt="OpenFisca" ></a></p>
    <p><small class="author">created by <a href="https://hamish.dev">Hamish Fraser</a></small></p>
  </section>

  <section class="has-dark-background" data-background="#240b35" data-background-image="/_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Rules as Code</h2>
    <blockquote>“To understand how to design rules-as-code projects it's important to understand what they are.”</blockquote>
  </section>

  <section>
    <h2>Different Perspectives</h2>
    <ol>
    <li>Constitutional considerations</li>
    <li>Policy development</li>
    <li>Public service</li>
    </ol>
  </section>

  <section class="has-dark-background" data-background="#240b35" data-background-image="/_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Perspective 1</h2>
    <p>Constitutional considerations</p>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Separation of Powers 1/3</h2>
    <div class="column_two">
      <ul class="dotless">
        <li>The Legislature <br>&nbsp;&nbsp;<small>-writes the law</small></li>
        <li>The Executive <br>&nbsp;&nbsp;<small>-initiates &amp; implements</small></li>
        <li>The Judiciary <br>&nbsp;&nbsp;<small>-interprets &amp; enforces</small></li>
      </ul>
      <p><br><br>&rArr; Separation of Powers<br><small>(Checks and balances to avoid concentration of power)</small></p>
    </div>
    <p>Enabled by attributes of <b>natural language</b></p>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Separation of Powers 2/3</h2>
    <div class="column_two">
      <div>
        <h4>Natural Language</h4>
        <p>Socially agreed shared language. Words find meaning from context. ​</p><p>Written symbols gain meaning through their association to natural language. ​</p><p>A rule is applied to scenarios through interpretation</p>
      </div>
      <div>
        <h4>Computer Code</h4>
        <p>Specific instructions defining one singular interpretation by machine.​</p><p>Shares symbols with natural language; only one "meaning" to a machine.​</p><p>Requires scenarios to fit the  singular interpretation.​​</p>
      </div>
    </div>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Separation of Powers 3/3</h2>
    <blockquote>“When law is expressed in code, the question of how the law should be interpreted is subsumed into the code itself.”​</blockquote>
    <p><small><a href="https://hamish.dev/research/lac/part-three#para263" target="_blank">https://hamish.dev/research/lac/part-three#para263</a>​</small></p>
    <aside class="notes">
      Legislation which-IS-code; impacts on the separation of powers.
    </aside>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Rule of Law 1/3</h2>
    <h3>Principles​</h3>
    <p>Everyone is subject to the law​</p>
    <p>The law should be clear, & clearly enforceable​​</p>
    <p>There should be an independent, impartial judiciary​​​</p>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Rule of Law 2/3</h2>
    <blockquote>“Legislative complexity is a growing challenge across the Commonwealth statute book” <sup>1</sup>​​</blockquote>
    <blockquote>“It undermines the rule of law” ​<sup>2</sup>.​​</blockquote>
    <blockquote>“The Rule of Law requires that the law is simple, clear and accessible. Yet English law has in become increasingly more complex, unclear and inaccessible” <sup>3</sup>.​​</blockquote>
    <p class="footnotes">(1) <a href="https://www.alrc.gov.au/datahub/legislative-complexity-and-law-design/measuring-legislative-complexity/" target="_blank">Measuring Legislative Complexity​</a><br>
    (2) <a href="https://www.gov.uk/government/publications/when-laws-become-too-complex/when-laws-become-too-complex​" target="_blank">When laws become too complex</a>​<br>
    (3) <a href="https://www.judiciary.uk/wp-content/uploads/2021/07/ENGLISH-LAW-AND-DESCENT-INTO-COMPLEXITY-1.pdf" target="_blank">ENGLISH LAW AND DESCENT INTO COMPLEXITY</a>​</p>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Rule of Law 3/3</h2>
    <p>Complexity is not the issue; humans are complex​​</p>
    <p>The law being “clear” is the principle</p>
    <p>Computers can make complexity clear​</p>
  </section>

  <section>
    <small>1. Constitutional considerations</small>
    <h2>Summary</h2>
    <p class="left">RaC as interpretation of law works when:
      <ul>
        <li>it upholds the role of natural language (Separation of powers)​</li>
        <li>it makes the law more clear​ (Rule of Law principles)</li>
      </ul>
    ​</p>
    <p class="footnotes"><a href="https://hamish.dev/research/lac/part-four#highly-reliable-interpretations-are-valuable" target="_blank">“Highly reliable interpretations” are already valuable​</a>​</p>
  </section>

  <section class="has-dark-background" data-background="#240b35" data-background-image="/_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Perspective 2</h2>
    <p>Policy Development</p>
  </section>

  <section>
    <small>2. Policy Development</small>
    <h2>Introduction</h2>
    <p>Structured analysis​</p>
    <p>Digital models​​</p>
    <p>Preserving institutional knowledge​</p>
  </section>


  <section>
    <small>2. Policy Development</small>
    <h2>Structured analysis 1/4</h2>
    <p>The first step to explaining policy to a computer​</p>
    <div class="column_two">
      <div>
        <img src="/_static/img/training/residential_rules_natural_language.png" alt="Natural language rule, example Residential areas" />
        <p>Natural language city planning rules</p>
      </div>
      <div>
        <img src="/_static/img/training/residential_rules_data.png" alt="Natural language rule, example Residential areas" />
        <p>Analysis of planning zones​​​</p>
      </div>
    </div>
    <aside class="notes">
      The example is meant to give some insight as to what structured analysis might produce.
    </aside>
  </section>

  <section>
    <small>2. Policy Development</small>
    <h2>Structured analysis 2/4</h2>
    <p>Finding the structural “things”​</p>
    <p>Object orientated type “objects”​​</p>
    <p>“This thing is also that thing”​</p>
    <p>Mapping hierarchy/relationships​</p>
  </section>

  <section>
    <small>2. Policy Development</small>
    <h2>Structured analysis 3/4</h2>
    <p>Multi-Disciplinary Team (<a href="https://betterrules.nz/workshop-manual.html" target="_blank">Better Rules</a>)​</p>
    <p>Programmers are bringing Structural Analysis​</p>
    <p>“Not everyone’s brains are wired that way”​​</p>
    <p>Humility critical for team dynamics​​</p>
  </section>

  <section>
    <small>2. Policy Development</small>
    <h2>Structured analysis 4/4</h2>
    <p>Clarity is hard when mental models not shared​</p>
    <p>Programmer role needed to: provide consumable models &amp; reduce reliance on words/labels​​​</p>
    <p>Goal: avoid “talking past” by utilising concrete examples​​​</p>
  </section>

  <section class="has-dark-background" data-background="#240b35" data-background-image="/_static/img/openfisca-bg.svg" data-background-position="230% 50%" data-background-size="auto 120%">
    <h2>Perspective 3</h2>
    <p>Public Service</p>
  </section>

  <section>
    <small>3. Public Service</small>
    <h2>Rules as Code already exists</h2>
    <p>Computer systems and operations​</p>
    <p>Big P policy + Small P policy + Operations all blended</p>
    <p>Analysis of systems is difficult​</p>
  </section>

  <section>
    <small>3. Public Service</small>
    <h2>Intentional Rules as Code</h2>
    <p>Layered approach that clearly identifies and separates code based on authoritative source.​</p>
    <p>Highly referenced code back to natural language rules for scrutiny and maintenance.</p>
    <p>Open-source like approach that allows for open challenging of interpretation work​</p>
  </section>

  <section>
    <small>3. Public Service</small>
    <h2>Better Rules</h2>
    <p>Policy development that utilises RaC.​</p>
    <p>Test case utilisation for analysing impact.</p>
    <p>RaC plus data for large/small scale explorations​</p>
    <p class="footnote"><a href="https://www.digital.govt.nz/dmsdocument/95-better-rules-for-government-discovery-report/html" target="_blank">Better Rules for Government</a></p>
  </section>

  <section>
    <small>3. Public Service</small>
    <h2>Summary</h2>
    <p>Full structural reform can “close the loop”​</p>
    <p>Data from RaC usage/application informing policy development.</p>
    <p>Allow for more data drive decision making​</p>
  </section>

</div></div></div>

###### Hotkeys

- `f`: full screen
- `s`: speaker notes
- `b`: pause
- `←` / `→` / `space`: navigate through slides
- `cltr` / `alt`  + click to zoom
