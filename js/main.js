
const text = document.querySelector("p")
let playerBall = document.getElementById("pBall")
let playerWaterCup = document.getElementById("player-watercup")
let changeYourTurnOpacity = document.getElementById("yTurn") 
let cpuSideCups = document.getElementById("cSide")

const beerPong = {
  pHits: 0,
  cHits: 0,
  turnCounter: 1,
  //THIS FUNCTION DETERMINES: (a) If the game should keep running AND (b) Who's turn is it Player (Odds) or Computer (evens)
  newGame: function(eventObject) {
    beerPong.pHits = 0
    beerPong.cHits = 0
    beerPong.turnCounter = 1
    for(let i = 1; i <=10; i++){                     //SETS UP CUPS
      let pCups = document.getElementById(`p${i}`)
      pCups.setAttribute("value", "playable")
      pCups.setAttribute("style", "opacity:1")                                                                                                                         //WORK IN PROGRESS: comment these out for opacity change test
      let cCups = document.getElementById(`c${i}`)
      cCups.setAttribute("value", "playable")
      cCups.setAttribute("style", "opacity:1")                                                                                                                         //WORK IN PROGRESS: comment these out for opacity change test
    }
    text.innerHTML = "Ready to bounce some balls and grip a dip in some bubbly beverage?!<br><span id='start' class='instructions'>Wash your ball and take aim to see what happens. [START]</span>"
    document.getElementById("start").addEventListener("click", function(eventObject){  //LISTENS FOR CLICK TO START BUTTON
      beerPong.whosTurn()
    })
  },
  whosTurn: function () {                               
    if(this.pHits === 10){
      text.innerHTML = "<span class='yellow'>YOU WIN!!!</span> The computer rebooted in a bush and now its motherboard is fried! <span id='nGame'>[NEW GAME]</span>"
      document.getElementById("nGame").addEventListener("click", this.newGame.bind(this))
    } else if (this.cHits ===10) {
      text.innerHTML = "<span class='yellow'>YOU LOSE.</span> Better luck next time. Is that your phone at the bottom of the swimming pool? <span id='nGame'>[NEW GAME]</span>"
      document.getElementById("nGame").addEventListener("click", this.newGame.bind(this))
    } else { 
      if (this.turnCounter %2 !== 0) {
      this.playersTurn()
    } else {
      this.cpusTurn()
    }
  } 
},
washBall: function(eventObject) { //USED BY EVENT LISTENERS
  playerBall.setAttribute("style", "opacity:1")          
  playerBall.setAttribute("value", "washed")  
},
pClicksTarget: function(evtObj) { //USE BY EVENT LISTENERS
  if(evtObj.target.tagName === "DIV"){                          //listens only to clicks on cups(divs) not to blank spaces
    if(playerBall.getAttribute("value") === "unwashed") {       //TELLS YOU IF THE BALLS ARE DIRTY
      let text = document.querySelector("p")
      text.innerHTML = "<span class='yellow'>PUBLIC SERVICE ANNOUNCEMENT:</span> Don't forget to wash your balls." 
    } else if (playerBall.getAttribute("value") === "washed") { //ASSIGNS THE TARGET ID TO A VARIABLE
      playersTargetId = evtObj.target.getAttribute("id")
      console.log(playersTargetId)
      text.innerHTML = "Let's see what happens! <span id='ok'>[CLICK OK]</span>" //RUNS BALL DOES WHAT
      document.getElementById("ok").addEventListener("click", function(evtObj) {
      playerBall.setAttribute("style", "opacity:0") //working here
      changeYourTurnOpacity.setAttribute("style", "opacity:0")//working here
      beerPong.ball("p", playersTargetId)         //THE VARIABLE IS PASSED INTO THE BALL DOES WHAT FUNCTION
    })
    }
  }
},
// THIS FUNCTION DETERMINES WHAT THE BALL DOES (3 POSSIBLE OUTCOMES)
ball: function (lowerCaseLetter, targetCupId) {
    let cBallOpacity = document.getElementById("cBall") //DIMS COMPUTER BALL                                          
    cBallOpacity.setAttribute("style", "opacity:0")   
    playerWaterCup.removeEventListener("click", this.washBall)    //TURNS OFF EVENT LISTENER
    cpuSideCups.removeEventListener("click", this.pClicksTarget)  //TURNS OFF EVENT LISTENER
    let hoverEffectsBall = document.getElementById("player-watercup").setAttribute("class", "watercup")  //REMOVES HOVER EFFECT
    for (let z = 1; z <=10; z++){                                   //REMOVES HOVER EFFECTS
      let getCup = document.getElementById(`p${z}`).setAttribute("class", "cup")
      }

    this.turnCounter = this.turnCounter + 1                                                            
    let hitOrNoHit = Math.random()

    //FIRST CONSEQUENCE - MISS
    if (hitOrNoHit <=.33) {
      text.innerHTML = "Miss! <span id='ok'>[CLICK OK]</span>" 
      document.getElementById("ok").addEventListener("click", function(evtObj) {
      beerPong.whosTurn()
      })
      
      // SECOND CONSEQUENCE - HIT                                             
    } else if (hitOrNoHit >= .34 && hitOrNoHit <= .66) {
      text.innerHTML = "Check out that laser shot! It's a hit!<span id='ok'>[CLICK OK]</span>" 
      document.getElementById("ok").addEventListener("click", function(evtObj) {
      beerPong.whosTurn()
      })
      let target = document.getElementById(targetCupId) //THIS CODES MAKES THE CUP DISAPPEAR                     
      target.setAttribute("style", "opacity:0")
      // target.classList.add("hidden")                                                                                                                         //WORK IN PROGRESS: playing with opacity transitions
      target.setAttribute("value", "non-playable")
      if(lowerCaseLetter === "p") {                     //THIS DETERMINES WHICH HIT COUNTER GETS A POINT
        this.pHits = this.pHits + 1 
      } else if (lowerCaseLetter === "c") {
        this.cHits =this.cHits + 1
      } 
      
      //THIRD CONSEQUENCE - BOUNCE OFF AND HIT
    } else if (hitOrNoHit >= .67 && hitOrNoHit <= 1 ) {
      let targetOtherCup = ""
      if(lowerCaseLetter === "p") {  //THIS REASSIGNS THE TARGET CUP TO THE LAST ID IN THIS ARRAY THAT HAS AS VALUE OF PLAYABLE FOR THE PLAYER
        const playerIdArray=["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"] 
        for (let i = 0; i < playerIdArray.length; i++) { //SHUFFLES THE ARRAY
          let j = Math.floor(Math.random() * playerIdArray.length);  
          let temp = playerIdArray[i]; 
          playerIdArray[i] = playerIdArray[j];
          playerIdArray[j] = temp;   
        }
        for (k = 0 ; k < playerIdArray.length; k++){  //THIS ASSIGNS THE LAST ELEMENT THAT IS "PLAYABLE" AS THE NEW TARGET (VARIABLE HOLDS THE ID)
          let checkValue = document.getElementById(playerIdArray[k]).getAttribute("value") 
          if(checkValue === "playable") {                             
            targetOtherCup = playerIdArray[k]
          }
        }
        console.log("logged a p-change-target: " + targetOtherCup) // "REMOVES" NEW TARGET CUP AND CHANGES THAT DIV TI "NON-PLAYABLE"                                                          
        let grabOtherCupHit = document.getElementById(targetOtherCup)                                    
        grabOtherCupHit.setAttribute("value", "non-playable")
        grabOtherCupHit.setAttribute("style", "opacity:0")                                                               
        this.pHits = this.pHits + 1 //ADDS TO THE HIT COUNTER            
      } else if(lowerCaseLetter === "c") { //THIS REASSIGNS THE TARGET CUP TO THE LAST ID IN THIS ARRAY THAT HAS AS VALUE OF PLAYABLE FOR THE PLAYER
        const cpuIdArray=["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"] 
        for (let i = 0; i < cpuIdArray.length; i++) {  //SHUFFLES THE ARRAY
          let j = Math.floor(Math.random() * cpuIdArray.length);  
          let temp = cpuIdArray[i]; 
          cpuIdArray[i] = cpuIdArray[j];
          cpuIdArray[j] = temp;   
        }
        for (k = 0 ; k < cpuIdArray.length; k++){//THIS ASSIGNS THE LAST ELEMENT THAT IS "PLAYABLE" AS THE NEW TARGET (VARIABLE HOLDS THE ID)
          let checkValue = document.getElementById(cpuIdArray[k]).getAttribute("value") 
          if(checkValue === "playable") {                             
            targetOtherCup = cpuIdArray[k]
          }
        }
        console.log("logged a c-change-target: " + targetOtherCup)                                                                  
        let grabOtherCupHit = document.getElementById(targetOtherCup)                                    
        grabOtherCupHit.setAttribute("value", "non-playable") // "REMOVES" NEW TARGET CUP AND CHANGES THAT DIV TI "NON-PLAYABLE"    
        grabOtherCupHit.setAttribute("style", "opacity:0")
        this.cHits =this.cHits + 1   //ADDS TO HIT COUNTER                                    
      }
    text.innerHTML = "OoOo, it bounced off the target and sank into another cup!!<span id='ok'>[CLICK OK]</span>"
    document.getElementById("ok").addEventListener("click", function(evtObj) {
    beerPong.whosTurn()
    })
    }
  },
  playersTurn: function () { 
    changeYourTurnOpacity.setAttribute("style", "opacity:1")//DISPLAYS YOUR TURN 
    let hoverEffectsBall = document.getElementById("player-watercup").setAttribute("class", "watercup wash") //ADDS HOVER EFFECTS
    for (let i = 1; i <=10; i++){                                                                            //ADDS HOVER EFFECTS
      let getCup = document.getElementById(`p${i}`).setAttribute("class", "cup pick")
    }
    // let playerBall = document.getElementById("pBall")
    // let playerWaterCup = document.getElementById("player-watercup")
    playerWaterCup.addEventListener("click", this.washBall)    //LISTENS FOR CLICKS TO WASH THE BALL
    let playersTargetId = ""
    cpuSideCups.addEventListener("click", this.pClicksTarget)  //LISTENS FOR CLICKS FOR THE TARGET )
    playerBall.setAttribute("value", "unwashed")          //BALL IS DIRTY AFTER USE
  },

  cpusTurn: function () {
    let cBallOpacity = document.getElementById("cBall")     // UNDIMS COMPUTER BALL
        cBallOpacity.setAttribute("style", "opacity:1")    
    const cpuOptions = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"] 
    for (let i = 0; i < cpuOptions.length; i++) {                                       //SHUFFLES THE ARRAY
      let j = Math.floor(Math.random() * cpuOptions.length);  
      let temp = cpuOptions[i]; 
      cpuOptions[i] = cpuOptions[j];
      cpuOptions[j] = temp;   
    }
    console.log(cpuOptions)//this works
    let cpuTargetId = ""
    for (let k = 0; k < cpuOptions.length; k++){  //LOOPS THROUGH THE ARRAY AND STORES LAST ELEMENT THAT WAS "PLAYABLE"
          let checkValue = document.getElementById(cpuOptions[k]).getAttribute("value")
          if(checkValue === "playable") {
            cpuTargetId = cpuOptions[k]    //THIS VARIABLE HOLDS AN ID, A PARAMETER FOR THE NEXT FUNCTION
          }
      }
      console.log("computer initial choice: ", cpuTargetId)
      text.innerHTML = "The computer takes a shot!<BR>Let's see what happens! <BR><span id='ok'>[CLICK OK]</span>" //LISTENS FOR A CLICK
      document.getElementById("ok").addEventListener("click", function(evtObj) {                             //BEFORE RUNNING
        beerPong.ball("c", cpuTargetId)                                                                      //PARAMETERS THROUGH 
      })                                                                                                     //BALL DOES WHAT
  },
} 


