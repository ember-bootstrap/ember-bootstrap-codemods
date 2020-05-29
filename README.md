# ember-bootstrap-codemods

![CI](https://github.com/kaliber5/ember-bootstrap-codemods/workflows/CI/badge.svg)

A collection of codemod's for ember-bootstrap-codemods.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-bootstrap-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.hbs

# or

yarn global add ember-bootstrap-codemods
ember-bootstrap-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.hbs
```

## Transforms

<!--TRANSFORMS_START-->
* [deprecated-attribute-arguments](transforms/deprecated-attribute-arguments/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
