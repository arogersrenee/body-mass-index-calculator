# Frontend Mentor - Body Mass Index Calculator solution

This is a solution to the [Body Mass Index Calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/body-mass-index-calculator-brrBkfSz1T). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- Select whether they want to use metric or imperial units
- Enter their height and weight
- See their BMI result, with their weight classification and healthy weight range
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Live Site URL: [Add live site URL here](https://arogersrenee.github.io/body-mass-index-calculator/)

## My process

### Built with

- HTML, CSS, JS
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

JavaScript was the major learning block during this challenge. I understood the logic behind the calculator but there were user habits that I had to account for. For example, when using the imperial BMI calulator, what if they don't input a value for stones but just use pounds? Two areas of code I was proud of: The first was remembering the spread operator to pass an array as an argument. Both the `convertMetricUnits()` and the `convertImperialUnits()` functions `return [weight, height]`. I then use the spread operator to pass those two values as arguments in my `calculateBMI()` function. See below:

```js
function convertMetricUnits() {
    let kilograms = metricWeight.value.trim();
    let centimeters = metricHeight.value.trim();
    height = Number(centimeters) / 2.54;
    weight = Number(kilograms) * 2.205;
    return [weight, height];
}

metricInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        if (metricHeight.value.trim() > 0){
            bmiScore.textContent = calculateBMI(...convertMetricUnits());
            printClassification();
            printMetricResultsRange();
        }; 
    })
})
```
The second challenge was figuring out a solution to print the healthy weight range for imperial units. It was hard to find a solution that would result in Stones for the whole number and lbs for the remainder. I learned the modulus operator was necessary calculate the remainer to get the value for pounds. 

```js
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
```

### Continued development

JavaScript is the area that I would like to improve on the most. I would like to get better at writing code with less variables in the global scope. This is an area that I'm not confident in. I know that my code is readable, I just want to make sure that I'm using best practice and avoiding things like "spaghetti code" and repeating myself. 


### Useful resources

- [Resource 1](https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l) - This helped me remember how to convert strings to numbers. I needed to convert the user inputs before running calculation. 
- [Resource 2](https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript) - This was helpful with rounding up up one decimal. The top voted solution gave a few options but I went with `Math.round`. I didn't want to use `toFixed()` because I didnt want the number to converst to a string, which I would then want to convert back to a number. 

## Author

- Website - [Ashley Rogers](https://www.finalfinalv1.com)
- Frontend Mentor - [@arogersrenee](https://www.frontendmentor.io/profile/arogersrenee)