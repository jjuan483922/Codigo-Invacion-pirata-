const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls=[];
var boats=[];
var boatAnimation=[]
var boatSpriteData
var boatSpriteSheet
var brokenBoatAnimation=[]
var brokenBoatSpriteSheet
var brokenBoatData


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteSheet= loadImage("./assets/boat/boat.png");
  boatSpriteData= loadJSON("./assets/boat/boat.json")
  brokenBoatSpriteSheet= loadImage("./assets/boat/brokenBoat.png")
  brokenBoatData= loadJSON("./assets/boat/brokenboat.json")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var boatFrames=boatSpriteData.frames;
  for (var i=0;i<boatFrames.length;i++)
  {
    var Pos=boatFrames[i].position
    var img=boatSpriteSheet.get(Pos.x,Pos.y,Pos.w,Pos.h)
    boatAnimation.push(img)
  }
  var brokenboatFrames=brokenBoatData.frames;
  for (var i=0;i<brokenboatFrames.length;i++)
  {
    var Pos=brokenboatFrames[i].position
    var img=brokenBoatSpriteSheet.get(Pos.x,Pos.y,Pos.w,Pos.h)
    brokenBoatAnimation.push(img)
  }
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
 
}


function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  showBoats();
  cannon.display();
for(var i=0;i<balls.length;i++){
showCannonBalls(balls[i],i)
choqueconlosbotes(i)
}
}
function keyPressed(){
if (keyCode === DOWN_ARROW){
    var cannonBall=new CannonBall(cannon.x,cannon.y)
    cannonBall.trayectory=[];
    Matter.Body.setAngle(cannonBall.body,cannon.angle);
    balls.push(cannonBall);

}

}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
   balls[balls.length-1].shoot();
  }
}
function showCannonBalls(ball){
  if (ball){
    ball.display();
  }
}
function showBoats () {
if (boats.length>0) {
  console.log("boat2");
if (boats[boats.length-1]== undefined ||
  boats[boats.length-1].body.position.x<width-300) {
    boat = new Boat (width-80, height-60,170,170,-60,boatAnimation);
    
    boats.push(boat);
  }
    for (var i = 0;i<boats.length;i++){
  if (boats[i]) {
 Matter.Body.setVelocity(boats[i].body,
  {
    x:-0.8,y:0
  })
boats[i].display();
boats[i].animate()
  }
    }


}
else{
  boat = new Boat (width-80, height-60,170,170,boatAnimation);
boats.push(boat);
console.log("boat1");
}
}
function  choqueconlosbotes (index){
for(var i=0;i<boats.length;i++){
if (balls[index]!==undefined &&boats[i]!==undefined){
var collicion=Matter.SAT.collides(balls[index].body,boats[i].body)
if(collicion.collided){
boats[i].remove(i)
Matter.World.remove(world,balls[index].body)
delete balls[index]
}

}

}

}







