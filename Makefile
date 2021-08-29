# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Install doc dependencies.
install:
	pip install --upgrade pip
	pip install -r requirements.txt --use-deprecated=legacy-resolver

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

dev:
	rm -Rf $(BUILDDIR)
	sphinx-autobuild $(SOURCEDIR) $(BUILDDIR)

test:
	@${SPHINXBUILD} -M dummy "$(SOURCEDIR)" "$(BUILDDIR)" -n -q -W
