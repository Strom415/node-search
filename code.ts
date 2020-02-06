const { currentPage, root, showUI, ui } = figma;
let layers = 0;

const visitAllNodes = (node, depth = 0) => {
  if (layers % 1000 === 0) {
    console.log('layers:', layers);
  }

  // if (layers % 100 === 0 && layers > 50000) {
  //   console.log('layers:', layers);
  // }

  // Check for base component

  layers++;

  if (hasChildren(node)) {
    node.children.forEach(childNode => visitAllNodes(childNode, depth + 1));
  }
}

const hasChildren = node => (
  'children' in node &&
  node.visible !== false
);

const sendData = (action, data) => 
  ui.postMessage({ action, data });

showUI(__html__);
visitAllNodes(root);
sendData('layers', layers);
