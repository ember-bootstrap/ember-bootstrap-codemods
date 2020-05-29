const deprecations = {
  BsButton: ['title', 'disabled'],
};

function visitor(env) {
  const b = env.syntax.builders;

  return {
    ElementNode(node) {
      const deprecatedArguments = deprecations[node.tag];

      if (deprecatedArguments) {
        node.attributes = node.attributes.map((attrNode) => {
          if (attrNode.name.charAt(0) !== '@') {
            return attrNode;
          }

          let attribute = attrNode.name.substring(1);

          if (!deprecatedArguments.includes(attribute)) {
            return attrNode;
          }

          return b.attr(attribute, attrNode.value);
        });
      }
    },
  };
}

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, visitor);
};
