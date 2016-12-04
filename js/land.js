
/**
 * Land class. Holds all the towers and their interactions
 */

// Gotta make this dynamic
var TOWERS = [0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7];

function Land () {
  // this.towers = fy_shuffle(TOWERS);
  this.towers = TOWERS;
  this.game_el = false;
}

/**
 * Renders the towers into the given parent element
 */
Land.prototype.render = function (parent) {
  this.game_el = $('<div class="choppa-container"></div>');

  // Create towers
  for (var i = 0; i < this.towers.length; i++) {
    this.game_el.append('<div class="col"></div>');

    for (var j = 0; j < this.towers[i]; j++) {
      this.game_el.find('.col').last().append('<div class="block"></div>');
    }
  }

  parent.append(this.game_el);
  return this.game_el;
}

/**
 * Hits a tower with n power.
 */
Land.prototype.hit = function (tower_idx, power) {
  var self = this;
  this.towers[tower_idx] -= power;
  this.game_el.find('.col').eq(tower_idx).find('.block').each(function (i, e) {
    if (i < power) $(this).fadeOut();
  });
}

/**
 * Implementation of Fisher-Yates shuffle.
 */
var fy_shuffle = function (arr) {
  var j;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    arr[i] ^= arr[j];
    arr[j] ^= arr[i];
    arr[i] ^= arr[j];
  }
  return arr;
}
