import AppRecord from './AppRecord';
import updateNode from '../dom/updateNode';
import createNode from '../dom/createNode';
import appList from './appList';
import asyncCall from '../utils/asyncCall';

let shouldRender = false;

function renderApp(app: AppRecord): void {
  if (app.wrap.childNodes.length) {
    updateNode(app.wrap.childNodes[0], app.vNodeFunc());
  } else {
    app.wrap.appendChild(createNode(app.vNodeFunc()));
  }
}

function renderSync(): void {
  if (!shouldRender) return;
  appList.forEach(app => renderApp(app));
  shouldRender = false;
}

export default function render(): void {
  shouldRender = true;
  asyncCall(renderSync);
}
