console.log( "block" );
var Block = ( function ( x, y, tag ) {
	var public = {};
	var private = {};

	var width = 100;
	var height = 50;
	var color = 'blue';
	var life = 1;

	private.idle = function () {
		ctx.beginPath();
		ctx.rect( x , y, width,  height );
		ctx.fillStyle = color;
		ctx.fill();
	};

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

	public.damageLife = function ( damage ) {
		life-= damage;
	};

	public.update = function () {
		private.idle();

		if(life <= 0){

			if(Math.random() * 10 > 5){
				if(Math.random() * 10 > 5){
					addObject( x + ( width / 2 ), y + ( height / 2 ), 'PowerUp');
				}else{
					addObject( x + ( width / 2 ), y + ( height / 2 ), 'PowerUp');
				}
			}
			removeObject( tag );
		}
	};

	return public;
});