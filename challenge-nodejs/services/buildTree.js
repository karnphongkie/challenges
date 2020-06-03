const addChild = (parentNode, childNode) => {
  parentNode.children.push(childNode);
};

const createNode = (nodeData) => {
  const node = {};

  node.id = nodeData.id;
  node.title = nodeData.title;
  node.level = nodeData.level;
  node.children = [];
  node.parent_id = nodeData.parent_id;

  node.addChild = addChild;

  return node;
};

module.exports = { createNode };
