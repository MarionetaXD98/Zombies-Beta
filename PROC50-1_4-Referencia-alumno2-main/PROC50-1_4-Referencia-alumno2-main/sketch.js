var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1, heart2, heart3, heart;
var life = 3;
var ZombiesGroup;
var segundos = 0;
var collision = 0;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  heart1 = loadImage("assets/heart_1.png")
  heart2 = loadImage("assets/heart_2.png")
  heart3 = loadImage("assets/heart_3.png")
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {


 edges= createEdgeSprites();

  createCanvas(windowWidth,windowHeight);

  ZombiesGroup = new Group();
  //Añadir la imagen de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//Crear el sprite del jugador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
     player.debug = false
     player.setCollider("rectangle",0,0,300,300)

  heart = createSprite(1200,50)
  heart.addImage(heart3)
  heart.scale = 0.3
}

function draw() {
  background(0); 

 segundos = segundos +(1/60);
 console.log (segundos);


if((keyDown("UP_ARROW")||touches.length>0)&& player.y> 0){
  player.y = player.y-30
}
if((keyDown("DOWN_ARROW")||touches.length>0)&& player.y< windowHeight){
 player.y = player.y+30
}


//Liberar las balas y cambiar la imagen del tirador a la posición de disparo cuando la barra espaciadora se presiona.
if(keyWentDown("space")){ 
  player.addImage(shooter_shooting);
 
}

//El jugador regresa a la imagen de posición original una vez que dejamos de presionar la barra de espacio.
else if(keyWentUp("space")){
 player.addImage(shooterImg);


}
if(ZombiesGroup.collide(player)){
  life-= 1;
  collision = Math.round (segundos);
}
if(collision === segundos -1){
  life-= 1;
}

switch(life){
  case 3: heart.addImage(heart3);break;
  case 2: heart.addImage(heart2);break;
  case 1: heart.addImage(heart1);break;
  case 0: heart.destroy();
}

spawnzombies();
drawSprites();

}

function spawnzombies(){
if(frameCount%80 === 0){
  var Zombie = createSprite(windowWidth, Math.round(random(windowHeight -500, windowHeight)), 20, 40)
  Zombie.velocityX = -3
  ZombiesGroup.add(Zombie)
}


}