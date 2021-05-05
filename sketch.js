var Balloon, balloon;
var bg;
var database
function preLoad(){

balloon = loadAnimation("hab1.png", "hab2.png", "hab3.png", "hab4.png");
bg = loadImage("pro-c35images/Hot Air Balloon-01.png");

}

function setup() {

  database = firebase.database();
  createCanvas(1500,700);
  
  
 
  Balloon = createSprite(250, 650, 150, 150);
  Balloon.addAnimation("colors", balloon);

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20);

}

function draw() {

  background(bg);
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
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
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}