import VNode from './VNode';

export default function isVText(vNode: VNode): vNode is string | number {
  return typeof vNode === 'string' || typeof vNode === 'number';
}
