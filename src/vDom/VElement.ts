import VNode from './VNode';

export default interface VElement {
  tagName: string;
  props: { [key: string]: any };
  children: Array<VNode>;
}
