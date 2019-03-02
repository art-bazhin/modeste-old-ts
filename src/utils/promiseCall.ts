const w: any = window;
const resolvedPromise = w.Promise.resolve();

export default function promiseCall(func: Function, callback?: Function) {
  return resolvedPromise.then(function() {
    func();
    if (callback) callback();
  });
}
