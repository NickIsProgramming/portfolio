window.addEventListener("keydown", (e) => {
  if(waitingForKey){
    waitingForKey = false;
    startMsg.classList.add("hidden");
    // Hide overlay completely to see canvas
    overlay.style.display = "none";  
    startGame();
  } else if(!running){
    // Game over restart
    overlay.style.display = "none";
    gameMsg.classList.add("hidden");
    startGame();
  } else {
    changeDirection(e);
  }
});

function checkGameOver(){
  const head = snake[0];
  if(head.x<0||head.x>=width||head.y<0||head.y>=height||snake.slice(1).some(s=>s.x===head.x && s.y===head.y)){
    running=false;
    gameOverSound.play();
    clearInterval(gameLoopInterval);

    // Show overlay with message
    overlay.style.display = "flex";
    gameMsg.classList.remove("hidden");
    waitingForKey = true;

    if(score>highScore){
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
    }
    highScoreText.textContent="High Score: "+highScore;
  }
}
