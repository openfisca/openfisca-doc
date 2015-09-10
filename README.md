![OpenFisca logo](http://www.openfisca.fr/hotlinks/logo-openfisca.svg)

> Note: this documentation is being written.

OpenFisca is a versatile microsimulation free software.

It is published under the [GNU Affero General Public License version 3.0](http://www.gnu.org/licenses/agpl-3.0.html).

## About this documentation

This documentation is built with the excellent [GitBook](https://github.com/GitbookIO/gitbook) tool
(see [GitBook documentation](http://help.gitbook.com/)).

It is written in [Markdown](http://help.gitbook.com/format/markdown.html)
and the source is hosted on this GitHub repository:
[openfisca/openfisca-gitbook](https://github.com/openfisca/openfisca-gitbook).

If you'd like to build it by yourself, here are the steps.

```
git clone
npm install
```

Then you can either build the documentation or launch a local HTTP server with watch mode:

```
npm run build
or
npm run watch
```

> With watch mode, open http://localhost:4000/ in your browser once the first build is done.

To deploy the built documentation
(you must be authorized to push to [openfisca/openfisca-gitbook](https://github.com/openfisca/openfisca-gitbook)):

```
npm run publish
```

On the server of your choice:

```
git clone https://github.com/openfisca/openfisca-gitbook --branch static

or, the next time:
cd openfisca-gitbook
git fetch
git reset --hard origin/static
```
