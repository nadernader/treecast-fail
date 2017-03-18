
class Formatting {

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  truncate(text, limit=256) {
    if (text.length > limit) {
      return text.slice(0, limit-3) + '...'
    }
    return text
  }
}

export default new Formatting()
