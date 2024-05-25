export function fixedNum(n:number, place:number) {
    var num = n;
    // var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    var with2Decimals = num.toFixed(place);
    return with2Decimals || 0;
  }
  