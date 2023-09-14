/* ------ START ---------

When no input, welcome-msg is visible, hide results-summary. With input hide welcom-msg, show results-summary.


.result-block (add/remove .welcome-block, .calc-bmi-results)
.results-summary : (qSA * 2) : toggle hide
#welcome-msg : toggle hide
.hide

------ END ---------*/

(function toggleWelcome() {
    const bioInputs = document.querySelectorAll("input[type=number]");

    bioInputs.forEach((input) => {
        input.addEventListener('input', () => {
            if(input.value == ""){
                showWelcome();
            } else {
                hideWelcome();
            };
        })
    })
})();

function showWelcome() {
    const resultBlock = document.querySelector("#result-block");
    const welcomeMsg = document.querySelector("#welcome-msg"); 
    const resultsSummary = document.querySelectorAll(".results-summary");

    resultBlock.classList.add("welcome-block");
    resultBlock.classList.remove("calc-bmi-results");
    welcomeMsg.classList.remove("hide");
    resultsSummary.forEach((summary) => {
        summary.classList.add("hide")
    });
}

function hideWelcome() {
    const resultBlock = document.querySelector("#result-block");
    const welcomeMsg = document.querySelector("#welcome-msg"); 
    const resultsSummary = document.querySelectorAll(".results-summary");

    resultBlock.classList.remove("welcome-block");
    resultBlock.classList.add("calc-bmi-results");
    welcomeMsg.classList.add("hide");
    resultsSummary.forEach((summary) => {
        summary.classList.remove("hide")
    });
}

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


// radio buttons: select unit & reset values and summary
(function selectUnit () {
    const unitSelection = document.querySelectorAll("input[name=calc-unit]");
    const metricGroup = document.querySelector(".calc-metric-group");
    const imperialGroup = document.querySelector(".calc-imperial-group");

    unitSelection.forEach((selection) => {
        selection.addEventListener("change", () => {
            if(selection.value == "metric") {
                metricGroup.classList.remove("hide");
                imperialGroup.classList.add("hide")
                imperialHeightFt.value = ""; 
                imperialHeightIn.value = "";
                imperialWeightSt.value = ""; 
                imperialWeightLbs.value = "";
                showWelcome();
                resetSummary();
            }

            if(selection.value == "imperial") {
                metricGroup.classList.add("hide");
                imperialGroup.classList.remove("hide");
                metricHeight.value = "";
                metricWeight.value = "";
                showWelcome();
                resetSummary();

            }
        })
    });

})();

function resetSummary() {
    const bmiScore = document.querySelector("#calc-bmi-results-score")
    const bmiClassification = document.querySelector("#calc-bmi-results-classification");
    const bmiRange = document.querySelector("#calc-bmi-resutls-range");

    bmiScore.textContent = "";
    bmiClassification.textContent = "..";
    bmiRange.textContent = "..";
}

const numInputs = document.querySelectorAll("input[type=number]");

const metricHeight = document.querySelector("#metric-height"); 
const metricWeight = document.querySelector("#metric-weight");

const imperialHeightFt = document.querySelector("#imperial-height-ft"); 
const imperialHeightIn = document.querySelector("#imperial-height-in");
const imperialWeightSt = document.querySelector("#imperial-weight-st"); 
const imperialWeightLbs = document.querySelector("#imperial-weight-lbs");

const bmiScore = document.querySelector("#calc-bmi-results-score");
const bmiClassification = document.querySelector("#calc-bmi-results-classification");


numInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        if (metricHeight.value.trim() >= 0 && metricWeight.value.trim() >= 0){
            bmiScore.textContent = calculateBMI(...convertMetricUnits());
            updateClassification();
            updateMetricResultsRange();
        }  else if (imperialHeightFt.value.trim() >= 0 && imperialWeightSt.value.trim() >= 0) {
            bmiScore.textContent = calculateBMI(...convertImperialUnits());
            updateClassification();
            updateImperialResultsRange();
        }
    })
})

//convert to lbs and inches
function convertImperialUnits() {
    let feet = imperialHeightFt.value.trim();
    let inches = imperialHeightIn.value.trim();
    let stones = imperialWeightSt.value.trim();
    let pounds = imperialWeightLbs.value.trim();

    if (inches == ""){
        inches = 0;
    }

    if (pounds == ""){
        pounds = 0;
    }

    weight = (Number(stones) * 14) + Number(pounds);
    height = (Number(feet) * 12) + Number(inches);
    return [weight, height]
}

function convertMetricUnits() {
    let kilograms = metricWeight.value.trim();
    let centimeters = metricHeight.value.trim();
    height = Number(centimeters) / 2.54;
    weight = Number(kilograms) * 2.205;
    return [weight, height]
}

// BMI = (weight (lbs) / (height(inches)*2)) * 703
function calculateBMI (weight, height) {
    let bmi = (weight / (height**2)) * 703;
    bmi = Math.round(bmi * 10) / 10;
    return bmi
}


