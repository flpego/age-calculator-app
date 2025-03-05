

const form = document.querySelector('#calculator-form');
const inputDays = document.querySelector('input[name="day"]');
const inputMonths = document.querySelector('input[name="month"]');
const inputYears = document.querySelector('input[name="year"]');

const yearsOutput = document.querySelector('#years-output');
const monthsOutput = document.querySelector('#months-output');
const daysOutput = document.querySelector('#days');

const calculateBtn = document.querySelector('#calculate')

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateDate();
});



const calculateDate = () => {
    const dateNow = new Date();
    const inputDate = new Date(inputYears.value, inputMonths.value - 1, inputDays.value);

    if (isNaN(inputDate.getTime())) {
        alert("Por favor, introduce una fecha válida.");
        return;
    }

    let years = dateNow.getFullYear() - inputDate.getFullYear();
    let months = dateNow.getMonth() - inputDate.getMonth();
    let days = dateNow.getDate() - inputDate.getDate();


    if (days < 0) {
        months -= 1;
        const lastMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 0);
        days += lastMonth.getDate();
    }

    
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    console.log(years, months, days);

    // Mostrar los resultados
    yearsOutput.textContent = years;
    monthsOutput.textContent = months;
    daysOutput.textContent = days;
}


