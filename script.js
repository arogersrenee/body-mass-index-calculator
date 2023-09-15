const metricInputs = document.querySelectorAll(".metric-input");
const imperialInputs = document.querySelectorAll(".imperial-input");

const metricHeight = document.querySelector("#metric-height"); 
const metricWeight = document.querySelector("#metric-weight");

const imperialHeightFt = document.querySelector("#imperial-height-ft"); 
const imperialHeightIn = document.querySelector("#imperial-height-in");
const imperialWeightSt = document.querySelector("#imperial-weight-st"); 
const imperialWeightLbs = document.querySelector("#imperial-weight-lbs");

const bmiScore = document.querySelector("#calc-bmi-results-score");
const bmiClassification = document.querySelector("#calc-bmi-results-classification");

const healthyLowerLimit = 18.5;
const healthyUpperLimit = 24.9;
const healthyBMI = document.querySelector("#calc-bmi-resutls-range");


// When no input, welcome-msg is visible, hide results-summary. With input hide welcom-msg, show results-summary.
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


//calculator functions
metricInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        if (metricHeight.value.trim() > 0){
            bmiScore.textContent = calculateBMI(...convertMetricUnits());
            printClassification();
            printMetricResultsRange();
        } 
    })
})


imperialInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        if (imperialHeightFt.value.trim() > 0 || imperialHeightIn.value.trim() > 0) {
            bmiScore.textContent = calculateBMI(...convertImperialUnits());
            printClassification();
            printImperialResultsRange();
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

    if (feet == ""){
        feet = 0;
    }

    if (stones == ""){
        stones = 0;
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


function printClassification() {
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


function printMetricResultsRange() {
    let height = Number(metricHeight.value.trim());

    const upperWeight = Math.round(((healthyUpperLimit / 10000) * (height**2)) * 10) / 10;
    const lowerWeight = Math.round(((healthyLowerLimit / 10000) * (height**2)) * 10) / 10;

    healthyBMI.textContent = `${lowerWeight}kgs - ${upperWeight}kgs`;
}


function printImperialResultsRange() {
    let feet = Number(imperialHeightFt.value.trim());
    let inches = Number(imperialHeightIn.value.trim());
    height = (feet * 12) + inches;

    const lowerWeight = Math.round(((healthyLowerLimit / 703) * (height**2)) * 10) / 10;
    const upperWeight = Math.round(((healthyUpperLimit / 703) * (height**2)) * 10) / 10;
    const lowerWeightSt = Math.floor(lowerWeight/14);
    const lowerWeightLbs = Math.floor(lowerWeight%14);
    const upperWeightSt = Math.floor(upperWeight/14);
    const upperWeightLbs = Math.floor(upperWeight%14);

    healthyBMI.textContent = `${lowerWeightSt}st ${lowerWeightLbs}lbs - ${upperWeightSt}st ${upperWeightLbs}lbs`
}




// convert strings to numbers
//https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l


// round one decimal place 
// https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript




