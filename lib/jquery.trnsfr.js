// TRNSFR

;(function(window, document, $, undefined) {
  var FT_ELEMENT_DATASET = (function() { var str, e = document.createElement('div')
    if (typeof e.dataset === 'undefined')
      return false
    e.dataset.ft = str = 'dataset'
    return e.getAttribute('data-ft') == str && e.dataset.ft == str
  })()

  function TRNSFR(elements, files, options) { var i, o, len, element, ranges, progress = {}, cache = { file: [], total: [], width: [] }
    o = this.options =  $.extend({}, TRNSFR.options, options || {}), this.total_size = 0, this.done_size = 0, this.files = files, this.complete = false

    // Some checks
    if (! $.isArray(this.files) || ! this.files.length)
      throw new TypeError("`files` must be present, an array, and populated")

    ranges = [0]
    for (i=0, len=this.files.length; i < len; i++)
      this.total_size += this.files[i], ranges.push(this.total_size)

    ;(progress.file  = document.createElement('div')).className = o.progress_class + ' ' + o.file_class
    ;(progress.total = progress.file.cloneNode(false)).className = o.progress_class + ' ' + o.total_class
    i = -1
    while (element = elements[++i])
      element
        .insertBefore(cache.total[cache.total.push(progress.total.cloneNode(false)) - 1], null)
      .parentNode
        .insertBefore(cache.file[cache.file.push(progress.file.cloneNode(false)) - 1], null)
      .parentNode
        .className += " " + o.container_class

    // Instance methods
    this.addData = function addData(chunk) {
      this.done_size += parseInt(chunk, 10)
      checkComplete.call(this)
      animate.call(this) }

    this.setData = function setData(chunk) {
      this.done_size = parseInt(chunk, 10)
      checkComplete.call(this)
      animate.call(this) }

    // Privatez
    function checkComplete() {
      if (this.done_size >= this.total_size)
        this.complete = true
      return this.complete }

    function animate() { var current, i, len, width, value, max
      for (current=0, len = ranges.length; current < len; current++)
        if (this.done_size <= ranges[current])
          break

      for (i=0, len = elements.length; i < len; i++) {
        cache.width[i] = cache.width[i] || $(elements[i]).width()

        setElementWidth(cache.total[i], (width = (this.done_size / this.total_size) * cache.width[i]) )
        setElementWidth(cache.file[i], ((value = (this.done_size - ranges[current - 1])) / (max = files[current - 1])) * width )

        setElementData(cache.total[i], this.done_size, this.total_size)
        setElementData(cache.file[i],  value,          max) } }

    function setElementData(element, value, max) {
      if (FT_ELEMENT_DATASET) {
        element.dataset['value'] = value
        element.dataset['max'] = max }
      else {
        element.setAttribute('data-value', value)
        element.setAttribute('data-max', max) } }

    function setElementWidth(element, width) {
      element.style.width = width + 'px' }
  }

  TRNSFR.options =
    { container_class:  'multi_progress'
    , progress_class:   'progress'
    , file_class:       'file_progress'
    , total_class:      'total_progress'
    }

  // jQuery-ification
  $.fn.trnsfr = function(options) {
    if (this.length)
      return new TRNSFR(this, options) }

  // Expose class
  if (window.TRNSFR === 'undefined')
    window.TRNSFR = TRNSFR

})(this, this.document, jQuery);

