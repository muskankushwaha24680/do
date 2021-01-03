//Create variables here
var dog , dogImg , happydogImg , database , foodS , foodStock ;
var foodStock = 20 ;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happydogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,300,50,70);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value" , readStock);
}


function draw() {  
background(46,139,87);

textSize(15);
stroke("black");
fill("white");
text(" Note: Press UP_ARROW Key To Feed Drago Milk ", 50,50);

if(keyWentDown (UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImg);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

  drawSprites();
  //add styles here
  textSize(20);
  fill("red");
text("foodRemaining :"+  foodS , 100,150);
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
    }
    else{
      x = x - 1 ;
    }
database.ref('/').update({
  Food: x
})

}
