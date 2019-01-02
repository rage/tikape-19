export function nthIndex(str, pat, n){
  var L= str.length, i= -1;
  while(n-- && i++<L){
      i= str.indexOf(pat, i);
      if (i < 0) break;
  }
  return i;
}


export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringToBoolean(string) {
  if (string === "f") {
    return false
  }
  if (string === undefined || string === null || string === false) {
    return false
  }
  return true;
}
