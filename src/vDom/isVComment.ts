import VNode from './VNode';

export default function isVComment(vNode: VNode): vNode is null | undefined {
  return vNode === null || vNode === undefined;
}
