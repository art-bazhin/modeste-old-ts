export default function toKebabCase(str: string): string {
  let kebab = str.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebab[0] === '-' ? kebab.substr(1) : kebab;
}
