import toKebabCase from '../utils/toKebabCase';
import { INTERNAL_VAR_NAME } from '../constants';

export default function setProp(
  element: Element & { [key: string]: any },
  prop: string,
  value: any,
  firstRender?: boolean
): void {
  let remove = value === undefined;

  if (!firstRender) {
    if (remove) delete element[INTERNAL_VAR_NAME].props[prop];
    else element[INTERNAL_VAR_NAME].props[prop] = value;
  }

  switch (prop[0]) {
    case '_':
      let attr = toKebabCase(prop.substr(1));

      if (value === false || remove) {
        element.removeAttribute(attr);
        break;
      }

      element.setAttribute(attr, value === true ? '' : value);
      break;

    default:
      if (remove) delete element[prop];
      else element[prop] = value;
  }
}
