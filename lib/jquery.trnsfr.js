// TRNSFR

;(function(window, document, $, undefined) {
  function TRNSFR(elements, files, options) { var i, len, element, ranges = [], progress = {}, cache = { file: [], total: [], width: [] }
    this.options =  $.extend({}, TRNSFR.options, options || {}), this.total_size = 0, this.done_size = 0, this.files = files, this.complete = false

    // Some checks
    if (! $.isArray(this.files) || ! this.files.length)
      throw new TypeError("`files` must be present, an array, and populated")

    for (i=0, len=this.files.length; i < len; i++)
      this.total_size += this.files[i], ranges.push(this.total_size)

    ;(progress.file  = document.createElement('div')).className = "progress file_progress"
    ;(progress.total = progress.file.cloneNode(false)).className = "progress total_progress"
    i = -1
    while (element = elements[++i])
      element
        .insertBefore(cache.total[cache.total.push(progress.total.cloneNode(false)) - 1], null)
      .parentNode
        .insertBefore(cache.file[cache.file.push(progress.file.cloneNode(false)) - 1], null)

    // Instance methods
    this.addData = function addData(chunk) { var current, i, len, width
      this.done_size += parseInt(chunk, 10)
      if (this.done_size >= this.total_size)
        this.complete = true

      for (current=0, len = ranges.length; current < len; current++)
        if (this.done_size <= ranges[current])
          break

      for (i=0, len = elements.length; i < len; i++) {
        cache.width[i] = cache.width[i] || $(elements[i]).width()
        cache.total[i].style.width = ( width = (this.done_size / this.total_size)) * cache.width[i] + 'px'
        cache.file[i].style.width = (this.done_size / files[current]) * width + 'px' } // NEEDS FIXING
    }
  }

  TRNSFR.options = {}

  // jQuery-ification
  $.fn.trnsfr = function(options) {
    if (this.length)
      return new TRNSFR(this, options) }
})(window, document, jQuery, undefined);
