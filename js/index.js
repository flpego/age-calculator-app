
const form = document.querySelector("#calculator-form");
const yearOutput = document.querySelector("#years-output");
const monthOutput = document.querySelector("#months-output");
const dayOutput = document.querySelector("#days-output");
// Inputs
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const requiredErrors = document.querySelectorAll(".are-required");
const invalidDay = document.querySelector("#invalid-day");
const invalidMonth = document.querySelector("#invalid-month");
const invalidYear = document.querySelector("#invalid-year");
const invalidDate = document.querySelector("#invalid-date");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAllErrors();

    const day = dayInput.value.trim();
    const month = monthInput.value.trim();
    const year = yearInput.value.trim();

    let hasErrors = false;

    // requerid
    if (!day) {
        showError(dayInput, "required");
        hasErrors = true;
    }
    if (!month) {
        showError(monthInput, "required");
        hasErrors = true;
    }
    if (!year) {
        showError(yearInput, "required");
        hasErrors = true;
    }

    if (hasErrors) return;

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    const today = new Date();
    const currentYear = today.getFullYear();

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        invalidDay.classList.remove("hiddenError");
        hasErrors = true;
    }
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        invalidMonth.classList.remove("hiddenError");
        hasErrors = true;
    }
    if (isNaN(yearNum) || yearNum < 1 || yearNum > currentYear) {
        invalidYear.classList.remove("hiddenError");
        hasErrors = true;
    }

    // if month or day or year is out of range, show error
    if (hasErrors) return;

    // validate if the date is valid
    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (
        date.getFullYear() !== yearNum ||
        date.getMonth() !== monthNum - 1 ||
        date.getDate() !== dayNum
    ) {
        invalidDate.classList.remove("hiddenError");
        return;
    }

    // if date is valid, calculate the difference
    calculateDateDiff(dayNum, monthNum, yearNum);
    setTimeout(() => {
        resetInputs();
    }, 10000);
});

const hideAllErrors = () => {
    requiredErrors.forEach((span) => {
        span.classList.add("hiddenError");
        const fieldset = span.closest("fieldset");
        if (fieldset) fieldset.classList.remove("has-error");
    });

    [invalidDay, invalidMonth, invalidYear, invalidDate].forEach((span) => {
        span.classList.add("hiddenError");
        const fieldset = span.closest("fieldset");
        if (fieldset) fieldset.classList.remove("has-error");
    });
};

const showError = (input, type) => {
    const fieldset = input.parentElement;
    fieldset.classList.add("has-error");
    if (type === "required") {
        const requiredSpan = fieldset.querySelector(".are-required");
        requiredSpan.classList.remove("hiddenError");
    }

    if (type === "invalid-day") {
        const span = document.querySelector("#invalid-day");
        span.classList.remove("hiddenError");
    }

    if (type === "invalid-month") {
        const span = document.querySelector("#invalid-month");
        span.classList.remove("hiddenError");
    }

    if (type === "invalid-year") {
        const span = document.querySelector("#invalid-year");
        span.classList.remove("hiddenError");
    }

    if (type === "invalid-date") {
        const span = document.querySelector("#invalid-date");
        span.classList.remove("hiddenError");
    }

    // Estilo visual del fieldset y subcomponentes
    fieldset.classList.add("error");

};

const resetInputs = () => {
    dayInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
};

const renderOutput = (years, months, days) => {
    yearOutput.innerText = years;
    monthOutput.innerText = months;
    dayOutput.innerText = days;
};

const calculateDateDiff = (day, month, year) => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    let yearsDiff = currentYear - year;
    let monthsDiff = currentMonth - month;
    let daysDiff = currentDay - day;

    if (daysDiff < 0) {
        monthsDiff--;
        const daysInPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        daysDiff += daysInPreviousMonth;
    }

    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }

    renderOutput(yearsDiff, monthsDiff, daysDiff);
};