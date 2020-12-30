var setting,fairy,star,bat;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;
var lives;

function preload(){
  
  settingImage=loadImage("Screenshot 2020-12-27 at 6.17.50 PM.png");
  fairyImage=loadImage("Screenshot 2020-12-27 at 6.46.21 PM.png");
  starImage=loadImage("Screenshot 2020-12-27 at 6.58.47 PM.png");
  batImage=loadImage("Screenshot 2020-12-27 at 7.10.13 PM.png");
 

}

function setup() {
 createCanvas(600,400);
  
  //creating setting
  setting=createSprite(300,200);
  setting.addImage(settingImage);
  setting.scale=1.5;
 
  //creating fairy 
  fairy=createSprite(90,200);
  fairy.addImage(fairyImage);
  fairy.scale=0.2;
  
  
  
  starGroup=createGroup();
  batGroup=createGroup();
  
  score=0;
  lives=2;
 
                    
                    
  
}

function draw() {
  background("white");
   if(gameState===PLAY){
       //creating a moving setting
  setting.velocityX=2;
  if(setting.x>400){
    setting.x=200;
  }
  
  // fairy movement with arrows
  if(keyDown(UP_ARROW)){
    fairy.y=fairy.y-2;
     }
   if(keyDown(DOWN_ARROW)){
    fairy.y=fairy.y+2;
     }
  
  //calling star function
  spawnStar();
  //calling bat function
  spawnBat();
     
  //getting points from stars
     if(fairy.isTouching(starGroup)){
        score=score+10
       starGroup.destroyEach();
        }
     
     // losing points and lives when touching bat
     if(fairy.isTouching(batGroup)){
       score=score-5;
       lives=lives-1;
       batGroup.destroyEach();
     }
     //transition into end state
     if(lives===0){
       gameState=END
        
        }
      
      }else {
        //stopping all movementon screen
        starGroup.setvelocityXEach=0;
        batGroup.setvelocityXEach=0;
        setting.velocityX=0;
      
      }
 
  
  drawSprites();
  //score text
  textSize(20);
  fill("pink");
  text("Score:"+score,500,50 );
  //lives text
  textSize(20);
  fill("pink");
  text("Lives:"+lives,500,80);
  
  //game over text
  if(gameState===END){
    textSize(50);
    fill("pink");
    text("Game Over",150,200);

     }
  
 
  
}

function spawnStar(){
  //creating star
  if(frameCount%70===0){
    star=createSprite(600,Math.round(random(100,300)));
    star.addImage(starImage);
    star.scale=0.07;
    star.velocityX=-4;
    star.lifetime=150;
    
    //depth
    star.depth=fairy.depth;
    fairy.depth=fairy.depth+1;
    
    //adding them to the group
    starGroup.add(star);
     
     }
  
  
  
  
  
}

function spawnBat(){
  if(frameCount%100===0){
    bat=createSprite(600,Math.round(random(100,300)));
    bat.addImage(batImage);
    bat.scale=0.08;
    bat.velocityX=-4;
    bat.lifetime=150;
    
    //depth
    bat.depth=fairy.depth;
    fairy.depth=fairy.depth+1;
    
    //adding them to group
    batGroup.add(bat);
  }
}






