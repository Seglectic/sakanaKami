/*
		Actual fishing gameplay. Woop
*/

//Random range from min-max, bool int if rounding
RNG = function(min,max,int){
	var RNG = (Math.random()*(max-min))+min;
	if (int){RNG = Math.floor(RNG);}
	return RNG;
};

var fishing = function(){
	var self = this;

	this.preload = function(){
		
		game.load.tilemap("fishingMap","src/gfx/fishingMap.json",null,Phaser.Tilemap.TILED_JSON);
		game.load.image("sakanaTiles",'src/gfx/sakanaTiles.png');
		

		game.load.image('fisher','src/gfx/fisher.png');
		game.load.image('sammin','src/gfx/sakana.png');
		game.load.image('lure','src/gfx/lure.png')


	};


	this.create = function(){

		//Load up tilemap
		this.fishingMap = game.add.tilemap("fishingMap"); //Create a map object
		this.fishingMap.addTilesetImage("sakanaTiles","sakanaTiles"); //apply "stars" tiles image to map's tile layer
		this.skyLayer = this.fishingMap.createLayer("Sky");
		this.waterLayer = this.fishingMap.createLayer("Water");
		this.groundLayer = this.fishingMap.createLayer("Ground"); //Create a bg layer from "ground" in the json and displays it
		this.groundLayer.resizeWorld(); //Resize world to fit map

		this.fishingMap.setCollision([0,1,3,4,5,6,7,8],true,"Ground") //Enable collisions for these tilesprite IDs
		this.fishingMap.setCollision([10,11],true,"Sky") //Enable collisions on sky tiles

		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Setup fisherman ent
		this.fisher = game.add.sprite(250,815,'fisher')
		game.physics.enable(this.fisher,Phaser.Physics.ARCADE);
		this.fisher.body.collideWorldBounds = true;
		this.fisher.anchor.set(1,0);

		//Setup Lure
		this.lure = lure.lure(self);

		//Main group for fishes in world
		fishes = game.add.group();

		sakana.spawn(RNG(4,15,true),self);

		//Single fish for debugging purposes
		// debugFish = sakana.fish(self);

		game.physics.arcade.gravity.y = 100;


		game.add.group();
	};



	this.update = function(){
		game.physics.arcade.collide(this.fisher,this.groundLayer)
		game.camera.follow(this.lure,Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

	};


	this.render = function(){


	};
}


var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-18, Phaser.AUTO, 'game');
game.state.add("fishing",fishing);
game.state.start("fishing");