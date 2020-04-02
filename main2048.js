/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

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
