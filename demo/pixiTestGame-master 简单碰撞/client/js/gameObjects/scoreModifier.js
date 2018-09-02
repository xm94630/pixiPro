var ScoreModifyer = function(){
    this.mod = 0;
    this.multiplyer = 1;
    this.bonus = 0;
};

ScoreModifyer.prototype.setBonus = function(){
    this.bonus = this.mod * this.multiplyer;
};


/**
*    @returns {number} - total value to add to score
*/
ScoreModifyer.prototype.getBonus = function(){
    return this.bonus;
}

/**
*   This function adds to score bonus based travel distance of bullet
*/
ScoreModifyer.prototype.setModifier = function(mod, mult){
    this.mod = mod;
    this.multiplyer = mult;
}

/**
*    This method increases multiplyer field based on combo counter
    TODO: add a combo counter system
*/
ScoreModifyer.prototype.setMultiplyer = function(){}