beerPong.newGame()

//beerPong.ball("c", "c8")
//beerPong.playersTurn()
//beerPong.cpusTurn()

//-----------------------------------------[SCRATCH PAD AREA]------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//[THINGS TO DO]

// could add an if conditional statement for hitNoHit - if theres only one cup left (e.g. if any counter is at 9, then hit or no hit is Math.random*.66 so that its always below .66 and bouncing of the cup and going into another cup isn't an option---it seems ok as the game proceeds this is less likely for both players)

// Add bounce the ball option
// COMPUTER CHOOSES BOUNCE BALL
//   - add to computers turn a condition range that has .2 probability of bouncing and .8 probability of taking a regular shot 
//      IF computer bounces:
//        - Math.floor(Math.random() *5) - generates a number between 1 and 5
//        - Ask to receive user input of a number between 1-5
//            - write a conditional for if player number matches computers number then player smacks the ball out of the way
//            - else run the bounce 
//   - add option for player to choose bounce ball input (laser short OR bounce ball buttons)
//   - create a function for bounced balls
//       - generate a random number for hit or no hit (computer won't smack -- his connectivity is unstable)
//       - set conditions .25 for probability for hit vs .75 probability for miss
//       - if HIT: run bouncing loop that selects cup that runs 2 times      
//       - else "better luck next time"

//Add Reracks
//      - since everything is by IDs i just need to make sure the IDs match up
//      - maybe i'd have the cups already present but ...id have give these cups new numbers and make sure the functions run through arrays with these number but their opacity is set to 0
//      -id have to make sure these are appropriately set up in new game (opacity 0)

//Pull back and center 1 cup - if either hit count is at 9. if the counter is cHits then i would rerack cup, if it was pHits I would rereck pCup

//3 - cup rerack - if either hit counter is at 7

//6 - cup rerack - if either hit counter is at 4


//STRETCH GOAL: Then we animate
//      - focus on ball animation
//      -could animate liquid in cups
//OTHER STUFF:
//      -you can beautify
//            - wood grain table
//            - add ring marks when cups dim