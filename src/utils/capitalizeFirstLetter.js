const capitalizeFirstLetter = (string) => {
  let capitalizedString =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  const indexOfCharAfterDash = capitalizedString.indexOf('-') + 1
  if (indexOfCharAfterDash === 0) {
    return capitalizedString
  } else {
    capitalizedString =
      capitalizedString.slice(0, indexOfCharAfterDash) +
      capitalizedString.charAt(indexOfCharAfterDash).toUpperCase() +
      capitalizedString.slice(indexOfCharAfterDash + 1)
    return capitalizedString
  }
}

export default capitalizeFirstLetter
