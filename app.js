window.onload = function() {

  var x;
  var lit;
  var j = 0;
  var nextColor;
  var RED = 'RED';
  var BLUE = 'BLUE';
  var GREEN = 'GREEN';
  var YELLOW = 'YELLOW';

  var count = document.querySelector('#count');

  // Game Tile Buttons
  var yellow = document.querySelector('#yellow')
  var green = document.querySelector('#green');
  var blue = document.querySelector('#blue');
  var red = document.querySelector('#red');

  // Game Audio Files
  var audio1 = document.querySelector('#audio1');
  var audio2 = document.querySelector('#audio2');
  var audio3 = document.querySelector('#audio3');
  var audio4 = document.querySelector('#audio4');
  var audio5 = document.querySelector('#audio5');

  // Game Color Variables
  var r_color = document.querySelector('[data-tile="1"]');
  var b_color = document.querySelector('[data-tile="2"]');
  var g_color = document.querySelector('[data-tile="3"]');
  var y_color = document.querySelector('[data-tile="4"]');

  // Simon Game Object
  var simon = {
    sendColor: function(color) {
      if (!simon.sequence.length) {
      simon.nextSequence();
      } else {
        if (color === simon.sequence[simon.step]) {
          if(simon.step === simon.sequence.length - 1) {
            if (simon.sequence.length < 20) {
              simon.step = 0;
              j = 0;
              simon.count++;
              simon.nextSequence();
              gameSequence();
            } else {
              alert('YOU WIN');
              simon.sequence = [];
              simon.step = 0;
              simon.count = 0;
            }
          } else {
            simon.step++;
          }
        } else {
          audio5.play();
          j = 0;
          simon.sequence = [];
          simon.step = 0;
          simon.count = 1;
          count.innerHTML = 'Count  :  YOU LOSE';
          //alert('Sorry You Lose :(');
        }
      }
    },
    sequence: [],
    colors: [RED,GREEN,YELLOW,BLUE],
    step: 0,
    count: 1,
    nextSequence: function() {
      nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
      simon.sequence.push(nextColor);
      count.innerHTML = simon.count;
      console.log('This sequence is: ' + simon.sequence);
    }
  };

  document.querySelector('#start').addEventListener('click', function() {
    simon.nextSequence();
    gameSequence();
  });

  function lightPlayChangeClass(className, audio, _color) {
      lit = className;
      audio.play();
      _color.classList.add(lit);
      setTimeout(function() {
        _color.classList.remove(lit);
      }, 250);
    }

    function gameSequence() {
      x = setInterval(function() {
        if (simon.sequence[j] == RED) {
          lightPlayChangeClass('redlit', audio1, r_color);
        }
        if (simon.sequence[j] == BLUE) {
          lightPlayChangeClass('bluelit', audio2, b_color);
        }
        if (simon.sequence[j] == GREEN) {
          lightPlayChangeClass('greenlit', audio3, g_color);
        }
        if (simon.sequence[j] == YELLOW) {
          lightPlayChangeClass('yellowlit', audio4, y_color);
        }
        j++;
        if (j >= simon.count) {
          clearInterval(x);
        }
      },800);
    }


    function clickSendPlayLight(tile, color, audio, _color, className) {
      tile.addEventListener('click', function() {
        simon.sendColor(color);
        audio.play();
        _color.classList.add(className);
        window.setTimeout(function() {
          _color.classList.remove(className);
        }, 250);
      });
    }

    clickSendPlayLight(yellow, YELLOW, audio4, y_color, 'yellowlit');
    clickSendPlayLight(green, GREEN, audio3, g_color, 'greenlit');
    clickSendPlayLight(blue, BLUE, audio2, b_color, 'bluelit');
    clickSendPlayLight(red, RED, audio1, r_color, 'redlit');




}
