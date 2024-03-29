#!/bin/sh

set -ex

git clone --branch gh-pages https://github.com/openfisca/openfisca.org.git
mv build/html doc
rm --recursive --force openfisca.org/doc
mv doc openfisca.org/doc
cd openfisca.org
git fetch  # Make sure we are up to date with git remote branches
git add --all
git config --global user.name "OpenFisca-Bot"
git config --global user.email "bot@openfisca.org"
git diff-index --quiet HEAD || git commit --message="[skip ci] Update doc"
git push https://github.com/openfisca/openfisca.org.git gh-pages
if git status --untracked-files=no ; then
	echo "There was an issue pushing to openfisca.org"
fi
rm --recursive --force $(git ls-files | grep --invert-match doc)  # remove all files in the branch except the doc file.

# keep the context while changing branch
git checkout --detach
git reset --soft origin/doc-html
git checkout doc-html
git add --all
git diff-index --quiet HEAD || git commit --message="[skip ci] Update doc"
git push
