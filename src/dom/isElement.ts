export default function isElement(
  node: Node & { [key: string]: any }
): node is Element & { [key: string]: any } {
  return node.nodeType === Node.ELEMENT_NODE;
}
