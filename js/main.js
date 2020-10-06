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

//START HERE//

//CREATE HIT COUNTERS:
let playerHits = 0
let cpuHits = 0
//CREATE A FUNCTION: There needes to be a function that decides who's turn it is

//COMPUTERS TURN - when its computers turn toggle opacity of ball in water cup to 1
// - ** cpuHitorNoHit() - First I need to determine if the cup is: 
//    generated a computeHitOrNoHit value using Math.random()
//compare that value with conditions:
//    1)MISS - if this then the function ends and i t becomes the next players turn
//       if hitOrNoHit is <=.33
//    2)HIT - if this then u run the cpuTakesOutTarget() 
//       if hitOrNoHit is >=.34 && <=.66
//    3)BOUNCES OFF CUP AND LANDS IN ANOTHER CUP - this would just display alternative alert text--but it would still run the cpuTakesOutTarget function since the player doesn't know what cup the computer was originally aiming for anyway.
//       ifHitOrNoHit is >=.67 && <=1 

//  - ** cpuTakesOutTarget() - The computer selects a target; let targetPlayerCup = Math.Floor(Math.Random()*10) --this keeps the number generated below 10
//          - I need to access the cup with that number...so i need to access the document.getElementbyID()`p${targetPlayerCup}`)
//          -I need to evaluate if the value is true or false
//          -If it is true, then that cup's:
//                  - value set false
//                  -opacity is set to 0

// - ** dimTheLastTrue() - I need to create a loop that goes backwards from 10 and evaluates the value of each id (p10-p1). 
//                    - The first element the comes back true will result in:
//                             - opacity set to 0
//                             - the value changing to false.


//PLAYERS TURN - When its the player turn, toggle opacity for ball to 1
// - Player must click on the water cup to begin their turn (!== watercup click will result in a prompt "dont for get to wash yoru balls")
//          -  clicking on watercup with open up access to choose a target
//          - hover over the any cup that is "true" and opacity "1" will result in some form of highlighting--color change, light shadow
//      ** CREATE AN EVENT LISTENER FOR HOVERING
//          - clicking on the cup will:
//      ** CREATE AN EVENT LISTENER FOR CLICKING A CUP
//            [A] grab the element with id of the eventobject that was clicked and store it in a variable called inputFromPlayer; or would this be the eventObject.target?
//            [B] open a modal with two options
//                    PROMPT: What kind of shot did you take?
//                        1) Button - Laser Shot - if this run didPlayerHit()
//                        2) Button - Bounce

// ** playerhitOrNoHit()
//  is called on - playerHitorNoHit = Math.random()
// compare that value with conditions:
//    1)MISS - if this then the function ends and i t becomes the next players turn
//       if hitOrNoHit is <=.33
//    2)HIT - if this then u run the playerTakesOutTarget() 
//       if hitOrNoHit is >=.34 && <=.66
//        - this probably is really similar to cpuTakesOutTarget except the ID is c1-10 not p1-10
//    3)BOUNCES OFF CUP AND LANDS IN ANOTHER CUP - 
//       ifHitOrNoHit is >=.67 && <=1 
//          - this would result in some function dimFirstCup
//          - grab he first cup that has a value of "true"
//                    1) change its value to false
//                    2) set opacity to 0

//END THE GAME
//The only thing that renders the game over now is if all of the values are false on c#'s pr p#'s
//I could add a hit counter for the CPU and Player
//The counter should run at the start of the turn calculator
//10 hits results in a game over
//CONDITIONS
// 1) so if the playerHits or cpuHits is not equal to 10 then run the turn determiner
// 2) if the cpuHits === 10 then pop up modal that has a goofy message "CPU wins"
// 3) if the playerHits === 10 then pop up a modal that has a goofy message "player wins"


//add New Game Button
// CREATE A FUNCTION to 
//  - set all opacities to 1 
//  - set all values to true
//  - set cpuHits to 0
//  - set Player Hits to 0
