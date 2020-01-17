
var doing = false;
var spinsound = [new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3")];
var coinsound = [new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3")];
var winsound = new Audio("res/sounds/win.mp3");
var losesound = new Audio("res/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status");
var info = true;
var money = 0;

function doSlot(){
    
	if (doing){return null;}
	doing = true;
	var numChanges = randomInt(1,4)*7
	var numeberSlot = [numChanges+randomInt(1,7), numChanges+2*7+randomInt(1,7), numChanges+4*7+randomInt(1,7) ]

	var i = [0,0,0];
	var sound = 0
	status.innerHTML = "SPINNING" + " " + money;
    var slot = [setInterval(function(){spin(0);}, 50), 
                    setInterval(function(){spin(1);}, 50),
                    setInterval(function(){spin(2);}, 50) ]
	
	function spin(slotnum){
		i[slotnum]++;
        
        if (i[slotnum]>=numeberSlot[slotnum]){
			coinsound[slotnum].play();
            clearInterval(slot[slotnum]);
            
            if( slotnum == 2 )
                testWin();

			return null;
		}
		slotTile = document.getElementById("slot"+(slotnum+1));
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
        }
        
        slotTile.className = "a"+( (parseInt(slotTile.className.substring(1))+1) )
        
        sound++;
		if (sound==spinsound.length){
			sound=0;
        }
        spinsound[sound].play();
    }
    
}

function testWin(){
	var slot1 = document.getElementById("slot1").className
	var slot2 = document.getElementById("slot2").className
    var slot3 = document.getElementById("slot3").className

	if (((slot1 == slot2 && slot2 == slot3) ||
		(slot1 == slot2 && slot3 == "a7") ||
		(slot1 == slot3 && slot2 == "a7") ||
		(slot2 == slot3 && slot1 == "a7") ||
		(slot1 == slot2 && slot1 == "a7") ||
		(slot1 == slot3 && slot1 == "a7") ||
		(slot2 == slot3 && slot2 == "a7") ) && !(slot1 == slot2 && slot2 == slot3 && slot1=="a7")){
        status.innerHTML = "YOU WIN!";
        money += 2
        status.innerHTML = "SPINNING" + " " + money;
		winsound.play();
	}else{
		status.innerHTML = "TRY AGAIN!";
		losesound.play();
	}
	doing = false;
}

function toggleAudio(){
	if (!audio){
		audio = !audio;
		for (var x of spinsound){
			x.volume = 0.5;
		}
		for (var x of coinsound){
			x.volume = 0.5;
		}
		winsound.volume = 1.0;
		losesound.volume = 1.0;
	}else{
		audio = !audio;
		for (var x of spinsound){
			x.volume = 0;
		}
		for (var x of coinsound){
			x.volume = 0;
		}
		winsound.volume = 0;
		losesound.volume = 0;
	}
	document.getElementById("audio").src = "res/icons/audio"+(audio?"On":"Off")+".png";
}

function randomInt(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}
