// First column

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('currencyValue')

function fetchData() {
    fetch('https://api.exchangeratesapi.io/latest?base=PLN')
        .then(response => response.json())
        .then(data => {
            let currencyArray = data.rates;

            Object.entries(currencyArray).map(([key, value]) => {
                let li = createNode('li');
                let span = createNode('span');
                span.innerHTML = (`${key}: ${Math.round(value * 1000) / 1000}`);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(error => console.log(error))
}

fetchData()

// Currency select

const currencySelect = document.querySelectorAll("select");
let html = "";

function selectYourCurrency() {
    fetch('https://api.exchangeratesapi.io/latest')
        .then(response => response.json())
        .then(data => {
            const pickCurrencyArray = Object.keys(data.rates)

            pickCurrencyArray.map(item => {
                return html += `<option value=${item}>${item}</option>`
            });

            for (let i = 0; i < currencySelect.length; i++) {
                currencySelect[i].innerHTML = html;
            }
        })
}

selectYourCurrency()

//Second column

const dayValue = document.getElementById('dayValue');

function changeValue() {
    const selectBox = document.getElementById("selectBox");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    dayValue.innerHTML = "";

    fetch('https://api.exchangeratesapi.io/history?start_at=2021-01-14&end_at=2021-01-21&base=PLN')
        .then(response => response.json())
        .then(data => {
            let dataArray = data.rates;

            Object.entries(dataArray).filter(([key, value]) => {
                let li = createNode('li');

                li.innerHTML = (`${key}: ${Math.round(value[selectedValue] * 1000) / 1000}`);
                append(dayValue, li);
            })
        })
        .catch(error => console.log(error))
}