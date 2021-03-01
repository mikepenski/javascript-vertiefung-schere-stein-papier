   document.addEventListener("DOMContentLoaded", function(event) {

    'use strict';

    const buildGame = () => {

    let computerScore = 0;
    let userScore = 0;
    let currentRound = 1;
    let roundsToPlayValue;

    //get buttons for selection and addEventListener for click
    const buttons = document.querySelectorAll('#selection button:not(.link)');
    const randomChoices = ["rock", "paper","scissors"];
    const roundSelectionContainer = document.querySelector(".rounds-selection");

    const markAsWin = (thisButton) => {
      thisButton.classList.add("win");
      setTimeout(function(){
       thisButton.classList.remove("win");
      }, 500);
    }

    const markAsLoose = (thisButton) => {
      thisButton.classList.add("loose");
      setTimeout(function(){
       thisButton.classList.remove("loose");
      }, 500);
    }

    //update score function
    const updateScore = () => {
      const userScoreContainer = document.querySelector('.current-score .user');
      const compScoreContainer = document.querySelector('.current-score .comp');  
      userScoreContainer.innerHTML = userScore;
      compScoreContainer.innerHTML = computerScore;
    };
  

    //compare user and computer choice function
    const compareChoices = (userChoice, compChoice, thisButton) => {
    //Update resultText
    const resultText = document.querySelector(".resultText");

        //Checking for a tie
        if (userChoice === compChoice) {
            resultText.innerHTML = `It was a draw You both choose ${compChoice}`;
          return;
        }
        //Check for Rock
        if (userChoice === "rock") {
          if (compChoice === "scissors") {
            resultText.innerHTML =  `${userChoice}<sup>(user)</sup> beats ${compChoice}<sup>(comp)</sup>. User win!`;
            markAsWin(thisButton);
            userScore++;
            updateScore();
            return;
          } else {
            resultText.innerHTML =  `${compChoice}<sup>(comp)</sup> beats ${userChoice}<sup>(comp)</sup>. Comp win!`;
            computerScore++;
            markAsLoose(thisButton);
            updateScore();
            return;
          }
        }
        //Check for Paper
        if (userChoice === "paper") {
          if (compChoice === "scissors") {
            resultText.innerHTML =  `${compChoice}<sup>(comp)</sup> beats ${userChoice}<sup>(user)</sup>. Comp win!`;
            computerScore++;
            markAsLoose(thisButton);
            updateScore();
            return;
          } else {
            resultText.innerHTML =  `${userChoice}<sup>(user)</sup> beats ${compChoice}<sup>(comp)</sup>. User win!`;
            markAsWin(thisButton);
            userScore++;
            updateScore();
            return;
          }
        }
        //Check for Scissors
        if (userChoice === "scissors") {
          if (compChoice === "rock") {
            resultText.innerHTML =  `${compChoice}<sup>(comp)</sup> beats ${userChoice}<sup>(user)</sup>. Comp win!`;
            computerScore++;
            markAsLoose(thisButton);
            updateScore();
            return;
          } else {
            resultText.innerHTML =  `${userChoice}<sup>(user)</sup> beats ${compChoice}<sup>(comp)</sup>. User win!`;
            markAsWin(thisButton);
            userScore++;
            updateScore();
            return;
          }
        }
      };
    
    buttons.forEach(button => {
      button.addEventListener("click", event => {

          let userChoice = event.target.dataset.value;
          let compChoice = Math.floor(Math.random() * randomChoices.length);
          compChoice = randomChoices[compChoice];
          const resultText = document.querySelector(".resultText");

          let thisButton = event.target;

          //get round inputs and addEventListener for click
          let roundsToPlay = document.querySelectorAll('input');

            for (var i = 0; i < roundsToPlay.length; i++) {
              if (roundsToPlay[i].type === 'radio' && roundsToPlay[i].checked) {
                roundsToPlayValue = roundsToPlay[i].value;       
              }
            }

            if(typeof roundsToPlayValue == "undefined"){
              window.alert("Bitte Rundenanzahl auswählen!");
              return;
            }

        

            if(currentRound < roundsToPlayValue){
              compareChoices(userChoice, compChoice, thisButton);
              roundSelectionContainer.classList.add("current-rounds");
              roundSelectionContainer.innerHTML = currentRound + " / " + roundsToPlayValue;
            }

            if(currentRound == roundsToPlayValue){
              roundSelectionContainer.innerHTML = currentRound + " / " + roundsToPlayValue;

              //disable all buttons
              buttons.forEach(button => {
                button.disabled = true;
              })

              if(userScore < computerScore){
                resultText.innerHTML = '<div class="looser">computer win</div>';
                return
              }
              
              if(userScore > computerScore){
                resultText.innerHTML = '<div class="winner">you win</div>';
                return
              }

              if(userScore == computerScore){
                resultText.innerHTML = '<div class="drawn">it was a draw!</div>';
                return
              }
              
            
            }

            currentRound++;

      })
      
    });


    }

    buildGame();

  
  });


