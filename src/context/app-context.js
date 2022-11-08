
const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate', 'dazzle']
let date = new Date()
function getFont() {
  let month =  date.getMonth()

  // if (month == 1 || month == 2) return fonts[0]
  // if (month == 3 || month == 4) return fonts[1]
  // if (month == 5 || month == 6) return fonts[2]
  // if (month == 7 || month == 8) return fonts[3]
  // if (month == 9 || month == 10) return fonts[4]
  // return month == 11 || month == 12 ? fonts[5] : fonts[6];

  return fonts[7]
}

export { getFont }