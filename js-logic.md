/* ------ START ---------

When no input, welcome-msg is visible, hide results-summary. With input hide welcom-msg, show results-summary.


.result-block (add/remove .welcome-block, .calc-bmi-results)
.results-summary : (qSA * 2) : toggle hide
#welcome-msg : toggle hide
.hide

------ END ---------*/


/* ------ START ---------

When metric radio (#metric-unit) is selected: 
    show calc-imperial-group, 
    hide calc-imperial-weight-group. 
When imperial radio (#imperial-unit) is selected: 
    show calc-imperial-weight-group, 
    hide calc-imperial-group.

#metric-unit : radio btn
#imperial-unit :  radio btn
.calc-imperial-group : imperial view (qS *1)
.calc-metric-group : metric view (qS *1)
.hide

------ END ---------*/

/* ------ START ---------

When metric radio is selected: 

The metric formula for BMI: 
BMI = weight (kg) / (height(meters)*2) : is weight in kilograms divided by height in meters squared.

#metric-height : input (value: convert centimeters to meters)
#metric-weight : input (value)

#calc-bmi-results-score : placeholder (equals BMI calculation)
return BMI



OR -->> use IMPERIAL formula
BMI = (weight (lbs) / (height(inches)*2)) * 703

#metric-height : input (value: convert centimeters to inches)
#metric-weight : input (value: convert kg to lbs)

------ END ---------*/



/* ------ START ---------

When imperial radio is selected: 

The imperial formula for BMI: 
BMI = (weight (lbs) / (height(inches)*2)) * 703 : is your weight in pounds (lbs) divided by your height in inches, squared, and then you multiply this figure by a conversion factor of 703.

#imperial-height-ft : input (value: convert to inches)
#imperial-height-in : input (add to height-ft - ft(converted first))

#imperial-weight-st : input (value: convert to lbs)
#imperial-weight-lbs : input (add to weight-st(converted first))

#calc-bmi-results-score : placeholder (equals BMI calculation)
return BMI

------ END ---------*/




/* ------ START ---------
Classifications: 

#calc-bmi-results-classification : placeholder
    if BMI less than 18.5: you're underweight
    if BMI 18.5 to 24.9 : you're a healthy weight
    if BMI 25 to 29.9 : you're overweight
    if BMI 30 or greater : you're obese

------ END ---------*/



/* ------ START ---------

Healthy weight range: (metric)

#calc-bmi-resutls-range : placeholder
    if Height:
(height 58 in)	41.2kgs - 52.2kgs
(height 59 in)	42.6kgs - 54kgs |
(height 60 in)  44.0kgs - 55.8kgs
(height 61 in)	45.5kgs - 57.6kgs
(height 62 in)	47.2kgs - 59.4kgs
(height 63 in)	48.5kgs - 61.2kgs 
(height 64 in)	49.9kgs - 63.5kgs
(height 65 in)	51.7kgs - 65.3kgs
(height 66 in)	53.5kgs - 67.1kgs
(height 67 in)	54.9kgs - 69.4kgs
(height 68 in)	56.7kgs - 71.7kgs
(height 69 in)	58.1kgs - 73.5kgs
(height 70 in)	59.9kgs - 75.5kgs
(height 71 in)	61.7kgs - 78.0kgs
(height 72 in)	63.5kgs - 80.3kgs
(height 73 in)	65.3kgs - 82.5kgs
(height 74 in)	67.3kgs - 84.6kgs
(height 75 in)	68.9kgs - 87.0kgs
(height 76 in)	70.8kgs - 89.5kgs

------ END ---------*/




/* ------ START ---------

Healthy weight range: (imperial)

#calc-bmi-resutls-range : placeholder
    if Height:
(height 58 in)	6st 7lbs - 8st 3lbs
(height 59 in)	6st 10lbs - 8st 7lbs
(height 60 in)  6st 13lbs - 8st 11lbs
(height 61 in)	7st 2lbs - 9st 1lbs
(height 62 in)	7st 6lbs - 9st 5lbs
(height 63 in)	7st 9lbs - 9st 9lbs	
(height 64 in)	7st 12lbs - 10st
(height 65 in)	8st 2lbs - 10st 4lbs
(height 66 in)	8st 6lbs - 10st 8lbs
(height 67 in)	8st 9lbs - 10st 13lbs
(height 68 in)	8st 13lbs - 11st 4lbs
(height 69 in)	9st 2lbs - 11st 8lbs
(height 70 in)	9st 6lbs - 11st 13lbs
(height 71 in)	9st 10lbs - 12st 4lbs
(height 72 in)	10st - 12st 9lbs
(height 73 in)	10st 4lbs - 13st
(height 74 in)	10st 8lbs - 13st 4lbs
(height 75 in)	10st 12lbs - 13 10lbs
(height 76 in)	11st 2lbs - 14st 1lb

------ END ---------*/





// .hide



// convert strings to numbers
//https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l










/
