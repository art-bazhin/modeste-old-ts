export default function immediateCall(
  func: Function,
  callback?: Function
): void {
  setImmediate(function() {
    func();
    if (callback) callback();
  });
}
