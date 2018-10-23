export const logger = (text, type) => {
  if (type === 'start') {
    console.time(text);
  } else if (type === 'end') {
    console.timeEnd(text);
  } else {
    console.log(text);
  }
}