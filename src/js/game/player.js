function Player(x, y, tailLength = 5, color = "#FFFFFF", wrap = true, boardSize = 20) {
  this.position = {
    x,
    y,
  };
  this.tail = [];
  this.tailLength = tailLength;
  this.originalTailLength = tailLength;
  this.color = color;
  this.wrap = wrap;
  this.directions = {
    UP: {xv: 0, yv: -1},
    RIGHT: {xv: 1, yv: 0},
    DOWN: {xv: 0, yv: 1},
    LEFT: {xv: -1, yv: 0},
  };
  this.direction = {
    xv: 1,
    yv: 0
  };

  this.move = function () {
    this.position.x += this.direction.xv;
    this.position.y += this.direction.yv;

    if (this.wrap) {
      if (this.position.x < 0) {
        this.position.x = boardSize - 1;
      }

      if (this.position.x > boardSize - 1) {
        this.position.x = 0;
      }

      if (this.position.y < 0) {
        this.position.y = boardSize - 1;
      }

      if (this.position.y > boardSize - 1) {
        this.position.y = 0;
      }
    }

    // adds current position to front of the tail
    this.tail.unshift({
      x: this.position.x,
      y: this.position.y,
    });

    // removes the end of the tail
    while (this.tailLength < this.tail.length) {
      this.tail.pop();
    }
  };

  this.draw = function (context, gridSize = 20, gridSpacing = 2) {
    context.fillStyle = this.color;
    for (let i = 0; i < this.tail.length; i++) {
      context.fillRect(
        this.tail[i].x * gridSize,
        this.tail[i].y * gridSize,
        gridSize - gridSpacing,
        gridSize - gridSpacing
      );
    }
  };

  this.checkCollision = function (cx, cy) {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x === cx && this.tail[i].y === cy) {
        return true;
      }
    }
    return false;
  };

  this.checkSelfCollision = function () {
    // start at one, because the head can't collide with itself
    for (let i = 1; i < this.tail.length; i++) {
      if (this.position.x === this.tail[i].x && this.position.y === this.tail[i].y) {
        return true;
      }
    }
    return false;
  };

  this.addToTail = function (count = 1) {
    this.tailLength += count;
  };

  this.resetLength = function () {
    this.tailLength = this.originalTailLength;
  };
}
