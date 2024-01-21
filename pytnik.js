class Agent {
  constructor(id,width,height,x,y,bgimage){
      this.id = id;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.bgimage = bgimage;
  }

  Show(){
      var image = document.createElementNS("http://www.w3.org/2000/svg","image");
      image.setAttribute("x",this.x);
      image.setAttribute("y",this.y);
      image.setAttribute("id",this.id);
      image.setAttribute("width",this.width);
      image.setAttribute("height",this.height);
      image.setAttribute("href",this.bgimage);
      document.getElementById("svg").appendChild(image);
  }
}


class Coin {
  constructor(id,clas,x,y,r){
      this.id = id;
      this.clas = clas;
      this.x = x;
      this.y = y;
      this.r = r;
  
  }
  ShowCoin(){
      var coin = document.createElementNS("http://www.w3.org/2000/svg","circle");
      coin.setAttribute("cx",this.x);
      coin.setAttribute("cy",this.y);
      coin.setAttribute("r",this.r);
      coin.setAttribute("fill","yellow");
      coin.setAttribute("stroke","black");
      coin.setAttribute("class",this.clas);
      coin.setAttribute("id",this.id);
      document.getElementById("svg").appendChild(coin);
  
       var text = document.createElementNS("http://www.w3.org/2000/svg","text");
      text.setAttribute("x",this.x-4);
      text.setAttribute("y",this.y+5);
      text.setAttribute("id",this.id*(-1));
      text.setAttribute("fill","black");
      text.textContent = `${this.id}`;
      document.getElementById("svg").appendChild(text); 
  
  }
  removeCoin(){
  document.getElementById(this.id).style.visibility = 'hidden';
  document.getElementById(this.id*(-1)).style.visibility = 'hidden';
  }
  
  }
 
var path = []


const setup = () => {
  var map;
  document.getElementById("map0").addEventListener("input",function(){map = 'map0'; });
  document.getElementById("map1").addEventListener("input",function(){map = 'map1'; });
  //alert(map);
  if(map == 'map0'){
    var matrica = [
      [0,7,6,10,13],
      [7,0,7,10,10],
      [6,7,0,8,9],
      [10,10,8,0,6],
      [13,10,9,6,0]
    ]; 
  }
  //console.log(matrica);
  return matrica;
}

var initx = 0;
var inity = 0;
function PlayingGame() {
  var matrica;
  if(document.getElementById("map0").checked){
  matrica = [
    [0,7,6,10,13],
    [7,0,7,10,10],
    [6,7,0,8,9],
    [10,10,8,0,6],
    [13,10,9,6,0]
  ]; 
  var agent = new Agent(0,50,50,94,485,"agent.jpg");
  agent.Show();
  initx = 94;
  inity = 485;
  
  var c1 = new Coin(1,"coin",150,149,15); c1.ShowCoin();
  var c2 = new Coin(2,"coin",438,410,15); c2.ShowCoin();
  var c3 = new Coin(3,"coin",745,540,15); c3.ShowCoin();
  var c4 = new Coin(4,"coin",823,231,15); c4.ShowCoin();



  }
  else if(document.getElementById("map1").checked){
    matrica = [
      [0,422,305,144,403,159,242,372],
      [422,0,357,483,383,143,589,435],
      [305,357,0,359,487,328,584,255],
      [144,483,359,0,412,368,548,478],
      [403,383,487,412,0,393,266,258],
      [159,143,328,368,393,0,397,539],
      [242,589,584,548,266,397,0,363],
      [372,435,255,478,258,539,363,0]
    ]
  
  //console.log(matrica);
  var agent = new Agent(0,50,50,572,555,"agent.jpg");
  agent.Show();
  initx = 572;
  inity = 555;


  var c1 = new Coin(1,"coin",700,390,15); c1.ShowCoin();
  var c2 = new Coin(2,"coin",804,566,15); c2.ShowCoin();
  var c3 = new Coin(3,"coin",404,350,15); c3.ShowCoin();
  var c4 = new Coin(4,"coin",720,150,15); c4.ShowCoin();
  var c5 = new Coin(5,"coin",359,39,15); c5.ShowCoin();
  var c6 = new Coin(6,"coin",116,114,15); c6.ShowCoin();
  var c7 = new Coin(7,"coin",100,511,15); c7.ShowCoin();
  }

var selectElement = document.getElementById("sl");
var pretrazivanje = document.getElementById("srch");
var selectedIndex = selectElement.selectedIndex;
var selectedOption = selectElement.options[selectedIndex];
var agentSel = selectedOption.value;

console.log(agentSel);
console.log(matrica);

if(agentSel == 'Aki') pretrazivanje.innerHTML = "DFS";
else if(agentSel == 'Jocke') pretrazivanje.innerHTML = 'BRUTE FORCE';
else if(agentSel == 'Uki') pretrazivanje.innerHTML = 'BRANCH AND BOUND';
else if(agentSel == 'Micko') pretrazivanje.innerHTML = 'A*';

//SLANJE ZAHTEVA
///const url = 'http://127.0.0.1:8000/game/path/';
//const url = 'https://pytnikbackend.vercel.app/game/path/';
const url = 'https://benjaminr02.pythonanywhere.com/game/path/';
const data = {
  matrica: matrica,
  agent: agentSel
  
};

fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    path = data.path;

  })
  .catch((error) => {
    console.log('Error:', error);
  });
  var black = document.getElementById("black");
  var p = document.createElement("p");
  
var sum = 0;
var niz = [];

var j = 1;
function move(){
    
  var elem = path[j];
  if(j==1) niz.push(path[0]);

    let agentt = document.getElementById("0");
    agentt.setAttribute("x", document.getElementById(elem).getAttribute("cx")-'18');
    agentt.setAttribute("y",document.getElementById(elem).getAttribute("cy")-'18');
    if(j < path.length-1){
    document.getElementById(elem).style.visibility = 'collapse';
    document.getElementById(elem*(-1)).style.visibility = 'collapse';
    niz.push(path[j]);
    var p = document.createElement("p");
    sum += matrica[path[j-1]][path[j]];
    p.innerHTML = "" +niz+ "<br>";
    black.appendChild(p);
    document.getElementById("suma").innerHTML = " " +sum+ "";
    j++;
}
    else if(j==path.length-1){
      niz.push(path[j]);
      
    var p = document.createElement("p");
    sum += matrica[path.length-2][0];
    document.getElementById("suma").innerHTML = " " +sum+ "";

    p.innerHTML = " " +niz+ "<br>";
    black.appendChild(p);

    agentt.setAttribute("x",initx);
      agentt.setAttribute("y",inity);
     
    clearInterval(m);
    setTimeout(function(){
        document.getElementById("mod").style.visibility = 'visible';
        document.getElementById("mod").innerHTML = "Zlatnici su sakupljeni!";
        
    },500)
    setTimeout(() => {
      location.reload();
    }, 2000);
    }

  
}

var m = setInterval(move, 2000);

let isPaused = false;
document.addEventListener("keydown",(event)=>{
  if(event.key == ' '){
    isPaused = !isPaused;
  }
  if(isPaused){
    alert("Game paused");
    //clearInterval(m);
  }
  else {
    //var m = setInterval(move, 2000);
    alert("Game continued");
    //var m = setInterval(move, 2000);
    move();
  }
})

}

document.getElementById("btn").addEventListener("click",()=>{
  //alert(agentSel);
  setup();
 
  PlayingGame();
  document.getElementById("btn").setAttribute("disabled","true");
  document.getElementById("map0").disabled = true;
  document.getElementById("map1").disabled = true;
  document.getElementById("sl").setAttribute("disabled","true");
});
