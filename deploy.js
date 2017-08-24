var ghpages = require('gh-pages');

ghpages.publish(
  '_book',
  {
    user: {
      name: 'OpenFisca-Bot',
    },
    branch: 'html-branch-publish',
    message: 'Auto-commit from master branch',
  },
  function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
);
