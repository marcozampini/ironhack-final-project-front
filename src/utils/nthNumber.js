const nthNumber = (number) => {
  const ones = number % 10
  const tens = number % 100

  if (tens < 11 || tens > 13) {
    switch (ones) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
      default:
        return number + 'th'
    }
  }
}

export default nthNumber
