var board = new Array()
var score = 0
var hasConflicted = new Array()

var startx = 0
var starty = 0
var endx = 0
var endy = 0

$(document).ready(function() {
  newGame()
})

function newGame() {
  // 初始化棋盘格
  init()
  //在随机两个格子生成数字
  generateOneNumber()
  generateOneNumber()
}

function init() {
  // 修改每个cell的样式
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var gridCell = $('#grid-cell-' + i + '-' + j)
      gridCell.css('top', getPosTop(i, j))
      gridCell.css('left', getPosLeft(i, j))
    }
  }
  // 先将board 置为二维数组
  for (let i = 0; i < 4; i++) {
    board[i] = new Array()
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0
    }
  }

  updateBoardView()
}

function updateBoardView() {
  $('.number-cell').remove()

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $('#grid-container').append(
        '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>'
      )
      var theNumberCell = $('#number-cell-' + i + '-' + j)

      if (board[i][j] == 0) {
        // 初始化 numberCell 的样式，开始的时候 width 和 height 都是 0，
        theNumberCell.css('width', '0px')
        theNumberCell.css('height', '0px')
        // 将 numberCell 放到每个 cell 的中间，getPosTop 获取到的值，就是 numberCell 左上角的值
        theNumberCell.css('top', getPosTop(i, j) + 50 / 2)
        theNumberCell.css('left', getPosLeft(i, j) + 50 / 2)
      } else {
        theNumberCell.css('width', '100px')
        theNumberCell.css('height', '100px')
        theNumberCell.css('top', getPosTop(i, j))
        theNumberCell.css('left', getPosLeft(i, j))
        // 设置样式
        theNumberCell.css(
          'background-color',
          getNumberBackgroundColor(board[i][j])
        )
        theNumberCell.css('color', getNumberColor(board[i][j]))
        theNumberCell.text(board[i][j])
      }
    }
  }
}

function generateOneNumber() {
  // 判断能否生成数字
  if (nospace(board)) return false

  //随机一个位置
  var randx = parseInt(Math.floor(Math.random() * 4))
  var randy = parseInt(Math.floor(Math.random() * 4))
  // 循环判断这个位置是否可用
  while (true) {
    if (board[randx][randy] == 0) break

    randx = parseInt(Math.floor(Math.random() * 4))
    randy = parseInt(Math.floor(Math.random() * 4))
  }
  //随机一个数字
  var randNumber = Math.random() < 0.5 ? 2 : 4

  //在随机位置显示随机数字
  board[randx][randy] = randNumber
  showNumberWithAnimation(randx, randy, randNumber)

  return true
}

$(document).keydown(function(event) {
  event.preventDefault()
  switch (event.keyCode) {
    case 37: //left
      if (moveLeft()) {
        setTimeout('generateOneNumber()', 210)
        setTimeout('isgameover()', 300)
      }
      break
    case 38: //up
      if (moveUp()) {
        setTimeout('generateOneNumber()', 210)
        setTimeout('isgameover()', 300)
      }
      break
    case 39: //right
      if (moveRight()) {
        setTimeout('generateOneNumber()', 210)
        setTimeout('isgameover()', 300)
      }
      break
    case 40: //down
      if (moveDown()) {
        setTimeout('generateOneNumber()', 210)
        setTimeout('isgameover()', 300)
      }
      break
    default:
      break
  }
})

/**
 * 对每一个数字的左侧位置进行判断，看是否可能为落脚点
 * 落脚位置是否为空？
 * 落脚位置数字和待判定元素数字相等？
 * 移动路径中是否有障碍物？
 */
function moveLeft() {
  // 判断是否可以向左移动
  // 1. 左边是否没有数字
  // 2. 左边数字是否和自己相等
  if (!canMoveLeft(board)) return false
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        // 遍历 j 值左侧的位置
        for (var k = 0; k < j; k++) {
          // noBlockHorizontal 判断两个位置之间是否有障碍物
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            // move
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (
            board[i][k] == board[i][j] &&
            noBlockHorizontal(i, k, j, board)
          ) {
            // move
            showMoveAnimation(i, j, i, k)
            board[i][k] += board[i][j]
            // add
            board[i][j] = 0
            continue
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200)
  return true
}

function moveRight() {
  if (!canMoveRight(board)) return false
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j > -1; j--) {
      if (board[i][j] != 0) {
        // 遍历 j 值左侧的位置
        for (var k = 3; k > j; k--) {
          // noBlockHorizontal 判断两个位置之间是否有障碍物
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            // move
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (
            board[i][k] == board[i][j] &&
            noBlockHorizontal(i, k, j, board)
          ) {
            // move
            showMoveAnimation(i, j, i, k)
            board[i][k] += board[i][j]
            // add
            board[i][j] = 0
            continue
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200)
  return true
}

function moveUp() {
  if (!canMoveUp(board)) return false
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
            // move
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue
          } else if (
            board[i][k] == board[i][j] &&
            noBlockVertical(i, k, j, board)
          ) {
            // move
            showMoveAnimation(i, j, k, j)
            board[k][j] += board[i][j]
            // add
            board[i][j] = 0
            continue
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200)
  return true
}

function moveDown() {
  if (!canMoveDown(board)) return false
  for (var i = 3; i > -1; i--) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
            // move
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue
          } else if (
            board[i][k] == board[i][j] &&
            noBlockVertical(i, k, j, board)
          ) {
            // move
            showMoveAnimation(i, j, k, j)
            board[k][j] += board[i][j]
            // add
            board[i][j] = 0
            continue
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200)
  return true
}

function isgameover() {}
