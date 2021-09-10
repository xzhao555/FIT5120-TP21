﻿/**
 * --------------------------------------------------------------------
 * jQuizzy - jQuery plugin for creating quizzes
 * by Siddharth S - www.ssiddharth.com
 * Copyright (c) 2011 Siddharth
 * Version: 1.5	
 * --------------------------------------------------------------------
**/

(function($){	
	$.fn.jquizzy = function(settings) {		
	var defaults = {
		questions: null,
		socialStatus: 'I scored {score}% on this awesome test! Check it out!',
		startText : 'Let\'s get started!',
		endText: 'Finished!',
		splashImage: 'img/start.png',
		twitterImage: 'img/twitter.png',
		facebookImage: 'img/facebook.png',
		shortURL: null,
		addTwitter: false,
		addFacebook: false,
		sendResultsURL: null,
		resultComments :  
	  {
		    perfect: 'Perfect!',
			 excellent: 'Excellent!',
			 good: 'Good!',
			 average: 'Acceptable!'
	  }
    };  
		     
    var config = $.extend(defaults, settings);  
	 if (config.questions === null) 
	 {
		 $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
		 return;
	 }
	
    var superContainer = $(this),
    answers = [],
    introFob = '	<div class="intro-container slide-container"><div class="question-number">'+config.startText+'</div><a class="nav-start" href="#"><img src="'+config.splashImage+'" /></a></div>	',
    exitFob = '<div class="results-container slide-container"><div class="question-number">'+config.endText+'</div><div class="result-keeper"></div></div><div class="notice">Please select an option</div><div class="progress-keeper" ><div class="progress"></div></div>',
    contentFob = '';
	 superContainer.addClass('main-quiz-holder');

    for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
        contentFob += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question">' + config.questions[questionsIteratorIndex].question + '</div><ul class="answers">';
        for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
            contentFob += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
        }

        contentFob += '</ul><div class="nav-container">';

        if (questionsIteratorIndex !== 0) {
            contentFob += '<div class="prev"><a class="nav-previous" href="#">Prev</a></div>';
        }

        if (questionsIteratorIndex < config.questions.length - 1) {
            contentFob += '<div class="next"><a class="nav-next" href="#">Next</a></div>';
        }
 else {
            contentFob += '<div class="next final"><a class="nav-show-result" href="#">Finish</a></div>';
        }

        contentFob += '</div></div>';
        answers.push(config.questions[questionsIteratorIndex].correctAnswer);
    }

    superContainer.html( contentFob + exitFob);

    var progress = superContainer.find('.progress'),
    progressKeeper = superContainer.find('.progress-keeper'),
    notice = superContainer.find('.notice'),
    progressWidth = progressKeeper.width(),
        userAnswers = [],
   
    questionLength = config.questions.length,
    slidesList = superContainer.find('.slide-container');
    
    function checkAnswers() {
        var resultArr = [],
        flag = false;
        for (i = 0; i < answers.length; i++) {

            if (answers[i] == userAnswers[i]) {
                flag = true;
            } else {
                flag = false;
            }
            resultArr.push(flag);
        }
        return resultArr;
    }
    
    function GetSumScore() {
        var resultArr = 0,
            flag = false;
        for (i = 0; i < answers.length; i++) {
            if (answers[i] == 5) {
                resultArr += userAnswers[i];
            }
            if (answers[i] == 3) {
                resultArr += userAnswers[i]*2;
            }            
        }
        return resultArr;
    }
    function roundReloaded(num, dec) {
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    }

        function judgeSkills(score) {
            console.log(score);
            var returnString;
            if (score < 8)
                return config.resultComments.perfect;
            else if (score >= 8 && score <= 15)
                return config.resultComments.excellent;
            else if (score >= 16 && score <= 19)
                return config.resultComments.good;
            else if (score >= 20)
                return config.resultComments.average;
        }
    progressKeeper.hide();
    notice.hide();
    slidesList.hide().first().fadeIn(500);

    superContainer.find('li').click(function() {
        var thisLi = $(this);

        if (thisLi.hasClass('selected')) {
            thisLi.removeClass('selected');
        } else {
            thisLi.parents('.answers').children('li').removeClass('selected');
            thisLi.addClass('selected');
        }
    });

    superContainer.find('.nav-start').click(function() {

        $(this).parents('.slide-container').fadeOut(500, function() {
            $(this).next().fadeIn(500);
            progressKeeper.fadeIn(500);
        });
        return false;

    });

    superContainer.find('.next').click(function() {

        if ($(this).parents('.slide-container').find('li.selected').length === 0) {
            notice.fadeIn(300);
            return false;
        }
        console.log($(this).parents('.slide-container').children('.answers').children('li').index($(this).parents('.slide-container').children('.answers').find('li.selected')));
        console.log(questionLength);
        notice.hide();
        $(this).parents('.slide-container').fadeOut(500, function() {
            $(this).next().fadeIn(500);
        });
        progress.animate({
            width: progress.width() + Math.round(progressWidth / questionLength)
            }, 500);
        return false;
    });

    superContainer.find('.prev').click(function() {
        notice.hide();
        $(this).parents('.slide-container').fadeOut(500, function() {
            $(this).prev().fadeIn(500);
            });

        progress.animate({
            width: progress.width() - Math.round(progressWidth / questionLength)
            }, 500);
        return false;
    });

    superContainer.find('.final').click(function() {
        if ($(this).parents('.slide-container').find('li.selected').length === 0) {
            notice.fadeIn(300);
            return false;
        }

        superContainer.find('li.selected').each(function(index) {
            userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
        });
		  
		  if (config.sendResultsURL !== null) 
		  {
			  console.log("OH HAI");
			  var collate =[];
			  for (r=0;r<userAnswers.length;r++)
			  {
				  collate.push('{questionNumber:"'+parseInt(r+1)+'", UserAnswer:"'+userAnswers[r]+'"}');
			  } 
			  $.ajax({
					  type: 'POST',
					  url: config.sendResultsURL,
					  data: '[' + collate.join(",") + ']',
					  complete: function () {console.log("OH HAI");}
					});
		  }

        progressKeeper.hide();
        var results = checkAnswers(),      
        resultSet = '',
        trueCount = 0,
		  shareButton = '',
        score,
		  url;
		  
		  if (config.shortURL === null)  {config.shortURL = window.location};
		  
    //    for (var i = 0, toLoopTill = results.length; i < toLoopTill; i++) {
    //        if (results[i] === true) {
    //            trueCount++;
    //            isCorrect = true;
    //        }
    //        resultSet += '<div class="result-row"> Question #' + (i + 1) + (results[i] === true ? "<div class='correct'><span>Correct</span></div>": "<div class='wrong'><span>Incorrect</span></div>");
    //        resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
    //        resultSet += "<ul>";
    //        for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
    //            var classestoAdd = '';
    //            if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
    //                classestoAdd += 'right';
    //            }
				//	 if (userAnswers[i] == answersIteratorIndex + 1) {
    //                classestoAdd += ' selected';
    //            }
    //            resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
    //        }
    //        resultSet += '</ul></div></div>';

    //    }
    //    score = roundReloaded(trueCount / questionLength * 100, 2);
		  
		  //if (config.addTwitter !== false) 
		  //{
		  //shareButton += '<a href="http://twitter.com/?status='+encodeURIComponent(config.socialStatus.replace("{score}", score))+' @ '+config.shortURL+'" class="share-button-twitter" target="_blank" ><img src="'+config.twitterImage+'" /></a>';
		  //}
		  
		  //if (config.addFacebook !== false) 
		  //{
		  //shareButton += '<a href="https://www.facebook.com/connect/prompt_feed.php?display=touch&message='+config.socialStatus.replace("{score}", score)+' @ '+config.shortURL+'" class="share-button-fb" target="_blank" ><img src="'+config.facebookImage+'" /></a><div class="jquizzy-clear"></div>';		  
		  //}

        resultSet = '<h2 class="qTitle">' + judgeSkills(GetSumScore()) + ' You scored ' + GetSumScore() + '</h2>' + shareButton+ resultSet + '<div class="jquizzy-clear"></div>';
        superContainer.find('.result-keeper').html(resultSet).show(500);
        superContainer.find('.resultsview-qhover').hide();
        superContainer.find('.result-row').hover(function() {
            $(this).find('.resultsview-qhover').show();
            }, function() {
            $(this).find('.resultsview-qhover').hide();
            });
        $(this).parents('.slide-container').fadeOut(500, function() {
            $(this).next().fadeIn(500);
        });
        return false;
    });
	};
})(jQuery);