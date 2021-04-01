const dateFormatter = date => {
  const parsedDate = new Date(Date.parse(date))
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
  const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(parsedDate)
  return `${da}-${mo}-${ye}`
}

export default dateFormatter