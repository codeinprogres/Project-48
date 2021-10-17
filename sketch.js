var thor, thorImage, thor1Img;
var lightning_animation;
var PLAY, END, BUTTONON, BUTTONOFF, START, RULES;
PLAY = 1;
END = 0;
BUTTONON = 2;
BUTTONOFF = 3;
START = 4;
RULES = 5;
var gameState = START;
var back;
var lightning , lightning1;
var button;
var zombieAnimation;
var lightStop;
var zobieLeft, zobieRight;
var secondZombie;
var button1, button1Img;
var button2, button2Img;
var back2, back3;

function preload(){
   thorImage = loadImage("thor.png");
   thor1Img = loadImage("thor1.png");
   lightning_animation = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png");
   back = loadImage("background.jpg");
   zombieAnimation = loadImage("z1.png", "z2.png", "z3.png", "z4.png", "z5.png", "z6.png", "z7.png", "z8.png");
   secondZombie = loadImage("l2.png");
   button1Img = loadImage("button1.png");
   button2Img = loadImage("button2.png");
   back2 = loadImage("back.png");
   back3 = loadImage("back3.png");
}

function setup(){
   createCanvas(windowWidth, windowHeight);


   thor = createSprite(windowWidth/2, 795, 40, 30);
   thor.addImage(thor1Img);
   thor.scale = 0.25;

   button1 = createSprite(windowWidth - 1750, windowHeight - 700, 60, 60);
   button1.addImage(button1Img);
   button1.scale = 0.25;
   button1.visible = true;


   button2 = createSprite(windowWidth - 200, windowHeight - 700, 60, 60);
   button2.addImage(button1Img);
   button2.scale = 0.25;
   button2.visible = true;

   lightning = createSprite(490, 490, 0, 1700);
   lightning.addAnimation("hitting", lightning_animation);
   lightning.frameDelay = 2;
   lightning.scale = 3;
   lightning.visible = false;


    lightning1 = createSprite(windowWidth - 490, 490, 0, 1700);
   lightning1.addAnimation("hitting", lightning_animation);
   lightning1.frameDelay = 2;
   lightning1.scale = 3;
   lightning1.visible = false;

   
 zobieLeft = new Group();
 zobieRight = new Group();
}

function draw(){
   background("red");

   if(keyDown("r")){
      reset();
   }

   if(gameState === RULES){
      background("black");
      text("Click the lightning bolts circles to kill the zombies. If they touch you, you lose!", windowWidth/2, windowHeight/2);
      text("Click b to start the game", windowWidth/2, windowHeight/2 + 150);

      thor.visible = false;
      button1.visible = false;
      button2.visible = false;
      lightning.visible = false;
      lightning1.visible = false;
      zobieLeft.destroyEach();
      zobieRight.destroyEach();
   }

   if(gameState === START){
      background(back3);
      thor.visible = false;
      button1.visible = false;
      button2.visible = false;
      lightning.visible = false;
      lightning1.visible = false;
      zobieLeft.destroyEach();
      zobieRight.destroyEach();
   }
if(keyDown("b")){
   gameState = PLAY;
   thor.visible = true;
   button2.visible = true;
   button1.visible = true;
}

if(keyDown("a")){
   gameState = RULES;
}

   if(gameState === PLAY){
      background(back);


   if(keyDown("left")){
      thor.addImage(thor1Img);
      thor.x -= 6;
   }

   if(keyDown("right")){
      thor.addImage(thorImage);
      thor.x += 6;
   }

   if(mousePressedOver(button1)){

      lightning.visible = true;


      if(zobieLeft.isTouching(lightning)){
         zobieLeft.destroyEach();
      }
   } else {
      lightning.visible = false;
   }

   if(zobieRight.isTouching(thor)){
      gameState = END;
   }

   if(zobieLeft.isTouching(thor)){
      gameState = END;
   }

   if(mousePressedOver(button2)){
      lightning1.visible = true;

      
      if(zobieRight.isTouching(lightning1)){
         zobieRight.destroyEach();
      }
   } else{
      lightning1.visible = false;
   }


   zombieLeft();
   zombieRight();
   }

   if(gameState === END){
      background(back2);
      thor.visible = false;
      zobieLeft.destroyEach();
      zobieRight.destroyEach();
      zobieRight.setVelocityXEach = 0;
      zobieLeft.setVelocityXEach = 0;
      button1.visible = false;
      button2.visible = false;
      lightning.visible = false;
      lightning1.visible = false;
   }

   function reset() {
      gameState = PLAY;
      thor.visible = true;
      button2.visible = true;
      button1.visible = true;
   }

   drawSprites();
}

function zombieLeft() {
   if(frameCount%10 === 0){
      var zombie = createSprite(-100, thor.y, 40, 30);
      zombie.addAnimation("hitting", zombieAnimation);
      zombie.velocityX = 20;
      zombie.scale = 0.3;

      zobieLeft.add(zombie);
   }
}


function zombieRight() {
   if(frameCount%10 === 0){
      var zombie = createSprite(windowWidth + 100, thor.y, 40, 30);
      zombie.addAnimation("hitting", secondZombie);
      zombie.velocityX = -20;
      zombie.scale = 0.3;

      zobieRight.add(zombie);
   }
}
