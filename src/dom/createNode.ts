import VNode from '../vDom/VNode';
import VElement from '../vDom/VElement';
import { INTERNAL_VAR_NAME } from '../constants';
import isVText from '../vDom/isVText';
import isVComment from '../vDom/isVComment';
import setProp from './setProp';

function createElement(vElement: VElement): Element {
  let element: Element & { [key: string]: any };

  element = document.createElement(vElement.tagName);
  element[INTERNAL_VAR_NAME] = {
    props: vElement.props
  };

  for (let prop in vElement.props) {
    setProp(element, prop, vElement.props[prop], true);
  }

  vElement.children.forEach(child => element.appendChild(createNode(child)));

  return element;
}

export default function createNode(vNode: VNode): Element | Text | Comment {
  if (isVComment(vNode)) return document.createComment('');
  if (isVText(vNode)) return document.createTextNode('' + vNode);

  return createElement(vNode);
}
