/*
	Defines Fish Entities and AI and their AI.

*/

sakana = {};

//Creates x feesh
sakana.spawn = function(x,self){
	for (var i = 0; i < x; i++) {
		sakana.fish(self);
	};
}




//Defines a fish entity and places it in the fishes sprite group.
sakana.fish = function(self){
	//var fish = fishes.create(game.world.width*Math.random(),game.height*0.40+(Math.random()*(game.height-game.height*0.40))-64,'sammin');
	var fish = fishes.create(RNG(200,self.groundLayer.width-64),RNG(self.fisher.y+150,2000),'sammin');
	game.physics.enable(fish,Phaser.Physics.ARCADE)
	fish.body.allowGravity = false;
	fish.body.collideWorldBounds = true;
	fish.body.bounce.set(1)
	fish.anchor.set(0.5)
	fish.swimTimer = game.time.now;
	fish.swimInterval = RNG(1000,3000,true);
	fish.hooked = false;
	//fish.body.velocity.x = RNG(-100,10);

	fish.randSwim = function(){
		if (this.hooked){return};
		if (game.time.now>this.swimTimer){
			this.swimTimer= game.time.now+this.swimInterval
			this.body.velocity.x =RNG(-100,100)
			if(this.body.velocity.x<0){
				this.scale.x = -1;
			}else{
				this.scale.x = 1;
			}
		}
	}

	fish.nibble = function(){
		var dist = game.physics.arcade.distanceBetween(this,self.lure);
		if(dist<20){
			this.position = self.lure.position
			this.hooked = true;
			fish.scale.x = -1;
			this.body.velocity = new Phaser.Point(0,0);
		}
	}

	fish.update = function(){
		game.physics.arcade.collide(fish,fishing.groundLayer)
		this.randSwim();
		this.nibble();
	}

}












