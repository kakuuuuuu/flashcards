export function Shuffle (array) {
  return array.sort(function() { return 0.5 - Math.random() });
}
