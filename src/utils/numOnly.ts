export function numOnly(e:any) {
  const code = e.keyCode;
  const ins = e.key;
  let state = false;
  const numray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', ''];
  for (var i = 0; i < numray.length; i++) {
    if (ins === String(numray[i])) {
      state = true;
      break;
    } else if (code === 32) {
      state = false;
      e.preventDefault();
      break;
    }
  }
  if (state === false) {
    e.preventDefault();
  }
}
