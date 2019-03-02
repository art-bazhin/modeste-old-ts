import immediateCall from './immediateCall';
import promiseCall from './promiseCall';
import timeoutCall from './timeoutCall';

const w: any = window;

export function chooseAsyncFunc(): Function {
  if (w.setImmediate) return immediateCall;
  else if (w.Promise) return promiseCall;
  else return timeoutCall;
}

export default chooseAsyncFunc();
