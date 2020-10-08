
const text = document.querySelector("p")
let playerBall = document.getElementById("pBall")
let playerWaterCup = document.getElementById("player-watercup")
let changeYourTurnOpacity = document.getElementById("yTurn") 
let cpuSideCups = document.getElementById("cSide")
//need to declare event listener function for balls up here
//or within the object 
const washBall = (eventObject) => { 
  playerBall.setAttribute("style", "opacity:1")          
  playerBall.setAttribute("value", "washed")  
}
const pClicksTarget = (evtObj) => {        
  if(evtObj.target.tagName === "DIV"){                          //listens only to cups not to blank space
    if(playerBall.getAttribute("value") === "unwashed") {       //TELLS YO IF THE BALLS ARE DIRTY
      let text = document.querySelector("p")
      text.innerHTML = "<span class='psa'>PUBLIC SERVICE ANNOUNCEMENT:</span> Don't forget to wash your balls." 
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
}

const beerPong = {
  pHits: 0,
  cHits: 0,
  turnCounter: 1,
  //THIS FUNCTION DETERMINES:
  // -If the game should keep running
  // -Who's turn is it Player (Odds) or Computer (evens)
  whosTurn: function () {                               
  if(this.pHits === 10){
    text.innerHTML = "YOU WIN!!! The computer rebooted in a bush and now it's motherboard is fried!"
  } else if (this.cHits ===10) {
    text.innerHTML = "You lose. Better luck next time. Is that your phone at the bottom of the swimming pool?"
  } else { 
    if (this.turnCounter %2 !== 0) {
    this.playersTurn()
  } else {
    this.cpusTurn()
  }
} 
},
// THIS FUNCTION DETERMINES WHAT THE BALL DOES (3 POSSIBLE OUTCOMES)
ball: function (lowerCaseLetter, targetCupId) {
    let cBallOpacity = document.getElementById("cBall") //DIMS COMPUTER BALL                                          
    cBallOpacity.setAttribute("style", "opacity:0")   
    playerWaterCup.removeEventListener("click", washBall)    //TURNS OFF EVENT LISTENER
    cpuSideCups.removeEventListener("click", pClicksTarget)  //TURNS OFF EVENT LISTENER
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
    playerWaterCup.addEventListener("click", washBall)    //LISTENS FOR CLICKS TO WASH THE BALL
    let playersTargetId = ""
    cpuSideCups.addEventListener("click", pClicksTarget)  //LISTENS FOR CLICKS FOR THE TARGET )
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

document.getElementById("start").addEventListener("click", function(eventObject){  //START BUTTON
  beerPong.whosTurn()
})
//beerPong.ball("c", "c8")
//beerPong.playersTurn()
//beerPong.cpusTurn()

//-----------------------------------------[SCRATCH PAD AREA]------------------------------------------------------------------------------------

  //         const options = [`${lowerCaseLetter}1`, `${lowerCaseLetter}2`, `${lowerCaseLetter}3`, `${lowerCaseLetter}4`, `${lowerCaseLetter}5`, `${lowerCaseLetter}6`, `${lowerCaseLetter}7`, `${lowerCaseLetter}8`, `${lowerCaseLetter}9`, `${lowerCaseLetter}10`]   //BOUNCES OFF CUP AND LANDS IN ANOTHER CUP, lets take out the last cup that comes up playable
  //         for (i = 0 ; i < options.length; i++){
  //           let checkValue = document.getElementById(options[i]).getAttribute("value")        
  // //        console.log(checkValue)// this works
  // //        console.log(options[i])// this works
  //           if(checkValue === "playable") {                             
  //             let targetOtherCup = options[i]                                                                   //this is going to store the ID of late element iterated through that was "playable"
  //   //        console.log("this is the value:", targetOtherCup)this works
  //             let grabOtherCupHit = document.getElementById(targetOtherCup)                                     //I need to grab this element by the id stored in targetOtherCup
  //             grabOtherCupHit.setAttribute("value", "non-playable")
  //             grabOtherCupHit.setAttribute("style", "opacity:0")
  //             if(lowerCaseLetter === "p") {                                                                     //adds one to the hit counter.
  //               this.pHits = this.pHits + 1 
  //             } else if (lowerCaseLetter === "c") {
  //               this.cHits =this.cHits +1
  //             }                                       
  //             this.turnCounter = this.turnCounter + 1                                                             //add one to the turncounter
  //             this.whosTurn()  
  //           }
  //         }


//EVENT LISTENER SCRATCH

// const getPlayerTarget = function (evtObj) {
//   if(evtObj.target.tagName === "DIV"){
//     if(playerBall.getAttribute("value") === "unwashed") {
//       let text = document.querySelector("p")
//       text.innerHTML = "PUBLIC SERVICE ANNOUNCEMENT: Don't forget to wash your balls." 
//     } else if (playerBall.getAttribute("value") === "washed") {
//       let playersTargetId = evtObj.target.getAttribute("id")
//       beerPong.ball("p", playersTargetId)
//     }
//   }
// }
//    cpuSideCups.addEventListener("click", getPlayerTarget)
//    cpuSideCups.removeEventListener("click", getPlayerTarget)



//Empty OK button event listener

// text.innerHTML = "The computer takes a shot! Let's see what happens! <span id='ok'>[CLICK OK]</span>"
// document.getElementById("ok").addEventListener("click", function(evtObj) {
  
// }) 
//NOTES WITH JAMES
// player clicks ok
// whosTurn runs

// playerWaterCup.removeEventListener("click", washBall)    //TURNS OFF EVENT LISTENER
// cpuSideCups.removeEventListener("click", pClicksTarget)  //TURNS OFF EVENT LISTENER
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//[REMAINING TO DO STUFF]

//add New Game Button - maybe this is always present
// CREATE A FUNCTION to 
//  - set all opacities to 1 
//  - set all values to true
//  - set cpuHits to 0
//  - set Player Hits to 0
// 




//THINGS TO DO
//First we will target just for chance of targeting one cup at a time
//THEN - if time permitting we will do a bounce option
//     - then if time permitting we can consider adding a hit/miss option for bounces
//then we can add re-racking
//      -six cups
//      -three-cups
//      -one-cup
//STRETCH GOAL: Then we animate
//      - focus on ball animation
//      -could animate liquid in cups
//OTHER STUFF:
//      -you can beautify
//            - wood grain table
//            - add ring marks when cups dim