console.log( 'ball' );
var Ball = ( function ( tag ) {

	var public = {};
	var private = {};

	var raduis = 10;
	var color = 'orange';
	var speed = 0.7;
	var direction = 'down';
	var turnX = 0;
	var turnY = -3;

	var x = screen.width / 2 - ( raduis / 2 );
	var y = 225;

	var colors = ['orange','#ff00a1','#213cd3','purple'];
	var color = colors[Math.floor( Math.random() * colors.length )];

	private.draw = function(){
		ctx.beginPath();
		ctx.arc( x, y, raduis,0,2*Math.PI );
		ctx.fillStyle = color;
		ctx.fill();
	};

	private.move = function(step, direction){
		if(direction === 'down'){
			y+= step;
		}else if(direction === 'up'){
			y-= step;
		}
		x+= turnX;
		private.draw();
	};

	private.isCollide = function( obj1 ) {
		return(
			obj1.getX() + obj1.getWidth() >= x && obj1.getX() <= x
			&&
			obj1.getY() + obj1.getHeight() >= y && obj1.getY() <= y
		);
	};

	private.turnOnCollide = function( obj1 ){
		var obj1Collide = obj1.getX() + obj1.getWidth();
		var obj2Collide= x + raduis;

		var answer = ( obj1.getWidth() / 2 ) - ( obj1Collide - obj2Collide );

		if( answer <= 20 && answer >= -20 ){
			return 0;
		}else{
			return answer;
		}
	};

	public.getX = function(){
		return x;
	};

	public.getY = function(){
		return y;
	};

	public.update = function(){
		private.move( speed, direction );

		if( y <= 0 ){
			direction = 'down';
		}

		if( y >= screen.height ){
			direction = 'up';
		}

		if( x <= 0 ){
			turnX+= 0.3;
		}

		if( x >= screen.width ){
			turnX-= 0.3;
		}

		for( var i in objects ){
			if( i === 'Paddle' || i.includes( 'Block' ) && objects[i] !== null ){
				if( private.isCollide(objects[i] )){
					var newDirection = ( direction === 'down' )? 'up':'down';
					direction = newDirection;

					var turnAmount = private.turnOnCollide( objects[i] );
					turnX = ( turnAmount / 100 ) * 1.1;
					turnY = ( turnY < 0 ) ? -0.5:0.5 ;

					if( i.includes( 'Block') ){
						objects[i].damageLife( 1 );
					}
				}
			}
		}
	};

	return public;
});