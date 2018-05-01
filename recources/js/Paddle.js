console.log( 'paddle' );
var Paddle = (function ( tag ) {
	var public = {};
	var private = {};

	var width = 150;
	var height = 25;
	var color = 'red';
	var speed = 3.5;

	var growTimer = 0;
	var laserTimer = 0;
	var shootTimer = 0;
	var isLaser = false;

	var x = screen.width / 2 - ( width / 2 );
	var y = ( screen.height - ( height * 2 ) );

	var endPoint = x;
	var startPoint = 275;

	var keys = [];

	document.addEventListener('keydown', function (ev) {
		keys[ev.which] = true;
	});

	document.addEventListener('keyup', function (ev) {
		keys[ev.which] = false;
	});

	private.draw = function () {
		ctx.beginPath();
		//ctx.globalAlpha = 0.2;
		ctx.rect(x, y, width, height);
		ctx.fillStyle = color;
		ctx.fill();
	};

	private.draw();

	public.getX = function(){
		 return x;
	};

	public.getY = function(){
		return y;
	};

	public.getWidth = function(){
		return width;
	};

	public.getHeight = function(){
		return height;
	};

	private.grow = function(){
		width = 200;
	};

	private.shrink = function(){
		width = 150;
	};

	private.isCollide = function(obj1, obj2) {
		return(
			x + width >= obj2.getX() && x <= obj2.getX()
			&&
			y + height >= obj2.getY() && y <= obj2.getY()
		);
	}

	public.update = function () {

		private.draw();

		switch( true ){
			case keys[65] || keys[37]:
				if( endPoint > 0 ){
					endPoint-= speed;
				}
				break;

			case keys[68] || keys[39]:
				if( endPoint + width < screen.width ){
					endPoint+= speed;
				}
				break;
		}

		var toTravel = ( endPoint - x ) < 0 ? -( endPoint - x ):( endPoint - x );

		if( toTravel > 0.1 ){
			var speedCalc = ( endPoint - x ) / 50;
			x+= speedCalc;
			// ctx.beginPath();
			// ctx.rect(endPoint, y, height, height);
			// ctx.fillStyle = 'blue';
			// ctx.fill();
		}

		if( keys[32] ){
			console.log( 'space' );
		}

		for(var i in objects){

			if(i.includes('PowerUp') && objects[i] !== null){

				if(private.isCollide( private, objects[i] ) ){

					if( width === 150 ){
						private.grow()
					}else{
						growTimer = 0;
					}

					if( objects[i].type === 'laser' ){
						if( isLaser ){
							laserTimer = 0;
						}
						isLaser = true;
					}
					removeObject(i);
				}
			}

			if( width === 200 ){
				growTimer++;
				if( growTimer === 15000 ){
					private.shrink();
					growTimer = 0;
					isLaser = false;
				}
			}
		}
	};

	return public;
});