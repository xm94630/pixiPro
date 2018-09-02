var Ost = function(src){
    this.soundCollection = src || {
        smallExplosion: "/client/audio/bangSmall.wav",
        medExplosion:   "/client/audio/bangMedium.wav",
        bigExplosion:   "/client/audio/bangLarge.wav",
        fireBullet:     "/client/audio/fire.wav",
        thrust:         "/client/audio/thrust.wav",
    };
    this.src = {};
};

/**
*    This method is to be used for traversal through source collection
*    @returns {object} A Howl instance from howler.js library
*/
Ost.prototype._setupSound = function(x){
    const config = {
        src: x,
        autoplay: false,
        loop: false,
        volume: 1,
    };
    return new Howl(config);
}

/**
*    This method initializes sound resources as howl objects
*    @returns {object} - a reference to the current Ost instance
*/
Ost.prototype.init = function(){
    const soundsArray = Object.keys(this.soundCollection);
    for (var x in soundsArray){
    	var current = soundsArray[x];
        var location = this.soundCollection[current];
        this.src[current] = this._setupSound(location);
    }
    return this;
};

/**
*    A getter method for sound collection attribute
*    @returns {Array}
*/
Ost.prototype.getSoundCollection = function(){
    return this.soundCollection;
}
