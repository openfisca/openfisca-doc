// Piwik/Matomo
var _paq = _paq || [];
_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
_paq.push(["setCookieDomain", "*.openfisca.org"]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//stats.data.gouv.fr/";
  _paq.push(['setTrackerUrl', u+'piwik.php']);
  _paq.push(['setSiteId', '4']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();

$(document).ready(function() {
    $('a[href^="https://"], a[href^="http://"]').attr("target", "_blank"); // Make all external links open in a new Window

    // Internal docs containing an anchor are wrongly transpiled to an absolute link starting by '/'. This causes dead links when we serve under openfisca.org/doc. The following manually fix these links in JS. This could be avoided if we served on doc.openfisca.org
    PATHNAME = '/doc'
    $( "a[href^='/']" ).attr("href",
      function( _, href ) {
        if (document.location.hostname == "localhost") {
          return href;
        }
        return PATHNAME + href;
      }
    );
});
