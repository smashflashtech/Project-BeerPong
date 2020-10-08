
const aText = document.querySelector("p")
console.log(aText)
let delayInMilliseconds = 5000;
setTimeout(function() {
}, delayInMilliseconds);


const beerPong = {
  pHits: 0,      //CREATE HIT COUNTERS:
  cHits: 0,
  turnCounter: 1,
  whosTurn: function () {                               //CREATE A FUNCTION: There needes to be a function that decides who's turn it is
  if(this.pHits === 10){
    aText.innerHTML = "YOU WIN!!! The computer rebooted in a bush and now it's motherboard is fried!"
  } else if (this.cHits ===10) {
    aText.innerHTML = "You lose. Better luck next time. Is that your phone at the bottom of the swimming pool?"
  } else { //this conditional needs fixing//we dont need a conditional
    if (this.turnCounter %2 !== 0) {                    //within the who's turn i should have a conditional that checks the hit score to determine whether or not to continue running
    this.playersTurn()
  } else {
    this.cpusTurn()
  }
} 
},
  ballDoesWhat: function (lowerCaseLetter, targetCupId) {
    this.turnCounter = this.turnCounter + 1                                                            
    let hitOrNoHit = Math.random()
//    let aText = document.querySelector("p")
    //FIRST CONSEQUENCE - MISS
    if (hitOrNoHit <=.33) {
      aText.innerHTML = "Miss!" 
      
      // SECOND CONSEQUENCE - HIT                                             //nothing else happens, move on to the next turn
    } else if (hitOrNoHit >= .34 && hitOrNoHit <= .66) {
      aText.innerHTML = "Check out that laser shot! It's a hit!<span id='ok'>[CLICK OK]</span>" //come back here
      document.getElementById("ok").addEventListener("click", function(evtObj) {
      beerPong.whosTurn()
      })
      let target = document.getElementById(targetCupId)                       //HIT targetCupID - it should grab the element with id = "lowerCaseLetter(targetCupID)" // the player will never select anything that is false..because i should have turned that event listener off, so what i should do is have the computer evaluation of value in the computers turn function
      target.setAttribute("style", "opacity:0")                                                            //Make the cup disappear
      target.setAttribute("value", "non-playable")                                                         //change its value to false
      if(lowerCaseLetter === "p") {
        this.pHits = this.pHits + 1 
      } else if (lowerCaseLetter === "c") {
        this.cHits =this.cHits + 1
      }
      
      //THIRD CONSEQUENCE - BOUNCE OFF AND HIT
    } else if (hitOrNoHit >= .67 && hitOrNoHit <= 1 ) {
      let targetOtherCup = ""
      if(lowerCaseLetter === "p") {
        const playerIdArray=["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"] 
        for (i = 0 ; i < playerIdArray.length; i++){
          let checkValue = document.getElementById(playerIdArray[i]).getAttribute("value") 
          if(checkValue === "playable") {                             
            targetOtherCup = playerIdArray[i]
          }
        }
        console.log("logged a p-change-target: " + targetOtherCup)                                                                  
        let grabOtherCupHit = document.getElementById(targetOtherCup)                                    
        grabOtherCupHit.setAttribute("value", "non-playable")
        grabOtherCupHit.setAttribute("style", "opacity:0")                                                               
        this.pHits = this.pHits + 1                       
      } else if(lowerCaseLetter === "c") {
        const cpuIdArray=["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"] 
        for (i = 0 ; i < cpuIdArray.length; i++){
          let checkValue = document.getElementById(cpuIdArray[i]).getAttribute("value") 
          if(checkValue === "playable") {                             
            targetOtherCup = cpuIdArray[i]
          }
        }
        console.log("logged a c-change-target: " + targetOtherCup)                                                                  
        let grabOtherCupHit = document.getElementById(targetOtherCup)                                    
        grabOtherCupHit.setAttribute("value", "non-playable")
        grabOtherCupHit.setAttribute("style", "opacity:0")
        this.cHits =this.cHits + 1                                       
      }
    aText.innerHTML = "OoOo, it bounced off the target and sank into another cup!!<span id='ok'>[CLICK OK]</span>"
    document.getElementById("ok").addEventListener("click", function(evtObj) {
    beerPong.whosTurn()
    })
    }
  },
  playersTurn: function () { //UNFINISHED FUNCTION
    let changeCpuBallOpacity = document.getElementById("cBall")                                             // Dims computer Ball
    changeCpuBallOpacity.setAttribute("style", "opacity:0")
    let changeYourTurnOpacity = document.getElementById("yTurn")                                           //Undims player ball/your turn
        changeYourTurnOpacity.setAttribute("style", "opacity:1")
    let hoverEffectsBall = document.getElementById("player-watercup").setAttribute("class", "watercup wash")
    for (let i = 1; i <=10; i++){                                                                           //I want to add a for loop that adds the class for hover effects
      let getCup = document.getElementById(`p${i}`).setAttribute("class", "cup pick")
    }
    let playerBall = document.getElementById("pBall")
    let playerWaterCup = document.getElementById("player-watercup")
    playerWaterCup.addEventListener("click", function(eventObject) {
        playerBall.setAttribute("style", "opacity:1")          //I need a wash ball function.. i guess we can do a value of wash/unwash and have the function wash on click
        playerBall.setAttribute("value", "washed")  
      })
    let cpuSideCups = document.getElementById("cSide")//i need to add an event listener to click on any of the cups on the computer side but not the section part its in (so the partent)) Need to look at that lab about bluuets.
    let playersChosenTargetId = ""
    //console.log(cpuSideCups)
    cpuSideCups.addEventListener("click", function(evtObj) {
      if(evtObj.target.tagName === "DIV"){
        if(playerBall.getAttribute("value") === "unwashed") {
          let aText = document.querySelector("p")
          aText.innerHTML = "PUBLIC SERVICE ANNOUNCEMENT: Don't forget to wash your balls." 
        } else if (playerBall.getAttribute("value") === "washed") {
          playersChosenTargetId = evtObj.target.getAttribute("id")
          console.log(playersChosenTargetId)
          aText.innerHTML = "Let's see what happens! <span id='ok'>CLICK OK</span>"
          document.getElementById("ok").addEventListener("click", function(evtObj) {
          beerPong.ballDoesWhat("p", playersChosenTargetId)
        })
        }
      }
    })
  },

  cpusTurn: function () {
    let changePlayerBallOpacity = document.getElementById("pBall") //Dims player ball/your turn
        changePlayerBallOpacity.setAttribute("style", "opacity:0")
    let changeCpuBallOpacity = document.getElementById("cBall") // undims computer ball
        changeCpuBallOpacity.setAttribute("style", "opacity:1")    
        //console.log(changeBallOpacity) //this worked
    for (let z = 1; z <=10; z++){ //This turns off player hover effects
    let getCup = document.getElementById(`p${z}`).setAttribute("class", "cup")
    }
    const cpuOptions = ["c6", "c4", "c8", "c10", "c1", "c9", "c7", "c2", "c3", "c5"] //lets just gerry ring this
    for (let i = 0; i < cpuOptions.length; i++) { //shuffle the array //this loops through the array and changes the value of each element index at least once. 
      // let j = Math.floor(Math.random() * cpuOptions.length);   //this creates a random ratio between 0-1 and multiples that ratio by the array length, then rounds that product down--representing a value that is within the index range
      // let temp = cpuOptions[i];                                //this is a temporary variable that contains the the value that was in the index that the current iterator is accessing
      // cpuOptions[i] = cpuOptions[j];                            //this changes the current index that the iterator has access to the value that occupied index j
      // cpuOptions[j] = temp;   
//      console.log(cpuOptions)//this works
    }
    let cpusChosenTargetId = ""
    for (let k = 0; k < cpuOptions.length; k++){               //this is going to loop through all the items in the array and evalure the value
          //      console.log(computerTarget)//this works
          let checkValue = document.getElementById(cpuOptions[k]).getAttribute("value")         //check if this value is still in play; i need a while loop to run until it returns true
//                console.log(checkValue)// this works
//                console.log(cpuOptions[k]) // this works
          if(checkValue === "playable") {                             ///got help because it wasnt working; changed the boolean true to the string true. facepalm
            cpusChosenTargetId = cpuOptions[k]                        //this declares the variable computer target as a variable and stores the most recent ID that evaluated true in this variable; 
//            console.log("this is it: ", cpusChosenTargetId)//this work
          }
      }
      console.log("computer initial choice: ", cpusChosenTargetId)
      aText.innerHTML = "The computer takes a shot! Let's see what happens! <span id='ok'>[CLICK OK]</span>"
      document.getElementById("ok").addEventListener("click", function(evtObj) {
        beerPong.ballDoesWhat("c", cpusChosenTargetId)
      }) 
  },
} //!!!!! dont comment out this one !!!!! this is the end of the object container

//beerPong.ballDoesWhat("c", "c8")
//beerPong.playersTurn()
//beerPong.cpusTurn()
document.getElementById("start").addEventListener("click", function(eventObject){
  beerPong.whosTurn()
})
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
//       let aText = document.querySelector("p")
//       aText.innerHTML = "PUBLIC SERVICE ANNOUNCEMENT: Don't forget to wash your balls." 
//     } else if (playerBall.getAttribute("value") === "washed") {
//       let playersChosenTargetId = evtObj.target.getAttribute("id")
//       beerPong.ballDoesWhat("p", playersChosenTargetId)
//     }
//   }
// }
//    cpuSideCups.addEventListener("click", getPlayerTarget)
//    cpuSideCups.removeEventListener("click", getPlayerTarget)



//Empty OK button event listener

// aText.innerHTML = "The computer takes a shot! Let's see what happens! <span id='ok'>[CLICK OK]</span>"
// document.getElementById("ok").addEventListener("click", function(evtObj) {
  
// }) 
//NOTES WITH JAMES
// player clicks ok
// whosTurn runs


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