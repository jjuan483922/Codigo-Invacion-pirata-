class Boat {
constructor ( x,y,width,height,BoatPos,boatAnimation){
var options = {
restitution:0.8,
friction:1,
density:1
}
this.animation=boatAnimation
this.speed=0.05
this.body = Bodies.rectangle(x,y,width,height,options)
this.width = width
this.height = height
this.image = loadImage("assets/boat.png");
this.BoatPos=BoatPos
World.add(world, this.body);
}
animate(){
this.speed+=0.05


}
display (){
var pos = this.body.position
var index=floor(this.speed%this.animation.lenght)
push ()
translate (pos.x, pos.y)
imageMode (CENTER)
image(this.animation[index], 0, this.BoatPos, this.width, this.height);
pop ()

}
remove(index){
Matter .Body.setVelocity(this.body,{x:0,y:0})
setTimeout(()=>{
    Matter.World.remove(world,boats[index].body)
    delete boats[index]
},500)
}
}