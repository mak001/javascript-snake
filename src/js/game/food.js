function Food(color = "#FFFFFF") {
  this.color = color;
  this.position = {
    x: 0,
    y: 0
  };

  this.move = function(gridSize = 20) {
    this.position.x = Math.floor(Math.random() * gridSize);
    this.position.y = Math.floor(Math.random() * gridSize);
  };

  this.draw = function(context, gridSize = 20, gridSpacing = 2) {
    context.fillStyle = this.color;
    context.fillRect(
      this.position.x * gridSize,
      this.position.y * gridSize,
      gridSize - gridSpacing,
      gridSize - gridSpacing
    );
  };
}
