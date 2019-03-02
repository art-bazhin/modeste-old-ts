import VNode from './VNode';
import VElement from './VElement';

export default function createVElement(
  tagName: string,
  props: { [key: string]: any } = {},
  children: Array<VNode> = []
): VElement {
  return {
    tagName,
    props,
    children
  };
}
