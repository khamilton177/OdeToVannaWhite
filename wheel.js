var instruct=document.querySelectorAll(".instruct");
var gameboard=document.querySelector(".board");
var playBtn=document.querySelector("#play");
var quitBtn=document.querySelector("#quit");
var guessInput=document.querySelector("#guess");
var guessBtn=document.querySelector("#guessBtn");
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
    hint: "Pucker up for this menu item at Mel's diner."
  },
  phrase4:{
    phrase: "Winning",
    hint: "Charlie Sheen does it."
  },
  phrase5:{
    phrase: "What Happens in Vegas Stays in Vegas",
    hint:	"Your secrets are kept here."
  }
}

function generatePuzzle(puzzle, hint){
  //create new array per word in phrase
  var words= puzzle.split(" ");
  // console.log(words.length);
  for (count=0; count<words.length; count++){
    var wordID="word"+Number(count+1)
    //create a div elements per word in phrase
    var e=document.createElement("div");
    e.setAttribute("id", wordID);
    e.setAttribute("class", "word");
    gameboard.appendChild(e);
    //create a div elements per word in phrase
    var word=words[count];
    var letters=word.split("");
    var wordDiv=document.querySelector("#"+wordID)
    for (count2=0; count2<letters.length; count2++){
      e=document.createElement("span");
      e.setAttribute("class", "letters");
      e.innerHTML=letters[count2];
      wordDiv.appendChild(e);
    }
  }
  hint.innerHTML=hint;
  return words.length;
}

function removePuzzle(refLength){
  for (var count=0; count<refLength; count++){
    var wordID="word"+Number(count+1);
    var wordDiv=document.querySelector("#"+wordID)
    gameboard.removeChild(wordDiv);
  }
}

playBtn.addEventListener("click", function(){
  // console.log("currentPhrase "+currentPhrase);
  var phrasesLength=Object.keys(phrases);
  phrasesLength=phrasesLength.length;
  // console.log("phrasesLength "+phrasesLength);

  if (currentPhrase=="" || currentPhrase===undefined){
    atIndex=1;
    currentPhrase="phrases.phrase"+atIndex;
    // console.log("currentPhrase- "+currentPhrase);
  }
  else{
    atIndex+=1;
    if (atIndex<=phrasesLength){
      currentPhrase="phrases.phrase"+atIndex;
      // console.log("currentPhrase- "+currentPhrase);
    }
    else{
      atIndex=1;
      currentPhrase="phrases.phrase"+atIndex;
      // console.log("currentPhrase- "+currentPhrase);
    }
    removePuzzle(refLength);
  }
  console.log("currentPhrase- "+currentPhrase);
  var puzzle=currentPhrase+".phrase";
  puzzle=eval(puzzle);
  // console.log("puzzle- "+puzzle);
  var hint=currentPhrase+".hint";
  hint=eval(hint);
  // console.log("hint- "+hint);
  refLength=generatePuzzle(puzzle, hint);
  // console.log("refLength- "+refLength);
  return currentPhrase, atIndex;
})

quitBtn.addEventListener("click", function(){
  self.close();
})

guessBtn.addEventListener("click", function(){
  var guess=guessInput.value;
  // console.log("The guess "+guess);
  return guess;
})
