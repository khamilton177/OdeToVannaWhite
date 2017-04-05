var instruct=document.querySelectorAll(".instruct");
var gameboard=document.querySelector(".board");
var playBtn=document.querySelector("#play");
var quitBtn=document.querySelector("#quit");
var guessInput=document.querySelector("#guess");
var error=document.querySelector("#error");
var guessBtn=document.querySelector("#guessBtn");
var solveBtn=document.querySelector("#solveBtn");
var hint=document.querySelector("#hint");

//Create global varialbes
var currentPhrase, atIndex, refLength;

//  Build multi-diminsional array object of five game plays
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
      e.setAttribute("class", "letters "+theLetter);
      e.innerHTML=theLetter;
      wordDiv.appendChild(e);
    }
  }
  hint.innerHTML=hint;
  return words.length;
}

//  deleteshtml elements in gameboard
function removePuzzle(refLength){
  for (var count=0; count<refLength; count++){
    var wordID="word"+Number(count+1);
    var wordDiv=document.querySelector("#"+wordID)
    gameboard.removeChild(wordDiv);
  }
}

function revealLetter(guess){
  var letterTile=document.querySelectorAll("."+guess);
  for(count=0; count<letterTile.length; count++){
    letterTile[count].classList.add("reveal");
  }
}

playBtn.addEventListener("click", function(){
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
  console.log("currentPhrase- "+currentPhrase);
  var puzzle=currentPhrase+".phrase";
  puzzle=eval(puzzle);
  var hint=currentPhrase+".hint";
  hint=eval(hint);
  refLength=generatePuzzle(puzzle, hint);
  return currentPhrase, atIndex;
})

quitBtn.addEventListener("click", function(){
  self.close();
})

guessBtn.addEventListener("click", function(){
  var guess=guessInput.value;
  console.log("The guess "+guess);

  var regExp=/^[a-z]$/i;
  if(regExp.test(guess)!=true || guess.length!=1){
    error.innerHTML="Please enter single letter only.";
  }
  else{
    /*  flip over all matching letters and offer user opportunity to solve  */
    guessInput.value="";
    revealLetter(guess);
  }
  return guess;
})

solveBtn.addEventListener("click", function(){
  var guess=guessInput.value;
  guess=guess.toUpperCase();
  console.log("The guess "+guess);

  var puzzlePhrase=currentPhrase+".phrase";
  puzzlePhrase=eval(puzzlePhrase);
  puzzlePhrase=puzzlePhrase.toUpperCase();
  console.log("puzzlePhrase- "+puzzlePhrase);

  if(puzzlePhrase.includes(guess)){
    alert("you won");
  }
  return guess;
})
