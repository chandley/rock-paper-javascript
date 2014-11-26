function Player(name) {
  this.name = name;
}

Player.prototype.picks = function(pick) {
  this.pick = pick;
}


Player.prototype.random_pick = function (choose_from) {
  random_choice = choose_from[Math.floor(Math.random() * choose_from.length)];
  this.pick = random_choice 
};
