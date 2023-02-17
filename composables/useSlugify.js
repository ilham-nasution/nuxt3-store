export default function (str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "-");
}
