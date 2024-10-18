function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tablinks").click();
});

// Search for cryptocurrency rate
async function searchCrypto() {
    const cryptoName = document.getElementById('cryptoInput').value.toUpperCase();
    const currency = document.getElementById('currencySelect').value;
    const resultDiv = document.getElementById('result');
    const apiKey = '326A5B44-FAA8-426C-B9DD-2FDDDD509E94'; // API KEY

    if (!cryptoName) {
        resultDiv.innerHTML = 'Please enter a cryptocurrency name.';
        return;
    }

    try {
        const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${cryptoName}/${currency}`, {
            headers: {
                'X-CoinAPI-Key': apiKey
            }
        });
        const data = await response.json();
        
        if (data.rate) {
            const formattedRate = Number(data.rate).toFixed(2).toLocaleString();
            resultDiv.innerHTML = `1 ${cryptoName} = ${currency} ${formattedRate}`;
        } else {
            resultDiv.innerHTML = 'Cryptocurrency not found. Please try again.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data. Please try again later.';
    }
}


// Use to clear the fields
function clearFields() {
    document.getElementById('cryptoInput').value = '';
    document.getElementById('currencySelect').value = 'USD';
    document.getElementById('result').innerHTML = '';
}

async function fetchLivePrices() {
    const livePricesDiv = document.getElementById('livePrices');
    livePricesDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
        const data = await response.json();

        livePricesDiv.innerHTML = data.map(coin => `
            <div class="coin-price">
                <div class="logo"><img src="${coin.image}" alt="${coin.name} logo"></div>
                <div>
                    <h1>$<span>${coin.current_price.toLocaleString()}</span></h1>
                    <h1>${coin.name}</h1>
                </div>
            </div>
        `).join('');
    } catch (error) {
        livePricesDiv.innerHTML = 'Error fetching live prices. Please try again later.';
    }
}

// Call function to fetch live prices when the page loads
document.addEventListener('DOMContentLoaded', fetchLivePrices);