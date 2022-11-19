
const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate', 'dazzle']
const date = new Date()

const getFont = () => {
  return fonts[7];
  const month =  date.getMonth()
  switch (month) {
    case 0:
      return fonts[7]
    case 1:
    case 2:
      return fonts[0]
    case 3:
    case 4:
      return fonts[1]
    case 5:
    case 6:
      return fonts[2]
    case 7:
    case 8:
      return fonts[3]
    case 9:
    case 10:
      return fonts[4]
    case 11:
    case 12:
      return fonts[5]
    default:
      return fonts[6]
  }
};

export { getFont }