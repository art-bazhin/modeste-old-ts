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
      setProp(node, prop, vProps[prop]);
      processed[prop] = true;
    });

    let length = Math.max(node.childNodes.length, vNode.children.length);

    for (let i = 0; i < length; i++) {
      let child = node.childNodes[i];
      let vChild = vNode.children[i];

      if (child && vChild) updateNode(child, vChild);
      else if (!vChild) node.removeChild(child);
      else if (!child) node.appendChild(createNode(vChild));
    }
  } else if (!(isComment(node) && isVComment(vNode))) {
    if (!node.parentNode) return;
    node.parentNode.replaceChild(createNode(vNode), node);
  }
}
