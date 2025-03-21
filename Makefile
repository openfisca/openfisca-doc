SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Remove all dependencies.
uninstall:
	@pip freeze | grep -v "^-e" | sed "s/@.*//" | xargs pip uninstall -y

# Install dependencies.
install:
	@pip install --upgrade pip
	@pip install -r requirements.txt

test:
	@${MAKE} lint
	@${MAKE} spellcheck
	@${MAKE} test-build

lint:  # requires Node and NPM to be installed
	@npx --yes markdownlint-cli "**/*.md"

spellcheck:  # check for spelling errors
	@codespell

test-build:
	@${MAKE} dummy SPHINXOPTS="--quiet --fail-on-warning"

format:  # requires Node and NPM to be installed
	@npx --yes markdownlint-cli --fix "**/*.md"
	@codespell --write-changes

# Serve the documentation in dev mode.
dev:
	@rm -Rf $(BUILDDIR)
	@sphinx-autobuild $(SOURCEDIR) $(BUILDDIR)

# Serve the documentation in prod mode.
prod:
	@python -m http.server 8000 --directory build/html

# Catch-all target: route all unknown targets to Sphinx using the
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
