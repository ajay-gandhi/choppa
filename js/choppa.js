
/**
 * Choppa class. Represents the chopper itself and its actions.
 */
function Choppa () {
  this.choppa_el = false;
  this.is_reloading = false;
}

/** 
 * Begins flying the choppa (starts the game)
 */
Choppa.prototype.start = function () {
  if (!this.choppa_el)
    return console.error('Could not start: choppa not rendered.');

  this.animate_mvmt(true);
}

/**
 * Stops flying the choppa (pauses the game)
 */
Choppa.prototype.stop = function () {
  if (!this.choppa_el)
    return console.error('Could not start: choppa not rendered.');

  this.animate_mvmt(false);
}

/**
 * Controls movement of the choppa
 */
Choppa.prototype.animate_mvmt = function (should) {
  var self = this;

  if (should) {
    var duration = (400 - self.choppa_el.position().left) * 10;

    this.choppa_el.animate({
      left: '440px'
    }, {
      easing: 'linear',
      duration: duration,
      complete: function () {
        if (self.choppa_el.position().top < 300) {
          self.choppa_el.css({
            top: '+=15',
            left: '-100px'
          });
          self.animate_mvmt(true);
        }
      }
    });

  } else {
    this.choppa_el.stop();
  }
}

/**
 * Drops a bomb
 */
Choppa.prototype.drop = function () {
  var bomb = $('<div class="bomb"></div>');
}

/**
 * Renders the choppa in the given parent element
 */
Choppa.prototype.render = function (parent) {
  this.choppa_el = $('<div class="choppa"></div>');
  parent.append(this.choppa_el);
}

/**
 * Binds handlers for this choppa
 */
Choppa.prototype.bind = function () {
  if (!this.choppa_el)
    return console.error('Could not start: choppa not rendered.');

  var self = this;
  // Detect spacebar presses
  $('body').keyup(function (e) {
    if (e.keyCode == 32 && !is_reloading) {
      self.drop();
      self.is_reloading = true;

      // Create timeout for reload
      self.timeoutId = window.setTimeout(function (me) {
        me.is_reloading = false;
      }, 2000, self);
    }
  });
}