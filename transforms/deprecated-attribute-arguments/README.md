# deprecated-attribute-arguments


## Usage

```
npx ember-bootstrap-codemods deprecated-attribute-arguments path/of/files/ or/some**/*glob.hbs

# or

yarn global add ember-bootstrap-codemods
ember-bootstrap-codemods deprecated-attribute-arguments path/of/files/ or/some**/*glob.hbs
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [button](#button)
* [form](#form)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="button">**button**</a>

**Input** (<small>[button.input.hbs](transforms/deprecated-attribute-arguments/__testfixtures__/button.input.hbs)</small>):
```hbs
<BsButton @type="primary" @title="foo" @disabled={{true}}>Submit</BsButton>

<SomeButton @type="primary" @title="foo" @disabled={{true}}>Submit</SomeButton>

```

**Output** (<small>[button.output.hbs](transforms/deprecated-attribute-arguments/__testfixtures__/button.output.hbs)</small>):
```hbs
<BsButton @type="primary" title="foo" disabled={{true}}>Submit</BsButton>

<SomeButton @type="primary" @title="foo" @disabled={{true}}>Submit</SomeButton>

```
---
<a id="form">**form**</a>

**Input** (<small>[form.input.hbs](transforms/deprecated-attribute-arguments/__testfixtures__/form.input.hbs)</small>):
```hbs
<BsForm @novalidate={{true}} @model={{this}} as |f|>
  <f.element @property="foo" @label="foo" @accept="image/png" @autocapitalize="words" @autocomplete="on" @autocorrect="off" @autofocus={{true}} @autosave="someuniquevalue" @cols="10" @controlSize="10" @disabled={{true}} @form="myform" @inputmode="tel" @max="5" @maxlength="5" @min="5" @minlength="5" @multiple={{true}} @name="foo" @pattern="^[0-9]{5}$" @placeholder="foo" @required={{true}} @readonly={{true}} @rows="10" @spellcheck={{true}} @step="2" @tabindex="-1" @title="foo" @wrap="hard"/>
  <f.element @property="bar" @label="bar" @accept="image/png" @autocapitalize="words" @autocomplete="on" @autocorrect="off" @autofocus={{true}} @autosave="someuniquevalue" @cols="10" @controlSize="10" @disabled={{true}} @form="myform" @inputmode="tel" @max="5" @maxlength="5" @min="5" @minlength="5" @multiple={{true}} @name="foo" @pattern="^[0-9]{5}$" @placeholder="foo" @required={{true}} @readonly={{true}} @rows="10" @spellcheck={{true}} @step="2" @tabindex="-1" @title="foo" @wrap="hard" as |element|>
    <element.control @some="other" placeholder="bar"/>
  </f.element>
  <f.element @property="baz" @label="baz" />

  <SomeOther as |f|>
    <f.element @foo="bar" @disabled={{true}} />
  </SomeOther>
</BsForm>

```

**Output** (<small>[form.output.hbs](transforms/deprecated-attribute-arguments/__testfixtures__/form.output.hbs)</small>):
```hbs
<BsForm @model={{this}} novalidate={{true}} as |f|>
  <f.element @property="foo" @label="foo" as |el|><el.control accept="image/png" autocapitalize="words" autocomplete="on" autocorrect="off" autofocus={{true}} autosave="someuniquevalue" cols="10" size="10" disabled={{true}} form="myform" inputmode="tel" max="5" maxlength="5" min="5" minlength="5" multiple={{true}} name="foo" pattern="^[0-9]{5}$" placeholder="foo" required={{true}} readonly={{true}} rows="10" spellcheck={{true}} step="2" tabindex="-1" title="foo" wrap="hard" /></f.element>
  <f.element @property="bar" @label="bar" as |element|>
    <element.control @some="other" placeholder="bar" accept="image/png" autocapitalize="words" autocomplete="on" autocorrect="off" autofocus={{true}} autosave="someuniquevalue" cols="10" size="10" disabled={{true}} form="myform" inputmode="tel" max="5" maxlength="5" min="5" minlength="5" multiple={{true}} name="foo" pattern="^[0-9]{5}$" required={{true}} readonly={{true}} rows="10" spellcheck={{true}} step="2" tabindex="-1" title="foo" wrap="hard" />
  </f.element>
  <f.element @property="baz" @label="baz" />

  <SomeOther as |f|>
    <f.element @foo="bar" @disabled={{true}} />
  </SomeOther>
</BsForm>

```
<!--FIXTURES_CONTENT_END-->
