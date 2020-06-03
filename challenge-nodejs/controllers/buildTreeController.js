const { createNode } = require('../services/buildTree');

const buildTree = (treeData) => {
  const rootNode = [];
  const nodeMap = {};
  try {
    Object.values(treeData).forEach((nodeLevel) => {
      nodeLevel.forEach((nodeData) => {
        if (!('parent_id' in nodeData)) {
          throw Error(
            'nodeData is require parent id expected value is number of null'
          );
        }

        const node = createNode(nodeData);
        nodeMap[node.id] = node;
        // Parent node
        if (nodeData.parent_id === null) {
          rootNode.push(node);
        } else {
          const parentNode = nodeMap[node.parent_id];
          if (!parentNode) {
            throw Error('Cannot find expected parent node');
          }
          parentNode.children.push(node);
        }
      });
    });
    return rootNode;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { buildTree };
