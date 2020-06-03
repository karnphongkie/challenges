const createNode = (nodeData) => {
  const node = {};

  node.id = nodeData.id;
  node.title = nodeData.title;
  node.level = nodeData.level;
  node.children = [];
  node.parent_id = nodeData.parent_id;

  return node;
};

module.exports = { createNode };
