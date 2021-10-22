/*
Drinks calculator
author: Daniel Zabinskas, Clemenger
Sources:
Standard drinks calculation from http://www.alcohol.gov.au/internet/alcohol/publishing.nsf/Content/standard
Alcohol percentages from https://www.nhmrc.gov.au/your-health/alcohol-guidelines
Calories: Estimated from old version of calculator (should be updated with better info)
*/

//See if there is an existing app object
var app = app || {};

(function(drinksCalculatorName) {
	//overwrite any drinkscalculator property with a new object to house the drinks calculator app
	if (app[drinksCalculatorName]) throw("There's already a property on window.app called \"" + drinksCalculatorName + "\"");
	var dc = app[drinksCalculatorName] = {};

	//////////////////////////////////////////////////////////////////////
	/////////////////////////// INIT VARIABLES ///////////////////////////
	//////////////////////////////////////////////////////////////////////

	//Define the various types of booze with alcohol by volume (abv) and calories per 100 ml
	var drinkDefinitions = {
		lightbeer: {
			abv: 2.7,
			calories: 31
		},
		midbeer: {
			abv: 3.5,
			calories: 32
		},
		heavybeer: {
			abv: 4.8,
			calories: 40
		},
		redwine: {
			abv: 13.5,
			calories: 95.2
		},
		whitewine: {
			abv: 11.5,
			calories: 74
		},
		champagne: {
			abv: 12,
			calories: 124
		},
		spirit40: {
			abv: 40,
			calories: 244
		},
		spirit45: {
			abv: 45,
			calories: 264
		},
		spirit50: {
			abv: 50,
			calories: 284
		},
		premix: {
			abv: 5,
			calories: 75
		},
		// premixstrong: {
		// 	abv: 7,
		// 	calories: 0
		// },
		readytodrink: {
			abv: 5,
			calories: 75
		}
		// readytodrinkstrong: {
		// 	abv: 7,
		// 	calories: 0
		// }
	};

	//Store each row of the drink entries in the DOM
	var $servingsDisplay, $drinksDisplay, $caloriesDisplay;

	//Store calculated values
	var calculationId = ""

	//////////////////////////////////////////////////////////////////////
	////////////////////////// TRACK USER INPUT //////////////////////////
	//////////////////////////////////////////////////////////////////////

	//Set the number of drinks to be calculated for a row in the tally object
	function setTallyCount(currentDrink, incrementValue) {
		currentDrink.data('quantity', currentDrink.data('quantity') + incrementValue);
		$('.options .quantity .count').html(currentDrink.data('quantity'));
		calculate();
	}

	//////////////////////////////////////////////////////////////////////
	////////////////////////// CALCULATE RESULTS /////////////////////////
	//////////////////////////////////////////////////////////////////////

	//Run a calculation. Done whenever the tally is updated
	function calculate() {
		var servings = 0;
		var standardDrinks = 0;
		var calories = 0;

		$('.calculator-carousel .single-drink').each(function(){
			var currentDrinkType = $(this).data('drinktypes').split(',')[$(this).data('currenttype')].split('|');
			servings += $(this).data('quantity');
			standardDrinks += $(this).data('quantity') * (currentDrinkType[2] / 1000) * drinkDefinitions[currentDrinkType[1]]['abv'] * 0.789;
			calories += $(this).data('quantity') * (currentDrinkType[2] / 100) * drinkDefinitions[currentDrinkType[1]]['calories'];
			//Only render if the values change
			var renderId = String(servings) + "," + String(standardDrinks) + "," + String(calories);
			if (renderId != calculationId) {			
				
				renderResults(servings, standardDrinks, calories);
			}
			calculationId = renderId;
		});
	}

	//////////////////////////////////////////////////////////////////////
	////////////////////////// DOM MANIPULATION //////////////////////////
	//////////////////////////////////////////////////////////////////////

	//Update the DOM whenever a calculation is done
	function renderResults(servings, standardDrinks, calories) {
		if (window.logCalculations && (servings || standardDrinks || calories)) {
			console.log('=== Calculated ===');
			console.log('servings: '+servings);
			console.log('standard drinks: '+standardDrinks);
			console.log('calories: '+calories);
		}

		$servingsDisplay.text(servings);
		$drinksDisplay.text(standardDrinks.toFixed(1));
		$caloriesDisplay.text(Math.round(calories));
	}

	function setOptions() {		
		$('ul.types').empty();
		if ($('.carousel-nav .right').hasClass("disabled")) {
			console.log("11111111111111");
			$('.options .quantity').hide();
			$('.AddRow-chen').show();
		}
		else {
			$('.AddRow-chen').hide();
			$('.options .quantity').show();
			$('ul.types').removeClass('open')
			$('ul.types').removeAttr('style');
			//Set dropdown
			var drinkTypes = $('.calculator-carousel .single-drink.current').data('drinktypes').split(',');
			for (i = 0; i < drinkTypes.length; i++) {
				//Remove arrows on dropdown if only one value
				var backgroundImage = "";
				if (drinkTypes.length == 1) {
					backgroundImage = " no-arrow";
				}
				//Populate dropdown with options
				var currentItem = drinkTypes[i].split('|');
				var active = "";
				if (i == $('.calculator-carousel .single-drink.current').data('currenttype')) {
					var active = "active";
				}
				$('ul.types').append('<li class="' + active + backgroundImage + '" data-type="' + currentItem[1] + '|' + currentItem[2] + '" data-index="' + i + '">' + currentItem[0] + '</li>');
			}
			//Ensure active item is on top of list
			//$('ul.types').prepend($('ul.types .active'));
			// Removed this functionality. See issue (https://clemenger.jira.com/browse/DWA-6) in Jira for more details

			//Set quantity value
			$('.options .quantity .count').html($('.calculator-carousel .single-drink.current').data('quantity'));
		}
		
	}

	//Scroll drinks left or right
	function navigateSlides(incrementValue) {
		if (!($('.calculator-carousel .single-drink.current').data('index') == 0 && incrementValue == "+1") && !($('.calculator-carousel .single-drink.current').data('index') == ($('.calculator-carousel .single-drink').length - 1) && incrementValue == "-1")) {
			$('.calculator-carousel .single-drink').each(function(){
				$(this).data('position', $(this).data('position') + parseInt(incrementValue));
				if ($(window).width() >= 800) {
					$(this).css('margin-left', ($(window).width() / 2) * parseInt($(this).data('position')));
				} else {
					$(this).css('margin-left', $(window).width() * parseInt($(this).data('position')));
				}
				if ($(this).data('position') == 0) {
					$(this).addClass('current');
					$('.mobile-nav .active').removeClass('active');
					$('.mobile-nav li[data-index="' + $(this).data('index') + '"]').addClass('active');
				} else {
					$(this).removeClass('current');
				}
			});
			//Update drink name
			$('#drinks-calculator h2.drinkname').fadeOut(200);
			setTimeout(function(){
				setOptions();
				$('#drinks-calculator h2.drinkname').html($('.calculator-carousel .single-drink.current').data('drinkname'));
				$('#drinks-calculator h2.drinkname').fadeIn(200);
			}, 200);
			//Disable left nav if first slide active (at position 0)
			if ($('.calculator-carousel .single-drink').first().data('position') == 0) {
				$('.carousel-nav .left').addClass('disabled');
			} else {
				$('.carousel-nav .left').removeClass('disabled');
			}
			//Disable right nav if last slide active (at position 0)
			if ($('.calculator-carousel .single-drink').last().data('position') == 0) {
				$('.carousel-nav .right').addClass('disabled');
			} else {
				$('.carousel-nav .right').removeClass('disabled');
			}
		}
	}

	//Run initializations when the DOM is ready
	$(document).ready(function() {
		var currentWidth = $(window).width();
		console.log(currentWidth);
		console.log($('#drinks-calculator').length);
		if ($('#drinks-calculator').length) { 
			//Hide intro and reveal app
			$('.get-started').on('click', function(){
				$('.intro').fadeOut(500);
			});
			//Set up calculation results displays
			$servingsDisplay = $("#drinks-calculator .servingsnumber");
			$drinksDisplay = $("#drinks-calculator .drinksnumber");
			$caloriesDisplay = $("#drinks-calculator .caloriesnumber");
			//Init carousel item positions
			$('.calculator-carousel .single-drink').each(function (i) {
				
				if ($(window).width() >= 800) {
					console.log(($(window).width() / 2) * i);
					$(this).css('margin-left', (($(window).width() / 2) * i));
				} else {
					$(this).css('margin-left', ($(window).width() * i));
				}
			});
			//Set initial drink name and options
			$('#drinks-calculator h2.drinkname').html($('.calculator-carousel .single-drink.current').data('drinkname'));
			setOptions();
			//Set up left/right carousel nav
			$('.carousel-nav div').on('click', function(){
				//Finish all previous navigation animations in queue
				$('.calculator-carousel .single-drink, #drinks-calculator h2.drinkname, .options').finish();
				//Only continue if current direction enabled
				if (!$(this).hasClass('disabled')) {
					//Change left margin according to scroll direction + update slide position reference
					if ($(this).hasClass('left')) {
						navigateSlides('+1');
					} else {
						navigateSlides('-1');
					}
				}
			});

			//Handle dropdown click event
			$('.options .types').on('click', 'li', function(){
				if (!$(this).parent('.types').hasClass('open')) {
					$(this).parent('.types').addClass('open');
					$(this).siblings('li').show();
					if ($(window).width() >= 800) {
						$(this).parent('.types').css('height', ($('.types li')[0].scrollHeight * $('.types').children().length / 2 - $('.types li')[0].scrollHeight / 2) + 'px');
						$(this).parent('.types').css('margin-top', (($('.types li')[0].scrollHeight * $('.types').children().length / 2 - $('.types li')[0].scrollHeight / 2) * -1) + 'px');
					}
				} else {
					$(this).parent('.types').removeClass('open');
					$(this).parent('.types').removeAttr('style');
					$(this).siblings('li').hide();
					$('.calculator-carousel .single-drink.current').data('currenttype', $(this).data('index'));
					$('.types .active').removeClass('active');
					$(this).addClass('active');
					// $(this).parent('.types').prepend($(this));
					// removed. See issue (https://clemenger.jira.com/browse/DWA-6) in Jira
				}
			});

			//Increase/decrease quantity of each item
			$('.options .quantity .control').on('click', function(){
				var currentDrink = $('.calculator-carousel .single-drink.current');
				if ($(this).hasClass('minus')) {
					if ($(this).siblings('.count').html() > 0) {
						setTallyCount(currentDrink, -1);
					}
				} else {
					setTallyCount(currentDrink, +1);
				}
			});

			//Display results once calculate button is clicked
			$('.calculate').on('click', function () {
				if ($(this).hasClass('AddRow-chen')) {					
					$('.chen-table table').append("<tr><td><input type=\"text\" name=\"DrinkName\" class=\"DrinkName\" placeholder=\"Drink Name\" value=\"\"/></td>                                    <td><input type=\"number\" name=\"Quantity\" placeholder=\"Quantity\" class=\"Quantity\" value=\"\" /></td>                                 <td><input type=\"number\" name=\"Volume\" class=\"Volume\" placeholder=\"Volume(ml)\" value=\"\" /></td><td><input type=\"number\" name=\"AlcoholByVolume\" class=\"AlcoholByVolume\" placeholder=\"Alcohol By Volume(%)\" value=\"\" /></td></tr>");
				}
				else {
					var flag = true;
					if ($('.carousel-nav .right').hasClass("disabled")) {
						$('.chen-table tr').each(function () {
							if ($(this).find(".Quantity").val() != undefined) {
								console.log(parseInt($(this).find(".Quantity").val()));
								console.log(parseInt($(this).find(".Volume").val()));
								console.log(parseInt($(this).find(".AlcoholByVolume").val()));
								if ($(this).find(".Quantity").val() <= 0 || $(this).find(".Volume").val() <= 0 || $(this).find(".AlcoholByVolume").val() <= 0) {
									flag = false;
									alert("Please enter a valid value in the input box");
									return;
								}
							}
						})
					}
					
					if (flag) {
						$('.chen-table').hide();
						$('.results').addClass('reveal');
						if ($('.carousel-nav .right').hasClass("disabled")) {
							servings = 0;
							standardDrinks = 0;
							$('.chen-table tr').each(function () {
								if ($(this).find(".Quantity").val() != undefined) {
									console.log(parseInt($(this).find(".Quantity").val()));
									console.log(parseInt($(this).find(".Volume").val()));
									console.log(parseInt($(this).find(".AlcoholByVolume").val()));
									servings += parseInt($(this).find(".Quantity").val());
									standardDrinks += parseInt($(this).find(".Quantity").val()) * 0.798 * parseInt($(this).find(".Volume").val()) / 1000 * parseInt($(this).find(".AlcoholByVolume").val());
								}
							})
							console.log(servings);
							console.log(standardDrinks);
							renderResults(servings, standardDrinks, 0);
						}
					}
					
				}
				
			});

			// Hide drink type selector dropdown when clicking outside of it
			$('body').on('click', function(e){
				if ($(e.target).closest('.types.open').length == 0) {
					$('.types.open').removeClass('open').removeAttr('style').find('li').hide();
				}
			});

			// Reset results
			$('.reset-values').on('click', function(){
				calculationId = '';
				$('.single-drink').each(function(){
					$(this).data('quantity', 0);
				});
				$('.options .quantity .count').html('0');
				$('.results').removeClass('reveal');
				$(".chen-table tr td").each(function () {
					$(this).find("input").val("");
				})
				$(".chen-table table").html("<tr><td><input type=\"text\" name=\"DrinkName\" class=\"DrinkName\" placeholder=\"Drink Name\" value=\"\"/></td>                                    <td><input type=\"number\" name=\"Quantity\" placeholder=\"Quantity\" class=\"Quantity\" value=\"\" /></td>                                 <td><input type=\"number\" name=\"Volume\" class=\"Volume\" placeholder=\"Volume(ml)\" value=\"\" /></td><td><input type=\"number\" name=\"AlcoholByVolume\" class=\"AlcoholByVolume\" placeholder=\"Alcohol By Volume(%)\" value=\"\" /></td></tr>");
				$('.chen-table').show();
				setTimeout(function(){
					renderResults(0, 0, 0);
				}, 500);				
			});

			// Close results screen
			$('.close-results').on('click', function(){
				$('.results').removeClass('reveal');
				$('.chen-table').show();
			});

			//Mobile nav functionality
			$('.mobile-nav li').on('click', function(){
				var slideMargin = 0;
				var thisIndex = $(this).data('index');
				var slidePosition = 0;
				//Calculate initial slide margin
				if (thisIndex > 0) {
					slideMargin = $(window).width() * thisIndex * -1;
					slidePosition = thisIndex * -1;
				}
				$('.calculator-carousel .single-drink').each(function(i){
					if (i == thisIndex) {
						$(this).addClass('current');
						setOptions();
					} else {
						$(this).removeClass('current');
					}
					$(this).data('position', slidePosition);
					$(this).css('margin-left', slideMargin + $(window).width() * i);
					slidePosition++;
				});
				//Disable left nav on desktop view if first slide active (at position 0)
				if ($('.calculator-carousel .single-drink').first().data('position') == 0) {
					$('.carousel-nav .left').addClass('disabled');
				} else {
					$('.carousel-nav .left').removeClass('disabled');
				}
				//Disable right nav on desktop view if last slide active (at position 0)
				if ($('.calculator-carousel .single-drink').last().data('position') == 0) {
					$('.carousel-nav .right').addClass('disabled');					
				} else {
					$('.carousel-nav .right').removeClass('disabled');					
				}
				//Update drink name
				$('#drinks-calculator h2.drinkname').fadeOut(200);
				setTimeout(function(){
					setOptions();
					$('#drinks-calculator h2.drinkname').html($('.calculator-carousel .single-drink.current').data('drinkname'));
					$('#drinks-calculator h2.drinkname').fadeIn(200);
				}, 200);
				//Set current nav item to active
				$('.mobile-nav li').removeClass('active');
				$(this).addClass('active');
			});

			//Touch support for mobile
			var touchStartPosition = 0;
			var touchStartTimestamp = 0;
			var currentPosition = false;
			$('.calculator-carousel .single-drink, #drinks-calculator h2.drinkname').on('touchstart', function(i){
				touchStartPosition = i.originalEvent.touches[0].clientX;
				//Set currentPosition flag to false (so that no other touchmove events trigger until a new swipe is recorded)
				currentPosition = false;
			});
			$('.calculator-carousel .single-drink, #drinks-calculator h2.drinkname').on('touchmove', function(i){
				//Navigate if currentPosition doesn't exist (i.e. this is a new swipe)
				if (!currentPosition) {
					currentPosition = i.originalEvent.touches[0].clientX;
					//Check direction of swipe based on difference between current/initial positions (+/-)
					if (touchStartPosition > currentPosition) {
						navigateSlides('-1');
					} else if (touchStartPosition < currentPosition) {
						navigateSlides('+1');
					}
				}
			});
		}
	});

})("drinkscalculator");