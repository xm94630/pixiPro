var Score =  function(name) {
    this.name = name || "score";
    this.score = 0;
    this.mod = new ScoreModifyer();
};

Score.prototype.init = function(font){
    this.format = this.name + ": " + this.score;
    var fontVal = font || {font: "32px sans-serif", fill: "black"};
    this.instance = new PIXI.Text(this.format, fontVal);
    this.instance.position.set(10,10);
    // this.instance.x = 50;
    // this.instance.y = 50;
}

Score.prototype.updateScore = function(value){
    this.score += value || 0;
    //this.instance.setText(this.format + this.score);
    return this.score;
}

// Score.prototype.update = function(){
//     this.format = this.name + ": " + this.score;
//     this.Text = this.format;
// }
