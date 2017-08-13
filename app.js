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
  var red = document.querySelector('#red');
  var blue = document.querySelector('#blue');
  var green = document.querySelector('#green');
  var yellow = document.querySelector('#yellow')

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

  function gameSequence() {
    x = setInterval(function() {
      if (simon.sequence[j] == RED) {
        console.log('its red');
        audio1.play();
        lit = 'redlit';
        r_color.classList.add(lit);
        setTimeout(function () {
          r_color.classList.remove(lit)
        },250);
      }
      if (simon.sequence[j] == BLUE) {
        console.log('its blue');
        lit = 'bluelit';
        audio2.play();
        b_color.classList.add(lit);
        setTimeout(function () {
          b_color.classList.remove(lit)
        },250);
      }
      if (simon.sequence[j] == GREEN) {
        console.log('its green');
        lit = 'greenlit';
        audio3.play();
        g_color.classList.add(lit);
        setTimeout(function () {
          g_color.classList.remove(lit)
        },250);
      }
      if (simon.sequence[j] == YELLOW) {
        console.log('its yellow');
        lit = 'yellowlit';
        audio4.play();
        y_color.classList.add(lit);
        setTimeout(function () {
          y_color.classList.remove(lit)
        },250);
      }
      j++;
      if (j >= simon.count) {
        clearInterval(x);
      }
    },800);
  }


  red.addEventListener('click', function() {
    simon.sendColor(RED);
    audio1.play();
      r_color.classList.add('redlit');
      window.setTimeout(function() {
        r_color.classList.remove('redlit');
      },250);

  });
  blue.addEventListener('click', function() {
    simon.sendColor(BLUE);
    audio2.play();
      b_color.classList.add('bluelit');
      window.setTimeout(function() {
        b_color.classList.remove('bluelit');
      },250);
  });
  green.addEventListener('click', function() {
    simon.sendColor(GREEN);
    audio3.play();
      g_color.classList.add('greenlit');
      window.setTimeout(function() {
        g_color.classList.remove('greenlit');
      },250);
  });
  yellow.addEventListener('click', function() {
    simon.sendColor(YELLOW);
    audio4.play();
      y_color.classList.add('yellowlit');
      window.setTimeout(function() {
        y_color.classList.remove('yellowlit');
      },250);
  });

}
