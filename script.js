fetch("liste.txt")
.then(response => response.text())
.then(data => {
    var wordList = data.split("\n")
    var randomIndex = Math.floor(Math.random() * wordList.length)
    const wordToGuess = wordList[randomIndex]
    wordLength = wordToGuess.length;
    var hiddenWord = "";
    for(var i = 0 ; i < wordLength ; i++)
        {
            hiddenWord += "_"
        }
        
        document.getElementById("word").innerHTML = hiddenWord
        
        var guessInput = document.getElementById("guess")
        var submitButton = document.getElementById("submit")
        var result = document.getElementById("result")
        var link = document.getElementById("link")
        var playedLetters = []; // Array to store played letters
        
        submitButton.onclick = function(){
            var guess = guessInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            var wordToGuessNormalized = wordToGuess.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if(playedLetters.includes(guess)){
                result.innerHTML = "Vous avez déjà joué cette lettre!";
            } else if(guess.length > 1 && guess.length !== wordLength){
                result.innerHTML = "Vous devez entrer une lettre à la fois ou le mot entier!";
            } else if(guess.length === wordLength){
                // User is trying to guess the entire word
                if(guess === wordToGuessNormalized){
                    result.innerHTML = "Bravo, tu as trouvé le mot!";
                    document.getElementById("word").innerHTML = wordToGuess; // Display entire word
                    guessInput.style.display = "none";
                    submitButton.style.display = "none";
                    link.style.display = "block";
                } else {
                    result.innerHTML = "Mauvaise réponse"; // Display error message if entire word is incorrect
                }
            } else if(guess.length === 0){
                result.innerHTML = "Entrez une lettre";
            } else {
                playedLetters.push(guess); // Add letter to played letters array
                var matches = [];
                for(var i = 0; i < wordLength; i++){
                    if(wordToGuess[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === guess){
                        matches.push(wordToGuess[i]);
                    }
                }
                if(matches.length === 0){
                    result.innerHTML = "Mauvaise lettre";
                } else {
                    for(var i = 0; i < wordLength; i++){
                        if(matches.includes(wordToGuess[i])){
                            hiddenWord = hiddenWord.substr(0, i) + wordToGuess[i] + hiddenWord.substr(i + 1)
                        }
                    }
                    document.getElementById("word").innerHTML = hiddenWord;
                    
                    if(hiddenWord === wordToGuess){
                        result.innerHTML = "Bravo, tu as trouvé le mot!";
                        document.getElementById("word").innerHTML = wordToGuess; // Display entire word
                        guessInput.style.display = "none";
                        submitButton.style.display = "none";
                        link.style.display = "block";
                    } else {
                        result.innerHTML = "Bonne lettre!";
                    }
                }
            }
            guessInput.value = ""
        }
        
        // Add event listener for Enter key press
        guessInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                submitButton.click();
            }
        });
    })