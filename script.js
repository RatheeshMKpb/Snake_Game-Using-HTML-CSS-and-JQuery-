$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	var grd = ctx.createLinearGradient(0, 255, 255, 0);
	grd.addColorStop(0, "#aaff9c");
	grd.addColorStop(1, "#aaff9c");


	var cw = 10;
	var d;
	var food;
	var score;
	var bonus_period;
	var bonus;	
	var point;
	var food_loop;
	var game_loop;

	document.getElementById("btn1").addEventListener("click", easy);
	document.getElementById("btn2").addEventListener("click", medium);
	document.getElementById("btn3").addEventListener("click", hard);
	document.getElementById("pause").addEventListener("click", pause);


	function easy(){
		d = "right";
		create_snake();
		create_food();
		score = 0;
		point = 5;
		bonus_period = 0;
		$("#h2").hide();
		$("#btn1").hide();
		$("#btn2").hide();
		$("#btn3").hide();
		$("#start").show();
		$("#pause").show();
		$("#start").click(function(){
				game_loop = setInterval(paint,200);
				food_loop = setInterval(create_bonus(),5000);
		});
 
		
	}

	function medium(){
		d = "right";
		create_snake();
		create_food();
		score = 0;
		point = 5;
		bonus_period = 0;
		$("#h2").hide();
		$("#btn1").hide();
		$("#btn2").hide();
		$("#btn3").hide();
		$("#start").show();
		$("#pause").show();
		$("#start").click(function(){
				game_loop = setInterval(paint,100);
				food_loop = setInterval(create_bonus(),5000);
		});
	 
		 
	}

	function hard(){
		d = "right";
		create_snake();
		create_food();
		score = 0;
		point = 5;
		bonus_period = 0;
		$("#h2").hide();
		$("#btn1").hide();
		$("#btn2").hide();
		$("#btn3").hide();
		$("#start").show();
		$("#pause").show();
		$("#start").click(function(){
				game_loop = setInterval(paint,40);
				food_loop = setInterval(create_bonus(),5000);
		});
		 
	}
	
	
	var snake_array;

	function pause() {
		$("#pause").click(function(){
			clearInterval(game_loop);
			ctx.fillStyle = "white";
			ctx.font = "40px tahoma";
			ctx.fillText("Game Paused.!!",w/2-100, h/2);
		})
	}

	function create_snake(){
		var length = 5;
		snake_array = [];
		for(var i=length-1;i>=0;i--){
			snake_array.push({x:i,y:0});
		}
	}

	function create_food(){
		food = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw)
		}
	}

	function create_bonus(){
		bonus = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw)
		}
	}

	function paint(){
		ctx.fillStyle = grd;
		ctx.fillRect(0,0,w,h);
		ctx.globalAlpha=1;
		ctx.strokeStyle = "black";
		ctx.strokeRect(0,0,w,h);

		var snakeX = snake_array[0].x;
		var snakeY = snake_array[0].y;

		if(d == "right")snakeX++;
		else if(d == "left")snakeX--;
		else if(d == "up")snakeY--;
		else if(d == "down")snakeY++;

		if(snakeX == -1 || snakeX == w/cw || snakeY == -1 || snakeY == h/cw || collision_detection(snakeX,snakeY,snake_array)){
			game_over();
		}

		if(snakeX == food.x && snakeY == food.y){
			var tail = {x:snakeX, y:snakeY};
			score++;
			bonus_period++;
			create_food();
		}
		else{
			var tail = snake_array.pop();
			tail.x = snakeX;
			tail.y = snakeY;
		}


		if(bonus_period == point){
			
			food_bonus(bonus.x,bonus.y);
		if(snakeX == bonus.x && snakeY == bonus.y){
			score += 5;
			point+= 5;
			}
		}

		snake_array.unshift(tail);

		for(var i=0; i<snake_array.length;i++){
			var c = snake_array[i];
			ctx.fillStyle = (i==0) ? "blue" : "red";
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
			}
				color_food(food.x,food.y);
				
	

			   ctx.fillStyle = "black";
			   ctx.font = "40px tahoma";
			   ctx.fillText(score,10,40);

	}

	function color_food(x,y){

			ctx.fillStyle = "red";
			ctx.fillRect(food.x*cw, food.y*cw, cw,cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(food.x*cw, food.y*cw, cw,cw);
	}

	function food_bonus(x,y){
			ctx.fillStyle = "yellow";
			ctx.fillRect(bonus.x*cw, bonus.y*cw, 12,12);
			ctx.strokeStyle = "white";
			ctx.strokeRect(food.x*cw, food.y*cw, 12,12);

	}

		

	function collision_detection(x,y,array){
		for(i=0; i<array.length;i++){
			if(array[i].x == x && array[i].y == y){
				return true;
			}
		}
		return false;
	}

	function game_over(){
		clearInterval(game_loop);
		ctx.fillStyle = "white";
		ctx.font = "40px tahoma";
		ctx.fillText("Game Over.!!",w/2-100, h/2);
	}

	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && d != "right"){
			d = "left";
		}
		else if(key == "38" && d != "down"){
			d = "up";
		}
		else if(key == "39" && d != "left"){
			d = "right";
		}
		else if(key == "40" && d != "up"){
			d = "down";
		}
	});

});