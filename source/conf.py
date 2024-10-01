# -*- coding: utf-8 -*-
#
# Configuration file for the Sphinx documentation builder.
#
# Full list of Sphinx options is available at http://www.sphinx-doc.org/en/master/config

import guzzle_sphinx_theme

# -- Project information -----------------------------------------------------

project = 'OpenFisca'
author = 'contact@openfisca.org'

# -- General configuration ---------------------------------------------------

extensions = [
    'guzzle_sphinx_theme',
    'myst_parser',
    'sphinx.ext.autodoc',
    'sphinx.ext.coverage',
    'sphinx.ext.doctest',
    'sphinx.ext.githubpages',
    'sphinx.ext.ifconfig',
    'sphinx.ext.imgmath',
    'sphinx.ext.intersphinx',
    'sphinx.ext.napoleon',
    'sphinx.ext.todo',
    'sphinx.ext.viewcode',
    'sphinx_autodoc_typehints',
    'sphinxarg.ext',
]

intersphinx_mapping = {
    'numpy': ('https://numpy.org/doc/stable/', None),
    'python': ('https://docs.python.org/3/', None),
    }

source_suffix = ['.rst', '.md']

master_doc = 'summary'


# -- Options for HTML output -------------------------------------------------


html_theme_path = guzzle_sphinx_theme.html_theme_path()
html_theme = 'guzzle_sphinx_theme'

html_theme_options = {
    'project_nav_name': 'OpenFisca',
    'homepage': 'index',  # Different than the master doc
}

html_static_path = ['static']
templates_path = ['_templates']
html_sidebars = {'**': ['sidebar.html']}

myst_heading_anchors = 5  # https://myst-parser.readthedocs.io/en/latest/syntax/optional.html#auto-generated-header-anchors

github_doc_root = 'https://github.com/openfisca/openfisca-doc/tree/master/'

# 'config-cache' supresses: Warning cannot cache unpickable configuration value: 'recommonmark_config' (because it contains a function, class, or module object)
suppress_warnings = ['image.nonlocal_uri','config.cache']

# Supresses warning "more than one target found for cross-reference" affecting:
#  - openfisca_core.periods.Instant
#  - openfisca_core.simulations.simulation_builder.SimulationBuilder -> TaxBenefitSystem
autodoc_default_options = {
    'ignore-module-all': True
}

napoleon_custom_sections = [('Returns', 'params_style')]


def missing_reference(app, env, node, contnode):
    if node['reftype'] == 'class' and node['reftarget'].startswith('nptyping'):
        return contnode


def setup(app):
    app.add_config_value('recommonmark_config', {
        'url_resolver': lambda url: url.replace('.md', '.html'),
        'enable_auto_toc_tree': False
        }, True)
    app.add_css_file('style.css')
    app.add_js_file('scripts.js')
    app.connect('missing-reference', missing_reference)
