var ghpages = require('gh-pages');

ghpages.publish(
  '_book',
  {
    user: {
      name: 'OpenFisca-Bot',
    },
    branch: 'doc-branch-publish',
    message: 'Auto-commit from master branch',
    repo: 'https://github.com/openfisca/openfisca.org.git',
  },
  function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
);
