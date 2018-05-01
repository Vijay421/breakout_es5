console.log( 'powerup' );
var PowerUp = (function ( x, y, tag ) {

	var public = {};
	var private = {};

	var width = 25;
	var height = 25;
	var color = 'purple';
	var speed = 0.4;


	private.draw = function () {
		ctx.beginPath();
		ctx.rect( x , y, width, height );
		ctx.fillStyle = color;
		ctx.fill();
	};

	public.getX = function () {
		return x;
	};

	public.getY = function () {
		return y;
	};

	private.down = function () {
		y+= speed;
		private.draw();
	};

	public.update = function () {
		private.down();

		if( y >= screen.height ){
			removeObject( tag );
		}
	};

	return public;
});