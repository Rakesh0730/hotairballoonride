var balloonImage1, balloonImage1;
var bg;
var database
function preload(){

balloonImage1 = loadImage("hab1.png");
balloonImage2 = loadAnimation("hab1.png", "hab1.png", "hab1.png", "hab2.png", "hab2.png", "hab2.png", "hab3.png", "hab3.png", "hab3.png");

bg = loadImage("Hot Air Balloon-01.png");

}

function setup() {

  database = firebase.database();
  createCanvas(1500,700);
  
  
 
  balloon1 = createSprite(250, 650, 150, 150);
  balloon1.addAnimation("colors", balloon2);

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20);

}

function draw() {

  background(bg);
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon1.addAnimation("hotAirBalloon",hab2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon1.addAnimation("hotAirBalloon",hab2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon1.addAnimation("hotAirBalloon",hab2);
    balloon1.scale=balloon1.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon1.addAnimation("hotAirBalloon",hab2);
    balloon1.scale=balloon1.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move the Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon1.x = height.x;
  balloon1.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
