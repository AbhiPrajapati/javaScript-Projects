let min = 1,
    max = 10,
    winningNum = getWinningNo(),
    guessLeft = 3;


const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


minNum.textContent = min;
maxNum.textContent = max;      

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again')
  {
      window.location.reload();
  }
})


guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max)
    {
      setMessage(`Please enter a no between ${min} and ${max}`,'red');
    }


    if(guess === winningNum)
    {
        gameOver(true,`${winningNum} is correct , YOU WIN !!!`);
    }else{
        
        guessLeft -= 1;
        if(guessLeft === 0)
        {
          gameOver(false,`Game Over , you Lost The correct no was ${winningNum}`);
            //Play Again Function 
          guessBtn.value = 'Play Again';
          guessBtn.className += 'play-again';
        }else{
          gameOver(false,`${guess} is not correct , ${guessLeft} guesses Left`);
        }
    }
})


function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
    
}


function gameOver(won , msg)
{
    let color;
    won === true ? color = 'green' : color = "red";
    won === true ? guessInput.disabled = true : guessInput.disabled = false;
    guessInput.style.borderColor = color;
    setMessage(msg,color);


  
}


//winnning no
function getWinningNo()
{
    return Math.floor(Math.random()*(max-min+1)+min);
}