import VElement from './VElement';
import VNode from './VNode';

export default function isVElement(vNode: VNode): vNode is VElement {
  return typeof vNode === 'object';
}
