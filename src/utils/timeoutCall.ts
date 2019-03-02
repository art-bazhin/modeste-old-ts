export default function timeoutCall(func: Function, callback?: Function) {
  setTimeout(function() {
    func();
    if (callback) callback();
  });
}
