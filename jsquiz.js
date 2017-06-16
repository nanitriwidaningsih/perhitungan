(function() {
  var questions = [{
    question: "Seorang pedagang pepaya telah menjual 1 truk buah sebanyak 963 buah. Buah yang sudah masak sebanyak 868 buah. Berapa banyaknya buah yang belum masak?",
    choices: [93, 97, 95, 96, 69],
    correctAnswer: 95
  }, {
    question: "Lambang bilangan dari seratus enam puluh tujuh adalah ....",
    choices: [170, 107, 167, 176, 178],
    correctAnswer: 167
  }, {
    question: "Lina mengikuti kursus menari mulai pukul 15.00 sampai 16.00. Berapa lama Lina menari?...jam",
    choices: [1 , 3 , 2 , 4 , 5 ],
    correctAnswer: 1 
  }, {
    question: "18 + 40 - 18 = ....",
    choices: [40, 42, 41, 43, 34],
    correctAnswer: 40
  }, {
    question: "1 Kg = ..... Ons",
    choices: [10, 1000, 100, 10000, 100000],
    correctAnswer: 10
  }, {
    question: "7 kg + 8 ons = ... ons",
    choices: [78, 79, 80, 81, 82],
    correctAnswer: 78
}, {
    question: "Umur bayi 49 hari atau sama dengan ... minggu.",
    choices: [4, 6, 5, 7, 9],
    correctAnswer: 7
}, {
    question: "tujuh ribu delapan puluh tiga ditulis dalam angka adalah...",
    choices: [7833, 7083, 7308, 7883, 7830],
    correctAnswer:  7083
}, {
    question: "3 ratusan + 2 puluhan + 7 satuan = ...",
    choices: [723, 273, 327, 372, 732],
    correctAnswer:  327
}, {
    question: "1532 + .... = 1960 bilangan yang tepat untuk mengisi titik-titik adalah ...",
    choices: [433, 423, 431, 418, 428],
    correctAnswer:428  
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();