# About this documentation

This documentation is built with the excellent [GitBook](https://github.com/GitbookIO/gitbook) tool
(see [GitBook documentation](https://help.gitbook.com/)).

It is written in [Markdown](https://help.gitbook.com/format/markdown.html)
and the source is hosted on this GitHub repository:
[openfisca/openfisca-doc](https://github.com/openfisca/openfisca-doc).

## Collaborative editing

Everybody can participate to the redaction of the documentation.

On each page there is a link named "Edit this page".
Just click on it and you'll jump on GitHub on the Markdown source file of the page.
Then edit the file as explained on this GitHub documentation page:
[editing-files-in-another-user-s-repository](https://help.github.com/articles/editing-files-in-another-user-s-repository/).

Then save the file and create a [pull request](https://help.github.com/articles/creating-a-pull-request/) which will be
accepted if relevant.

## Build it yourself

If you'd like to build it by yourself to work locally, here are the steps.

```
git clone git@github.com:openfisca/openfisca-doc
npm install
```

Then you can either build the documentation or launch a local HTTP server with watch mode:

```
npm run build
or
npm run watch
```

> With watch mode, open http://localhost:2050/ in your browser once the first build is done.

## Deploy (for maintainers)

To deploy the documentation just push on the `master` branch.
