import VNode from '../vDom/VNode';
import isVComment from '../vDom/isVComment';
import isVText from '../vDom/isVText';
import isVElement from '../vDom/isVElement';
import isComment from './isComment';
import isText from './isText';
import isElement from './isElement';
import { INTERNAL_VAR_NAME } from '../constants';
import setProp from './setProp';
import createNode from './createNode';

export default function updateNode(node: Node, vNode: VNode): void {
  if (isText(node) && isVText(vNode)) {
    let text = vNode + '';
    if (node.textContent === text) return;
    node.textContent = text;
  } else if (isElement(node) && isVElement(vNode)) {
    let props = node[INTERNAL_VAR_NAME].props;
    let vProps = vNode.props;
    let propList = Object.keys(props).concat(Object.keys(vProps));
    let processed: { [key: string]: any } = {};

    propList.forEach(prop => {
      if (processed[prop]) return;
      if (vProps[prop] !== props[prop]) setProp(node, prop, vProps[prop]);
      processed[prop] = true;
    });

    let length = Math.min(node.childNodes.length, vNode.children.length);

    for (let i = 0; i < length; i++) {
      updateNode(node.childNodes[i], vNode.children[i]);
    }

    while (node.childNodes.length > vNode.children.length) {
      if (node.lastChild) node.removeChild(node.lastChild);
    }

    for (let i = length; i < vNode.children.length; i++) {
      node.appendChild(createNode(vNode.children[i]));
    }
  } else if (!(isComment(node) && isVComment(vNode))) {
    if (!node.parentNode) return;
    node.parentNode.replaceChild(createNode(vNode), node);
  }
}
