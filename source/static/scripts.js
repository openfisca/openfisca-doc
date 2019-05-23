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

  // Internal docs containing an anchor are wrongly transpiled to an absolute link starting by '/'. This causes dead links when we serve under openfisca.org/doc. The following manually fix these links in JS. This could be avoided if we served on doc.openfisca.org
  $( "a[href^='/']" ).attr("href",
    function( _, href ) {
      return getPathName() + href;
    }
  );

  $( "img[src^='/']" ).attr("src",
    function( _, src ) {
      return getPathName() + src;
    }
  );

  // Activate action button tooltip
  $('.actionbutton').tooltip()
});




// FEEDBACK

var Feedback = {

  init: function(){
      this.cacheDom();
      this.settings();
      this.bindEvents();
  },

  settings: function(){

  },

  cacheDom: function(){
      this.$el = $(".feedback-container");
      this.$feedbackTrigger = this.$el.find('.feedback-trigger');
  },

  bindEvents: function(){
      this.$feedbackTrigger.on('click', this.toggleWidget.bind(this));
  },

  toggleWidget: function(e){
      this.$el.toggleClass('isOpen');
      e.preventDefault()
  }

}

/* VALIDATION
--------------------------------------- */

var Validation = {

  init: function(){
      this.cacheDom();
      this.bindEvents();
  },

  cacheDom: function(){
      this.$inputs = $('input.required');
  },

  bindEvents: function(){
      this.$inputs.on('keyup', this.onKeyPress.bind(this));
  },

  onKeyPress: function(e){

      var $input = this.$inputs.filter($(e.target));

      if ($input.attr('type') == "email") {
          $input.state = this.validateEmail($input.val());
          this.setState($input, $input.state);
      }

  },

  setState: function($input, state){
      $input.toggleClass('isValid', state)
  },

  validateEmail: function(email){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
}


/* PAGES
--------------------------------------- */

var Pages = {

  $currentPage: false,
  currentPageId: false,

  init: function(){
      this.cacheDom();
      this.bindEvents();
      this.ready();
  },

  cacheDom: function(){
      this.$container = $('.feedback-container');
      this.$pages = $('.feedback-page');
  },

  bindEvents: function(){
      this.$pages.on('show', this.showPage.bind(this));
      this.$pages.on('click', '*[data-go-to-page]', this.showPage.bind(this));
  },

  ready: function(){
      this.showPage(this.$pages.first().data('pagename'));
  },

  showPage: function(name){

      // Event or string

      name = (typeof name == "object") ? $(name.target).data('go-to-page') : name;

      // Going forward or backward?

      var newpageId = this.$pages.filter('*[data-pagename="' + name + '"]').index() + 1;
      var lastpageId = this.currentPageId;

      // If going forward ( not previous ) do some validations
      // Focus on the first field and return if we have invalids

      if (newpageId > lastpageId) {

          if (this.$currentPage && this.$currentPage.find('input.required')){

              var invalidFields = this.$currentPage.find('input.required:not(".isValid")').length;

              if (invalidFields > 0) {
                  this.$currentPage.find('input.required').first().focus();
                  return;
              }

          }

      }

      // All good, we can move to the next page ------------------------------

      // Hold onto currentPage and Id
      this.$currentPage = this.$pages.filter('*[data-pagename="' + name + '"]');
      this.currentPageId = this.$currentPage.index() + 1;

      // Change class attr on the container to trigger the animation
      this.$container.attr('data-show-page', this.currentPageId);
  },

}

$(function(){
  Pages.init();
  Validation.init();
  Feedback.init();
})
