var screen, ctx, paddle, objects = [];

window.onload = function () {
	screen = document.getElementById("screen");
	ctx = screen.getContext("2d");

	paddle = Paddle( 'Paddle' );

	objects['Paddle'] = paddle;
	objects['ball'] = Ball( 'Ball' );

	for( var i=0;i<3;i++ ){
		for( var y=0;y<6;y++ ){
			addObject(y * ( 100 + 10 ) + 25, ( 10 + 60 ) * i, 'Block' );
		}
	}

	setInterval(function(){
		window.ctx.clearRect(0, 0, screen.width, screen.height);

		for( var i in objects ){
			objects[i].update();
		}
	}, 0);
}

function addObject( x , y,  tag ){
	var count = 0;
	for( var key in objects ){
		count++;
	}
	objects[tag+':'+count] = window[tag]( x , y, tag+':'+count );
}

function removeObject( tag ) {
	delete objects[tag];
}