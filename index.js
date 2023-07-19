function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandomInt(0, i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

document.getElementById('button02').addEventListener('click', function() {
  var selectedNumber = null;
  var numberButtons = document.querySelectorAll('.butn03');
  var resultElement = document.getElementById('manu');
  var diceElement = document.getElementById('dice');

  for (var i = 0; i < numberButtons.length; i++) {
    if (numberButtons[i].classList.contains('selected')) {
      selectedNumber = numberButtons[i];
      break;
    }
  }

  if (!selectedNumber) {
    resultElement.innerText = "Please select a card first.";
    resultElement.style.color = "yellow";
    return;
  }

  diceElement.style.animation = 'rotate 5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards';
  var diceSound = new Audio('diceanimation.mp3');
  diceSound.play();

  setTimeout(function() {
    diceElement.style.animation = 'none';
    diceSound.pause();

    var faces = diceElement.getElementsByClassName('face');
    var randomNumbers = shuffleArray([1, 2, 3, 4, 5, 6]); // Shuffle the array of numbers

    for (var i = 0; i < faces.length; i++) {
      var dots = faces[i].getElementsByTagName('div');
      for (var j = 0; j < dots.length; j++) {
        dots[j].innerText = '.';
      }
    }

    var generatedIndex = getRandomInt(0, faces.length - 1);
    var generatedFace = faces[generatedIndex];
    var generatedNumber;
    var message = "The generated number is: ";

    switch (generatedFace.getAttribute('id')) {
      case 'front':
        generatedNumber = 1;
        message += generatedNumber;
        break;
      case 'back':
        generatedNumber = 6;
        message += generatedNumber;
        break;
      case 'right':
        generatedNumber = 2;
        message += generatedNumber;
        break;
      case 'left':
        generatedNumber = 5;
        message += generatedNumber;
        break;
      case 'top':
        generatedNumber = 4;
        message += generatedNumber;
        break;
      case 'bottom':
        generatedNumber = 3;
        message += generatedNumber;
        break;
      default:
        generatedNumber = null;
        message = "Invalid face generated.";
        break;
    }
    var selectedNumberId = selectedNumber.getAttribute('id').slice(-2);
    if (selectedNumberId === generatedNumber.toString().padStart(2, '0')) {
      resultElement.innerHTML = "Congratulations! You won. " + message + "<br><br>" + generatedFace.innerHTML;
      resultElement.style.color = "green";
    } else {
      resultElement.innerText = "Sorry! You lose. " + message;
      resultElement.style.color = "red";
    }

    // Show the generated face on the front of the dice
    var frontFace = document.getElementById('front');
    frontFace.innerHTML = generatedFace.innerHTML;

    setTimeout(function() {
      frontFace.style.transition = "background-color 0.5s"; // Apply transition effect for 0.5 seconds
      frontFace.style.backgroundColor = ""; // Remove the background color after 0.5 seconds
    }, 5000);

    setTimeout(function() {
      diceElement.style.animation = 'mahi 15s infinite linear'; // Resume the mahi animation after 8 seconds
    }, 2000); // 8000 milliseconds = 8 seconds
  }, 2000);
});

var numberButtons = document.querySelectorAll('.butn03');
for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', function() {
    resetSelection(); // Call the resetSelection function to hide previous result messages
    var prevSelected = document.querySelector('.butn03.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
      prevSelected.style.backgroundColor = '';
    }
    this.classList.add('selected');
  });
}

function resetSelection() {
  var selectedButton = document.querySelector('.butn03.selected');
  var resultElement = document.getElementById('manu');
  if (selectedButton) {
    selectedButton.classList.remove('selected');
  }
  resultElement.innerHTML = '';
  resultElement.style.color = '';
}


