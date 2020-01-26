/*
 * Attribute: Alvin Lin
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

function Input() {
  throw new Error("Input should not be instantiated!");
}

Input.LEFT = false;
Input.UP = false;
Input.RIGHT = false;
Input.DOWN = false;
Input.MISC_KEYS = {};

Input.onKeyDown = function(event) {
  switch (event.keyCode) {
    case 37: /* left */
    case 65 /* a */:
      Input.LEFT = true;
      break;
    case 38: /* up */
    case 87 /* w */:
      Input.UP = true;
      break;
    case 39: /* right */
    case 68 /* d */:
      Input.RIGHT = true;
      break;
    case 40: /* down */
    case 83 /* s */:
      Input.DOWN = true;
      break;
    default:
      Input.MISC_KEYS[event.keyCode] = true;
      break;
  }
};

Input.onKeyUp = function(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      Input.LEFT = false;
      break;
    case 38:
    case 87:
      Input.UP = false;
      break;
    case 39:
    case 68:
      Input.RIGHT = false;
      break;
    case 40:
    case 83:
      Input.DOWN = false;
      break;
    default:
      Input.MISC_KEYS[event.keyCode] = false;
  }
};

Input.applyEventHandlers = function() {
  document.addEventListener("keyup", Input.onKeyUp);
  document.addEventListener("keydown", Input.onKeyDown);
};

export default Input;