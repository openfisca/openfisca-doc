# -*- coding: utf-8 -*-
#
# Configuration file for the Sphinx documentation builder.
#
# Full list of Sphinx options is available at http://www.sphinx-doc.org/en/master/config

from recommonmark.parser import CommonMarkParser
from recommonmark.transform import AutoStructify
import guzzle_sphinx_theme

# -- Project information -----------------------------------------------------

project = 'OpenFisca'
author = 'contact@openfisca.org'

# -- General configuration ---------------------------------------------------

extensions = [
    'guzzle_sphinx_theme',
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
    'sphinx_markdown_tables',
    'sphinxarg.ext',
]

intersphinx_mapping = {
    "numpy": ("https://numpy.org/doc/stable/", None),
    "python": ("https://docs.python.org/3/", None),
    }

source_parsers = {
    '.md': CommonMarkParser,
}

source_suffix = ['.rst', '.md']

master_doc = 'summary'


# -- Options for HTML output -------------------------------------------------


html_theme_path = guzzle_sphinx_theme.html_theme_path()
html_theme = 'guzzle_sphinx_theme'

html_theme_options = {
    "project_nav_name": "OpenFisca",
    "homepage": "index",  # Different than the master doc
}

html_static_path = ['static']
templates_path = ['_templates']
html_sidebars = {'**': ['sidebar.html']}

github_doc_root = 'https://github.com/openfisca/openfisca-doc/tree/master/'

suppress_warnings = ['image.nonlocal_uri']

def setup(app):
    app.add_config_value('recommonmark_config', {
        'url_resolver': lambda url: url.replace('.md', '.html'),
        'enable_auto_toc_tree': False
        }, True)
    app.add_transform(AutoStructify)  # Manage avanced Markdown files with AutoStructify
    app.add_stylesheet('style.css')
    app.add_javascript('scripts.js')
