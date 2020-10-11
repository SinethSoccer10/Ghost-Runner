var background1, backgroundImg;

var door, doorImg, doorsGroup;

var climber, climberImg, climberGroup;

var ghost, ghostImg, ghostJumping;

var ib, ibGroup;

var gameState = "PLAY"

var s

function preload(){
backgroundImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
  
ghostImg = loadImage("ghost-standing.png");
ghostJumping = loadImage("ghost-jumping.png");
  
 s = loadSound("spooky.wav");
}



function setup(){
  createCanvas(600,600);
background1 = createSprite(300,300,600,600);
background1.addImage("backgroundImg", backgroundImg);
background1.velocityY = 3;
  
ghost = createSprite(200,300,50,50);
ghost.addImage("ghostImg", ghostImg);
ghost.scale = 0.5;

  
ibGroup = createGroup();
climberGroup = createGroup();
doorsGroup = createGroup();
}

function draw(){
 background("black");
  
  s.loop();
  if(gameState === "PLAY"){
    
    
  if(background1.y > 300){
     background1.y = 200;
     }
  if(keyDown("left_arrow")){
    ghost.x -=3;
  }
  
    if(keyDown("right_arrow")){
    ghost.x +=3;
  }
  
  if(doorsGroup.isTouching(ghost) || climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(ibGroup.isTouching(ghost) || ghost.x >600 || ghost.x <0){
     ghost.destroy();
    gameState = "END";
     }
    
    
  
  spawnDoors();
  drawSprites();
  }
if(gameState === "END"){
  textSize(30);
  text("Game Over", 250,300);
}
}

function spawnDoors(){
 if(frameCount% 250===0){
door = createSprite(200,50,20,40);
door.addImage("doorImg", doorImg);
door.velocityY = 3;
   
door.x = Math.round(random(150,450));
door.lifetime = 700;
   doorsGroup.add(door);
   
   climber = createSprite(200,100,20,40);
   climber.addImage("climberImg", climberImg);
   climber.velocityY = 3;
   climber.x = door.x;
   climber.lifetime = 700;
   climberGroup.add(climber);
   
   ghost.depth = door.depth
   ghost.depth +=1;
   
   ib = createSprite(200,90,80,40)
   ib.velocityY = 3;
   ibGroup.add(ib);
   ib.x = climber.x
   
 } 
  
}

