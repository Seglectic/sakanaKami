




lure = {};


//Creates a new lure object that can be controlled by the player to some extent.
lure.lure = function(self){
	var lure = game.add.sprite(self.fisher.x,self.fisher.y,'lure');
	game.physics.enable(lure,Phaser.Physics.ARCADE);
	lure.body.collideWorldBounds = true;
	lure.body.bounce.set(0.3);
	lure.body.maxVelocity.set(200,80);
	lure.anchor.set(0.5)
	lure.body.drag.set(50,30);

	lure.cursors = game.input.keyboard.createCursorKeys();
	lure.reelButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
	lure.castButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);

	lure.cast = false; //Is line currently cast?
	lure.reeling = false; //Pulling the line in?
	lure.body.allowGravity = false;

	lure.pathTimer = game.time.now; //Keeps track of when to draw points
	lure.pathInterval = 200; //How often to draw line points
	lure.linePath = [];

	//Draw fishing line
	var fishingLine = game.add.graphics()
	lure.drawLine = function(){
		fishingLine.clear();
		
		fishingLine.lineStyle(1, 0xFFFFFF, 1);
		fishingLine.moveTo(self.fisher.x,self.fisher.y);
		fishingLine.beginFill(0xFFFFFF);
		fishingLine.lineTo(this.x,this.y);
		fishingLine.endFill();
		
		
		/*for (var i = 0; i < this.linePath.length; i++) { 
			fishingLine.lineStyle(1, 0xFFFFFF, 1);
			var l = this.linePath[i];
			fishingLine.lineTo(l[0],l[1])
			fishingLine.endFill();
			l[1]+=0.02
		};

		//Add points to linePath
		/*
		Todo: Try checking if the distance from the last point was > 10 or something then adding a new one instead
		Of waiting a certain amount of time.
		Give each point a draw and dest pos, make sure that each point stays 10units apart somehow
		interp to points or whatev

		if (this.cast && game.time.now>this.pathTimer && !this.reeling){
			lure.linePath.push([this.x,this.y]);
			this.pathTimer=game.time.now+this.pathInterval;
		}
		*/
	}

	lure.reel = function(){
		game.physics.arcade.moveToObject(this, self.fisher, 80);
		this.reeling = true;

		if(game.physics.arcade.distanceToXY(this,self.fisher.x,self.fisher.y)<5){
			this.reeling=false;
			this.cast = false;
		}
	}

	lure.controls = function(){
		if (this.cursors.left.isDown){
			if (this.body.x>self.fisher.body.x+self.fisher.width*2)
			this.body.velocity.x=-40;
		}
		if (this.cursors.right.isDown){
			// this.body.velocity.x=40;
		}
		if (this.reelButton.isDown){
			//this.body.velocity.y=-120;
			this.reel();
		}

		if (this.castButton.isDown && !lure.cast) {
			this.cast = true;
			this.body.allowGravity = true;
			this.body.velocity.set(200,-80);
		}else{
			this.reeling= false;
		}



	}

	lure.update = function(){
		// console.log('LURE VELOCITY: ',this.body.velocity)
		this.drawLine();

		this.rotation = game.physics.arcade.angleBetween(this,self.fisher)+(Math.PI/2)

		game.physics.arcade.collide(this,self.groundLayer)
		if (!this.cast){
			// self.fisher.body.position = this.body.position
			game.physics.arcade.moveToObject(this, self.fisher, 80);
		}

		this.controls();

	};

	return lure;
}