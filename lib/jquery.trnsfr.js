// TRNSFR

;(function($) {
  function TRNSFR(elements, files, options) { this.options =  $.extend({}, TRNSFR.options, options || {}), this.total_size = 0, this.files = files
    // Some checks
    if (! $.isArray(this.files) || ! this.files.length)
      throw new TypeError("`files` must be present, an array, and populated")

    for (var i=0, len=this.files.length; i < len; i++)
      this.total_size += this.files[i]

    for (var i=0; len=elements.length; i < len; i++) {}
  }

  TRNSFR.prototype.addData = function addData(chunk) {}

  TRNSFR.options = {}

  // jQuery-ification
  $.fn.trnsfr = function(options) {
    if (this.length)
      return new TRNSFR(this, options) }
})(jQuery);
