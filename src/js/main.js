window.onload = function() {
  const canvas = document.getElementById("game-canvas");
  const context = canvas.getContext("2d");

  const player = new Player(10, 10);
  const food = new Food();
  food.move();

  document.addEventListener("keydown", keyPush.bind(this, player));
  
  const gameSpeed = 10;
  setInterval(gameLoop.bind(this, canvas, context, player, food), 1000/gameSpeed);
};

function keyPush(player, event) {
  switch(event.keyCode) {
    case 37:
      player.direction = player.directions.LEFT;
      break;
    case 38:
      player.direction = player.directions.UP;
      break;
    case 39:
      player.direction = player.directions.RIGHT;
      break;
    case 40:
      player.direction = player.directions.DOWN;
      break;
  }
}

function gameLoop(canvas, context, player, food) {
  context.fillStyle="black";
  context.fillRect(0,0,canvas.width,canvas.height);

  player.move();

  if (player.checkCollision(food.position.x, food.position.y)) {
    player.addToTail();
    food.move();
  }

  if (player.checkSelfCollision()) {
    player.resetLength();
  }

  player.draw(context);
  food.draw(context);
}
