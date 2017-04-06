var instruct=document.querySelectorAll(".instruct");
var p5=document.querySelector("#p5");
var win=document.querySelector("#win");
var gameboard=document.querySelector(".board");
var playBtn=document.querySelector("#playBtn");
var quitBtn=document.querySelector("#quitBtn");
var guessInput=document.querySelector("#guess");
var error=document.querySelector("#error");
var guessBtn=document.querySelector("#guessBtn");
var solveBtn=document.querySelector("#solveBtn");
var hintPara=document.querySelector("#hint");

//Create global varialbes
var guess, currentPhrase, atIndex, refLength;

/*  Build multi-diminsional array object of five game play sets  */
var phrases={
  phrase1:{
    phrase: "Fair Weather Friend",
    hint: "Someone that leaves during storms."
  },
  phrase2:{
    phrase: "When Pigs Fly",
    hint: "You'll be waiting a long time."
  },
  phrase3:{
    phrase: "Kiss My Grits",
    hint: "Pucker up for this southern dish at Mel's diner."
  },
  phrase4:{
    phrase: "Winning",
    hint: "Charlie Sheen claims he does it."
  },
  phrase5:{
    phrase: "What Happens in Vegas Stays in Vegas",
    hint:	"Your secrets are safe here."
  }
}

//  Add instruction paragraph animation.
function instructions(){
  var pID;
  var num=0;
  for(var count=0; count<instruct.length; count++){
    num=num+=1;
    pID="p"+num;
    instruct[count].classList.add(pID);
  }
}

//  New game play set created
function generatePuzzle(puzzle, hint){
  //create new array per word in phrase
  var words= puzzle.split(" ");
  for (count=0; count<words.length; count++){
    var wordID="word"+Number(count+1)
    //create div elements per word in phrase
    var e=document.createElement("div");
    e.setAttribute("id", wordID);
    e.setAttribute("class", "word");
    gameboard.appendChild(e);
    //create span elements per letter in word
    var word=words[count];
    var letters=word.split("");
    var wordDiv=document.querySelector("#"+wordID)
    for (count2=0; count2<letters.length; count2++){
      e=document.createElement("span");
      var theLetter=letters[count2];
      var theLetterUpper=theLetter.toUpperCase();
      e.setAttribute("class", "letters "+theLetterUpper);
      e.innerHTML=theLetter;
      wordDiv.appendChild(e);
    }
  }
  hintPara.innerHTML=hint;
  //Display gameboard fields
  guessInput.style.visibility="visible";
  guessBtn.style.visibility="visible";
  solveBtn.style.visibility="visible";
  hintPara.style.visibility="visible";
  return words.length;
}

//  format user input to uppercase
function formatGuess(){
  guess=guessInput.value;
  guess=guess.toUpperCase();
}

function setAlert(msg, btn){
  error.innerHTML=msg;
  error.classList.add("errorAlert");
  guessInput.classList.add("errorAlert");
  if (btn=="guessBtn"){
    solveBtn.style.visibility="hidden";
  }
  else{
    guessBtn.style.visibility="hidden";
  }
}

function clearAlert(){
  error.innerHTML="";
  error.classList.remove("errorAlert");
  guessInput.classList.remove("errorAlert");
  guessInput.value="";
}

/*  Change button value, style and add animation on wrong guess.  Don't allow user to solve. */
function badGuess(){
  guessBtn.style.color="red";
  guessBtn.classList.add("wrong");
  guessBtn.innerHTML="Guess Again"
  solveBtn.style.visibility="hidden";
}

/*  Change button value and style on next guess after bad guess.  Allow user to solve. */
function goodGuess(){
  guessBtn.style.color="black";
  guessBtn.innerHTML="Guess";
  solveBtn.style.visibility="visible";
}

/*  deletes html elements in gameboard to reset for next game play set */
function removePuzzle(refLength){
  for (var count=0; count<refLength; count++){
    var wordID="word"+Number(count+1);
    var wordDiv=document.querySelector("#"+wordID)
    gameboard.removeChild(wordDiv);
  }
}

