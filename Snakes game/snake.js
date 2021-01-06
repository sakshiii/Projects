score = 0;

function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 700;
	pen = canvas.getContext('2d');
	cs = 60;
	game_over = false;
	

	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:3,
		color:"cornsilk",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				//pen.fillStyle = this.color;
				var rect = canvas.getBoundingClientRect();
    			var posx = this.cells[i].x*cs;
    			var posy = this.cells[i].y*cs;

			    pen.fillStyle = this.color;
    		    pen.beginPath();
    			pen.arc(posx, posy, 38, cs-3, 2 * Math.PI*0.75);
    			pen.fill();
				//pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
                var audio = new Audio('Assets/chew.mp3');
                audio.play();
                console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			/*prevents snake from going out*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over = true;
                let aud = new Audio('Assets/collide.mp3');
                aud.play();                
			}
            for(let i=3;i<this.cells.length;i++)
            {
                if(headX==this.cells[i].x && headY==this.cells[i].y)
                    {
                        let aud = new Audio('Assets/collide.mp3');
                        aud.play();
                        game_over=true;
                        break;
                    }
            }
		}

	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		//console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;
	
}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	
	pen.drawImage(food_img,food.x*(cs-3),food.y*(cs-3),cs-3,cs-3);

	pen.drawImage(trophy,20,20,cs-3,cs-3);
	pen.fillStyle = "Red";
	pen.font = "30px Roboto"
	pen.fillText(score,50,50);

	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
	}
	return food

}

function gameloop(){
	if(game_over==true){
        
		alert("Game Over , your score is :"+score);
		//document.getElementById('btn').clicked = false
		// if(document.getElementById('btn').clicked == true)
		// 	{
		// 		score=0
		// 		game_over=false;
		// 		init();
		// 	}
		clearInterval(f);
		return;
			
	}
	draw();
	update();
}


var f = setInterval(gameloop,160);
