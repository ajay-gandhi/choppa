
/**
 * Choppa class. Represents the chopper itself and its actions.
 */
function Choppa (land) {
  this.land = land;
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
  var hm = 7;
  var choppa_pos = this.choppa_el.position();
  var init_x = choppa_pos.left + 10;
  // Ignore if outside
  if (init_x + hm < 0 || init_x + hm > 400) return;

  var bomb = $('<div class="bomb"></div>');
  bomb.css({
    top: choppa_pos.top,
    left: init_x
  });
  this.choppa_el.parent().append(bomb);

  // Animate movement
  bomb.animate({
    top: '+=400',
    left: '+=' + hm
  }, {
    duration: 4000,
    specialEasing: {
      top: 'linear',
      left: 'bombLeft'
    },
    complete: function () {
      bomb.remove();
    }
  });

  // Compute which tower(s) gets hit
  var hits = compute_bomb_hit(init_x);
  var towers = this.land.towers;
  if (hits.length > 1) {
    var main_hit = towers[hits[0]] > towers[hits[1]] ? hits.shift() : hits.pop();
    var second_hit = hits.pop();
    if (towers[main_hit] - 2 < towers[second_hit]) {
      // Tower heights are close, hit both
      var second_power = 2 - towers[main_hit] + towers[second_hit];
      var main_power = 3 - second_power;
      this.land.hit(main_hit, main_power);
      this.land.hit(second_hit, second_power);

    // Too far, just hit main tower
    } else {
      this.land.hit(main_hit, 3);
    }

  } else {
    this.land.hit(hits[0], 3);
  }
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

  // Function for interactions
  var act = function () {
    if (!self.is_reloading) {
      self.drop();
      self.is_reloading = true;

      // Create timeout for reload
      self.timeoutId = window.setTimeout(function (me) {
        me.is_reloading = false;
      }, 2000, self);
    }
  };

  // Detect spacebar presses and clicks
  $('body').keyup(function (e) {
    if (e.keyCode == 32) {
      act();
    }
  });
  $(document).click(act);
}

/**
 * Create a new easing function for bombs
 */
$.extend(jQuery.easing, {
  bombLeft: function (x, t, b, c, d) {
    return Math.pow(x, 0.25);
  }
});

/**
 * Computes which tower(s) will be hit given an x position
 */
var compute_bomb_hit = function (xpos) {
  xpos += $('.bomb').width() * 2 / 3;
  var loc = xpos / $('.choppa-container').width() * 16;
  var idx = Math.floor(loc);

  var hits = [idx];
  // If in between, hits two
  if (idx * 25 + 5 > xpos) {
    hits.push(idx - 1);
  } else if ((idx + 1) * 25 - 5 < xpos) {
    hits.push(idx + 1);
  }
  return hits;
}








