import Constants from './Constants';
import BlockFactory from './BlockFactory';

/**
 * Represents a tetromino
 */
export default class Tetromino {
  constructor(type, container) {
    // Set the container
    this._container = container;
    
    // Type of the tetromino (I, J, L, O, S, T, Z)
    this.type = type;

    // Position of the tetromino
    this.x = Math.floor(Constants.WIDTH / 2 - this.type.size / 2);
    this.y = 0;

    // Angle of the tetromino (0: 0deg, 1: 90deg, 2: 180deg, 3: 270deg)
    this.angle = 0;

    // Pixi's blocks
    this._blocks = [];
  }

  /**
   * Static method to get a random tetromino
   */
  static getRandom(container) {
    var types = [Types.I, Types.J, Types.L, Types.O, Types.S, Types.T, Types.Z];
    var type = types[Math.floor(Math.random() * 7)];
    return new Tetromino(type, container);
  }

  /**
   * Add shapes to container
   */
  draw() {
    let i = 0;
    for (let x = 0; x < this.type.size; x++) {
      for (let y = 0; y < this.type.size; y++) {
        if (this.type.shapes[this.angle][y][x] === 1) {
          if (this._blocks.length !== 4) {
            var block = BlockFactory.createBlock(0, 0, Constants.SQUARE_SIZE, Constants.SQUARE_SIZE, 
              this.type.color, Constants.COLORS.TETROMINO_BORDERS, 0.5);
            this._blocks.push(block);
            this._container.addChild(block);
          }
          this._blocks[i].x = (this.x + x) * Constants.SQUARE_SIZE;
          this._blocks[i].y = (this.y + y) * Constants.SQUARE_SIZE;
          i++;
        }
      }
    }
  }

  /**
   * Remove shapes from container
   */
  remove() {
    for (let i = 0; i < this._blocks.length; i++) {
      this._container.removeChild(this._blocks[i]);
      delete this._blocks[i];
    }
  }

  /**
   * Rotate the tetromino to the right
   */
  rotate() {
    this.angle += 1;
    this.angle %= 4;
  }

  /**
   * Rotate the tetromino to the left
   */
  antiRotate() {
    this.angle -= 1;
    if (this.angle === -1) {
      this.angle = 3;
    }
  }

  /**
   * Move the tetromino
   */
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  /**
   * Test if the tetromino has a block in the positino (x, y)
   * x and y being relative the the position of the tetromino
   */
  hasBlock(x, y) {
    return this.type.shapes[this.angle][y][x] === 1;
  }

}

/**
 * Types of tetrominos
 */
export const Types = {
  I: {
    name: 'I', // Name of the tetromino
    color: Constants.COLORS.TETROMINO_I, // Background color
    size: 4, // Size of the 'container' of the tetromino
    shapes: [ // All shapes of the tetromino (one per rotation position)
      [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
      ],
      [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
      ],
      [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
      ]
    ]
  },
  J: {
    name: 'J',
    color: Constants.COLORS.TETROMINO_J,
    size: 3,
    shapes: [
      [
        [1,0,0],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,1],
        [0,1,0],
        [0,1,0]
      ],
      [
        [0,0,0],
        [1,1,1],
        [0,0,1]
      ],
      [
        [0,1,0],
        [0,1,0],
        [1,1,0]
      ]
    ]
  },
  L: {
    name: 'L',
    color: Constants.COLORS.TETROMINO_L,
    size: 3,
    shapes: [
      [
        [0,0,1],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,0],
        [0,1,1]
      ],
      [
        [0,0,0],
        [1,1,1],
        [1,0,0]
      ],
      [
        [1,1,0],
        [0,1,0],
        [0,1,0]
      ]
    ]
  },
  O: {
    name: 'O',
    color: Constants.COLORS.TETROMINO_O,
    size: 2,
    shapes: [
      [
        [1,1],
        [1,1]
      ],
      [
        [1,1],
        [1,1]
      ],
      [
        [1,1],
        [1,1]
      ],
      [
        [1,1],
        [1,1]
      ]
    ]
  },
  S: {
    name: 'S',
    color: Constants.COLORS.TETROMINO_S,
    size: 3,
    shapes: [
      [
        [0,1,1],
        [1,1,0],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,0,1]
      ],
      [
        [0,0,0],
        [0,1,1],
        [1,1,0]
      ],
      [
        [1,0,0],
        [1,1,0],
        [0,1,0]
      ]
    ]
  },
  T: {
    name: 'T',
    color: Constants.COLORS.TETROMINO_T,
    size : 3,
    shapes: [
      [
        [0,1,0],
        [1,1,1],
        [0,0,0]
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,1,0]
      ],
      [
        [0,0,0],
        [1,1,1],
        [0,1,0]
      ],
      [
        [0,1,0],
        [1,1,0],
        [0,1,0]
      ]
    ]
  },
  Z: {
    name: 'Z',
    color: Constants.COLORS.TETROMINO_Z,
    size : 3,
    shapes: [
      [
        [1,1,0],
        [0,1,1],
        [0,0,0]
      ],
      [
        [0,0,1],
        [0,1,1],
        [0,1,0]
      ],
      [
        [0,0,0],
        [1,1,0],
        [0,1,1]
      ],
      [
        [0,1,0],
        [1,1,0],
        [1,0,0]
      ]
    ]
  }
};
