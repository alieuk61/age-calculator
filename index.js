const numbers = document.querySelectorAll('.number');
const inputs = document.querySelectorAll('.input');
const enterButton = document.querySelector('.enter_btn');
const errorMessages = document.querySelectorAll('.error');

let birthDay;
let birthMonth;
let birthYear;
let error = {day: false, month: false, year: false};
let required = {day: false, month: false, year: false}
let age = 0;

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

const resetState = () => {
    //reset everything to how it was at the start if maybe there was an error ??
}

function calculateAge() {
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    // Adjust month if its negative
    if (months < 0 || (months === 0 && days < 0)) { //basically if months is less than 0 or both, the birthday hasn't happened this year yet and the month isnt here yet
        years--; //we remove a year from their "age" or borrowed a year and we're going to convert it to months and add it onto the negative number
        months += 12; //we then add 12 to the months
    }
    if (days < 0) {
        const prevMonth = new Date(currentDate);
        prevMonth.setMonth(currentMonth - 1);
        days += Math.round((currentDate - prevMonth) / (1000 * 60 * 60 * 24));
    }

    return { years, months, days };
}

enterButton.addEventListener('click', function() {
    //we want to calculate the age by using formula: current dat - DOB

    //what happens if they pass in a day thats higher than the amount of days in that month?

    inputs.forEach((input, index) => {
        const value = parseInt(input.value); // Convert input value to integer & can also get the input of an input without needing an eventlistener
        const valueString = input.value.trim();
        switch (index) {
            case 0: // Day
                if (valueString.length == 0) {
                    errorMessages[index].textContent = 'This field is required';
                    errorMessages[index].style.display = 'block';
                    required.day = true;
                } else {
                    isNaN(value) || value > 31 || value < 1|| valueString.length !== 2 ? error.day = true : (birthDay = value, error.day = false);
                    error.day ? errorMessages[index].style.display = 'block' : null;
                }
                break;
            case 1: // Month
                if (valueString.length == 0) {
                    errorMessages[index].textContent = 'This field is required';
                    errorMessages[index].style.display = 'block';
                    required.month = true
                } else {
                    isNaN(value) || value > 12 || value < 1 || valueString.length !== 2 ? error.month = true : (birthMonth = value, error.month = false);
                    error.month ? errorMessages[index].style.display = 'block' : null;
                }
                break;
            case 2: // Year
                if (valueString.length == 0) {
                    errorMessages[index].textContent = 'This field is required';
                    errorMessages[index].style.display = 'block' ;
                    required.year = true;
                } else {
                    value > currentYear || value < 1990 || valueString.length !== 4 ? error.year = true : (birthYear = value,  error.day = false);
                    error.year ? errorMessages[index].style.display = 'block' : null;
                }
                break;
            default:
                break;
        }
    });
    console.log("Day:", birthDay, "Month:", birthMonth, "Year:", birthYear, error, required);
    console.log(currentDate, currentYear)

    const hasError = Object.values(error).some(value => value === true);
    const inputRequired = Object.values(required).some(value => value === true);
    console.log (hasError)

    if (!hasError && !inputRequired) {
        numbers.forEach((number, index) => {
            switch (index) {
                case 0:
                    number.textContent = calculateAge().years
                    break;
                case 1:
                    number.textContent = calculateAge().months
                    break;
                case 2:
                    number.textContent = calculateAge().days
                    break;
                default:
                    break;
            }
        });
    } else {
        numbers.forEach((num) => {num.textContent = '--'})
    }
});
