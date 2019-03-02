import appList from './appList';
import VNodeFunc from '../vDom/VNodeFunc';

export default function app(
  vNodeFunc: VNodeFunc,
  selector: string | Element
): void {
  let wrap =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!wrap) return;

  appList.push({ vNodeFunc, wrap });
}
