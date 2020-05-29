// https://astexplorer.net/#/gist/c10a1686d9bb15c5135fc243e8667e08/2897125cac87f759ace2248d481d9d45ebb6e047

const simpleDeprecations = {
  BsButton: ['title', 'disabled'],
  BsForm: ['novalidate'],
};

const formElementDeprecations = [
  'accept',
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'autosave',
  'cols',
  'controlSize:size',
  'disabled',
  'form',
  'inputmode',
  'max',
  'maxlength',
  'min',
  'minlength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'required',
  'readonly',
  'rows',
  'spellcheck',
  'step',
  'tabindex',
  'title',
  'wrap',
];

function isMatching(attribute, replacement) {
  if (!attribute.charAt(0) === '@') {
    return false;
  }

  attribute = attribute.substring(1);

  return replacement === attribute || replacement.split(':')[0] === attribute;
}

function mapAttributes(deprecatedArguments, b) {
  return (attrNode) => {
    let foundAttribute = deprecatedArguments.find((attr) => isMatching(attrNode.name, attr));

    if (foundAttribute) {
      let replacement = foundAttribute.split(':')[1] || foundAttribute;
      return b.attr(replacement, attrNode.value);
    }

    return attrNode;
  };
}

function isFormElement(node, elementStack) {
  if (node.type !== 'ElementNode') {
    return false;
  }

  let [yieldName, propery] = node.tag.split('.');

  if (propery !== 'element') {
    return false;
  }

  if (elementStack.length < 2) {
    return false;
  }

  const parentYield = elementStack
    .slice()
    .reverse()
    .find((attr) => attr.blockParams.includes(yieldName));

  if (!parentYield || parentYield.tag !== 'BsForm') {
    return false;
  }

  return true;
}

function visitor(env) {
  const b = env.syntax.builders;

  let elementStack = [];

  return {
    ElementNode: {
      enter(node) {
        elementStack.push(node);
        const deprecatedArguments = simpleDeprecations[node.tag];

        if (deprecatedArguments) {
          node.attributes = node.attributes.map(mapAttributes(deprecatedArguments, b));
          return;
        }

        if (isFormElement(node, elementStack)) {
          let yieldName = 'el';
          let control;
          let matchingAttributes = node.attributes.filter(({ name }) =>
            formElementDeprecations.some((deprAttr) => isMatching(name, deprAttr))
          );

          if (matchingAttributes.length === 0) {
            return;
          }

          if (node.selfClosing) {
            node.selfClosing = false;
            control = b.element(`${yieldName}.control`, {});
            control.selfClosing = true;
            node.children = [control];
          } else {
            if (node.blockParams.length > 0) {
              yieldName = node.blockParams[0];
            }

            control = node.children.find(
              (n) => n.type === 'ElementNode' && n.tag === `${yieldName}.control`
            );
          }

          if (!control) {
            return;
          }

          if (node.blockParams.length === 0) {
            node.blockParams = [yieldName];
          }

          node.attributes = node.attributes.filter((attr) => !matchingAttributes.includes(attr));

          let uniqueMatchingAttributes = matchingAttributes.filter(
            (attrNode) =>
              !control.attributes.some(
                (controlAttrNode) => attrNode.name.substring(1) === controlAttrNode.name
              )
          );

          control.attributes = control.attributes.concat(
            uniqueMatchingAttributes.map(mapAttributes(formElementDeprecations, b))
          );
        }
      },
      exit() {
        elementStack.pop();
      },
    },
  };
}

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, visitor);
};
