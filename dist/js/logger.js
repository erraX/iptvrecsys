(function () { 
  var logger = function (level, object, viewType) { 
    this.level = level; 
    this.object = object; 
    this.viewType = viewType; 
  };
  logger.LEVEL_DEBUG = 0; 
  logger.LEVEL_INFO = 1; 
  logger.LEVEL_WARN = 2; 
  logger.LEVEL_ERROR = 3; 
  logger.LEVEL_FATAL = 4; 
  logger.VIEW_TYPE_ALERT = 0; 
  logger.VIEW_TYPE_APPEND = 1; 
  logger.VIEW_TYPE_CONSOLE = 2; 

  logger.prototype = { 
    setLevel: function (level) { 
      this.level = level; 
    }, 
    setObject: function (o) { 
      if (typeof o === 'string') { 
        this.object = document.getElementById(o); 
      } else { 
        this.object = o; 
      } 
    },
    setViewType: function (type) { 
      this.viewType = type; 
    }, 
    log: function (s) { 
      this.message(100, s); 
    }, 
    debug: function (s) { 
      this.message(logger.LEVEL_DEBUG, s); 
    }, 
    info: function (s) { 
      this.message(logger.LEVEL_INFO, s); 
    }, 
    warn: function (s) { 
      this.message(logger.LEVEL_WARN, s); 
    }, 
    error: function (s) { 
      this.message(logger.LEVEL_ERROR, s); 
    }, 
    fatal: function (s) { 
      this.message(logger.LEVEL_FATAL, s); 
    }, 
    message: function (level, s) { 
      if (level >= this.level) { 
        if (this.object !== null) { 
          this.object.innerHTML = s; 
        } else if (this.viewType === logger.VIEW_TYPE_ALERT) { 
          alert(s); 
        } else if (this.viewType === logger.VIEW_TYPE_APPEND) { 
          document.body.appendChild(document.createTextNode(s)); 
          document.body.appendChild(document.createElement("br")); 
        } else {
          console.log(s);
        }
      } 
    } 
  }; 
  if (typeof window.Logger == 'undefined' || window.Logger == null) 
    window.Logger = new logger(logger.LEVEL_DEBUG, null, logger.VIEW_TYPE_CONSOLE); 
})(); 