function updateClassification() {
    if (Number(bmiScore.textContent) >= 30){
        bmiClassification.textContent = "you're obese";
    } else if (Number(bmiScore.textContent) >= 25 && Number(bmiScore.textContent) < 30){
        bmiClassification.textContent = "you're overweight";
    } else if (Number(bmiScore.textContent) >= 18.5 && Number(bmiScore.textContent) < 25) {
        bmiClassification.textContent = "you're a healthy weight";
    } else {
        bmiClassification.textContent = "you're underweight"
    }
}

function updateMetricResultsRange() {
    const metricHeight = document.querySelector("#metric-height");
    let centimeters = metricHeight.value.trim();
    height = Math.ceil((Number(centimeters) / 2.54));
    const healthyBMI = document.querySelector("#calc-bmi-resutls-range");

    switch (height) {
        case (58): healthyBMI.textContent = "41.2kgs - 52.2kgs";
            break;
        case (59): healthyBMI.textContent = "42.6kgs - 54kgs";
            break;
        case (60): healthyBMI.textContent = "44.0kgs - 55.8kgs";
            break;
        case (61): healthyBMI.textContent = "45.5kgs - 57.6kgs";
            break;
        case (62): healthyBMI.textContent = "47.2kgs - 59.4kgs";
            break;
        case (63): healthyBMI.textContent = "48.5kgs - 61.2kgs";
            break; 
        case (64): healthyBMI.textContent = "49.9kgs - 63.5kgs";
            break;
        case (65): healthyBMI.textContent = "51.7kgs - 65.3kgs";
            break;
        case (66): healthyBMI.textContent = "53.5kgs - 67.1kgs";
            break;
        case (67): healthyBMI.textContent = "54.9kgs - 69.4kgs";
            break;
        case (68): healthyBMI.textContent = "56.7kgs - 71.7kgs";
            break;
        case (69): healthyBMI.textContent = "58.1kgs - 73.5kgs";
            break;
        case (70): healthyBMI.textContent = "59.9kgs - 75.5kgs";
            break;
        case (71): healthyBMI.textContent = "61.7kgs - 78.0kgs";
            break;
        case (72): healthyBMI.textContent = "63.5kgs - 80.3kgs";
            break;
        case (73): healthyBMI.textContent = "65.3kgs - 82.5kgs";
            break;
        case (74): healthyBMI.textContent = "67.3kgs - 84.6kgs";
            break;
        case (75): healthyBMI.textContent = "68.9kgs - 87.0kgs";
            break;
        case (76): healthyBMI.textContent = "70.8kgs - 89.5kgs";
            break;
    }
}

function updateImperialResultsRange() {
    const imperialHeightFt = document.querySelector("#imperial-height-ft"); 
    const imperialHeightIn = document.querySelector("#imperial-height-in");
    let feet = imperialHeightFt.value.trim();
    let inches = imperialHeightIn.value.trim();
    height = Math.ceil((Number(feet) * 12) + Number(inches));
    const healthyBMI = document.querySelector("#calc-bmi-resutls-range");

    switch (height) {
        case (58): healthyBMI.textContent = "6st 7lbs - 8st 3lbs";
            break;
        case (59): healthyBMI.textContent = "6st 10lbs - 8st 7lbs";
            break;
        case (60): healthyBMI.textContent = "6st 13lbs - 8st 11lbs";
            break;
        case (61): healthyBMI.textContent = "7st 2lbs - 9st 1lbs";
            break;
        case (62): healthyBMI.textContent = "7st 6lbs - 9st 5lbs";
            break;
        case (63): healthyBMI.textContent = "7st 9lbs - 9st 9lbs";
            break;
        case (64): healthyBMI.textContent = "7st 12lbs - 10st";
            break;
        case (65): healthyBMI.textContent = "8st 2lbs - 10st 4lbs";
            break;
        case (66): healthyBMI.textContent = "8st 6lbs - 10st 8lbs";
            break;
        case (67): healthyBMI.textContent = "8st 9lbs - 10st 13lbs";
            break;
        case (68): healthyBMI.textContent = "8st 13lbs - 11st 4lbs";
            break;
        case (69): healthyBMI.textContent = "9st 2lbs - 11st 8lbs";
            break;
        case (70): healthyBMI.textContent = "9st 6lbs - 11st 13lbs";
            break;
        case (71): healthyBMI.textContent = "9st 10lbs - 12st 4lbs";
            break;
        case (72): healthyBMI.textContent = "10st - 12st 9lbs";
            break;
        case (73): healthyBMI.textContent = "10st 4lbs - 13st";
            break;
        case (74): healthyBMI.textContent = "10st 8lbs - 13st 4lbs";
            break;
        case (75): healthyBMI.textContent = "10st 12lbs - 13 10lbs";
            break;
        case (76): healthyBMI.textContent = "11st 2lbs - 14st 1lb";
            break;
    }

}



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







