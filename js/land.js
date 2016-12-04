
/**
 * Land class. Holds all the towers and their interactions
 */

// Gotta make this dynamic
var TOWERS = [0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7];

function Land () {
  this.towers = fy_shuffle(TOWERS).map(function (n) {
    return (new Array(n)).fill(true);
  });
}

/**
 * Renders the towers into the given parent element
 */
Land.prototype.render = function (parent) {
  this.game_el = $('<div class="choppa-container"></div>');

  // Create towers
  for (var i = 0; i < this.towers.length; i++) {
    this.game_el.append('<div class="col"></div>');

    for (var j = 0; j < this.towers[i].length; j++) {
      this.game_el.find('.col').last().append('<div class="block"></div>');
    }
  }

  parent.append(this.game_el);
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