function revealLetter(btn, guess, solved){
  //  Go here if call is from guess button
  if (btn=="guessBtn"){
    //  Test length to see if there are any letter matches
    var letterTile=document.querySelectorAll("."+guess);
    if (letterTile.length==0){
      badGuess();
    }
    else{
      //  Reveal letters if  there are matches
      for(count=0; count<letterTile.length; count++){
        letterTile[count].classList.add("reveal");
        goodGuess();
      }
    }
  }
  //  Go here if call is from solve button
  else{
    //  Find all letters
    var letterTile=document.querySelectorAll(".letters");
    //  Reveal All Letters on Solve and add event listener
    if(solved=="true"){
      var setClass="solve";
    }
    else{
      var setClass="lose";
    }
    //  Reveal All Letters on Solve and add event listener
    for(count=0; count<letterTile.length; count++){
      letterTile[count].classList.add(setClass);
      //  Reset animation after event so it will fire again.
      letterTile[count].addEventListener("animationend", function(event){
        event.target.classList.remove(setClass);
      })
    }
  }
  //  Clear last guess and return
  guess="";
  return guess;
}

playBtn.addEventListener("click", function(){
  /* Reset Guess button when cycling through game sets in case Play button is clicked when last guess was wrong  */
  goodGuess();
  /* Clear alert when cycling through game sets in case Play button is clicked when last guess input not formatted correctly  */
  clearAlert();
  var phrasesLength=Object.keys(phrases);
  phrasesLength=phrasesLength.length;

  if (currentPhrase=="" || currentPhrase===undefined){
    atIndex=1;
    currentPhrase="phrases.phrase"+atIndex;
  }
  else{
    atIndex+=1;
    if (atIndex<=phrasesLength){
      currentPhrase="phrases.phrase"+atIndex;
    }
    else{
      atIndex=1;
      currentPhrase="phrases.phrase"+atIndex;
    }
    removePuzzle(refLength);
  }
  var puzzle=currentPhrase+".phrase";
  puzzle=eval(puzzle);
  console.log("puzzle- "+puzzle);
  var hint=currentPhrase+".hint";
  hint=eval(hint);
  console.log("hint- "+hint);
  refLength=generatePuzzle(puzzle, hint);
  return currentPhrase, atIndex;
})

//  Close tab.  Not IE compatible
quitBtn.addEventListener("click", function(){
  self.close();
})

guessBtn.addEventListener("click", function(){
  var evtID=event.target.id;
  formatGuess();
  var regExp=/^[a-z]$/i;
//  Test if input is in correct format
  if(regExp.test(guess)!=true || guess.length!=1){
    //  Display error alert
    var alertMsg="Please enter single letter only.";
    setAlert(alertMsg, evtID);
  }
  else{
    /*  revealetter will test for actual match and flip over all matching letters and offer user opportunity to solve  */
    revealLetter(evtID, guess);
    clearAlert();
  }
  return guess;
})

solveBtn.addEventListener("click", function(){
  var evtID=event.target.id;
  formatGuess();
  //  Get and format game play set phrase.
  var puzzlePhrase=currentPhrase+".phrase";
  puzzlePhrase=eval(puzzlePhrase);
  puzzlePhrase=puzzlePhrase.toUpperCase();
  console.log("puzzlePhrase- "+puzzlePhrase);

  var regExp=/[a-z\s]/i;
//  Test if input is in correct format
  console.log("test- "+regExp.test(guess));
  console.log("len- "+guess.length);
  if(regExp.test(guess)!=true || guess.length<1){
    //  Display error alert
    var alertMsg="Please enter the phrase to solve.";
    setAlert(alertMsg, evtID);
  }
  else{
    clearAlert();
    //  Test if guess mathes phrase
    if(puzzlePhrase==guess){
      revealLetter(evtID, guess, "true");
      win.play();
      guessInput.style.visibility="hidden";
      guessBtn.style.visibility="hidden";
      solveBtn.style.visibility="hidden";
      hintPara.style.visibility="hidden";
    }
    else{
      lose.play();
      revealLetter(evtID, guess, "false");
      guessInput.style.visibility="hidden";
      guessBtn.style.visibility="hidden";
      solveBtn.style.visibility="hidden";
      hintPara.style.visibility="hidden";
    }
}
  return guess;
})

//Once instructions are done show Play button
p5.addEventListener("animationend", function(event){
  playBtn.style.visibility="visible";
})

//  Reset animation after event so it will fire again.
guessBtn.addEventListener("animationend", function(event){
  guessBtn.classList.remove("wrong");
})


//  Launch start of game.
instructions();
