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

function getPathName() {
  if (location.pathname.startsWith('/doc/')) { // Very ugly. Triggered when the doc is hosted under the /doc/ subdomain. A proper configuration system would be preferable.
    return '/doc';
  }
  return '';
}

$(document).ready(function() {

  $('a[href^="https://"], a[href^="http://"]').attr("target", "_blank"); // Make all external links open in a new Window

});
