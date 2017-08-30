#!/bin/sh

git clone -b gh-pages https://github.com/openfisca/openfisca.org.git
mv _book doc
rm -rf openfisca.org/doc
mv doc openfisca.org/doc
cd openfisca.org
git add .
git config --global user.name "OpenFisca-Bot"
git config --global user.email "contact@openfisca.fr"
git commit -m "Push from openfisca doc"
git push https://github.com/openfisca/openfisca.org.git gh-pages
if git status --untracked-files=no ; then
	echo "There was an issue pushing to openfisca.org"
fi

git filter-branch --tree-filter 'rm -rf $(git ls-files | egrep -v doc)' -- --all
git add .
git commit -m "Push from openfisca doc"
git push https://github.com/openfisca/openfisca.org.git gh-pages:doc-html -f
