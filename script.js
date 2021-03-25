

// Placeholder Function for before Form is submitted
const updateQuantityCost= () => {

    /*
    localStorage.setItem("bitcoin-amount", 0.00135035);
    localStorage.setItem("ether-amount", 0.063578);
    localStorage.setItem("bitcoin-cost", 29621.95);
    localStorage.setItem("ether-cost", 1101.17);
    */
    localStorage.setItem("bitcoin-amount", document.getElementById("form-bitcoin-amount").value);
    localStorage.setItem("bitcoin-cost", document.getElementById("form-bitcoin-cost").value);
    localStorage.setItem("ether-amount", document.getElementById("form-ether-amount").value);
    localStorage.setItem("ether-cost", document.getElementById("form-ether-cost").value);
}

const declarelocalStorageValues = () => {
    if (localStorage.getItem("bitcoin-amount") == null){
        localStorage.setItem("bitcoin-amount", 0);
    }
    if (localStorage.getItem("ether-amount") == null){
        localStorage.setItem("ether-amount", 0);
    }
    if (localStorage.getItem("bitcoin-cost") == null){
        localStorage.setItem("bitcoin-cost", 0);
    }
    if (localStorage.getItem("ether-cost") == null){
        localStorage.setItem("ether-cost", 0);
    }
    console.log("initial 0 values declared");
}

const reset = () => {
    localStorage.setItem("bitcoin-amount", 0);
    localStorage.setItem("ether-amount", 0);
    localStorage.setItem("bitcoin-cost", 0);
    localStorage.setItem("ether-cost", 0);
    update();
}



// API Fetch Function
const getData = async (url) => {

	const retrieve= await fetch(url);
	const data = await retrieve.json();
	return data;
};




const update = () => {

    // Run fetch function and set current market prices in localStorage
    getData("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd").then(data => {
    console.log(data);
    localStorage.setItem("bitcoin-currentvalue", data.bitcoin.usd);
    localStorage.setItem("ether-currentvalue", data.ethereum.usd);
    })
    .catch((error) => {
    console.log("error" + error);
    });


    //                                       <!--     Update Coin Containers:        --!>
    console.log("commence update containers");
    //Total Portfolio Value:
    let value = (localStorage.getItem("bitcoin-currentvalue") * localStorage.getItem("bitcoin-amount")) + (localStorage.getItem("ether-currentvalue") * localStorage.getItem("ether-amount"));
    document.getElementById("totalPortfolio").innerText = value.toFixed(2);

    //Total Portfolio Cost:
    let cost = ((localStorage.getItem("bitcoin-cost")) * (localStorage.getItem("bitcoin-amount"))) + ((localStorage.getItem("ether-cost")) * (localStorage.getItem("ether-amount")));
    document.getElementById("cost").innerText = cost.toFixed(2);

    //Total Portfolio Profit:
    let totalProfit = (value.toFixed(2) - cost.toFixed(2)).toFixed(2);
    let totalProfitPercentage = 0;
    if (value != 0){
        totalProfitPercentage = (100*((value-cost)/cost)).toFixed(1);
    }
    
    if (totalProfit > 0) {
        document.getElementById("profit").style.color = "green";
    } else if (totalProfit < 0){
        document.getElementById("profit").style.color = "red";
    }
    document.getElementById("profit").innerText = "$" + totalProfit+ " ("  + totalProfitPercentage + "%)";

    //Bitcoin Card Update:
    document.getElementById("bitcoin").innerText = localStorage.getItem("bitcoin-currentvalue");
    document.getElementById("bitcoin-owned").innerText= localStorage.getItem("bitcoin-amount");
    document.getElementById("bitcoin-cost").innerText= localStorage.getItem("bitcoin-cost");
    let bitcoinEquity = (localStorage.getItem("bitcoin-amount") * localStorage.getItem("bitcoin-currentvalue")).toFixed(2);
    document.getElementById("bitcoin-value").innerText = bitcoinEquity;
    let bitcoinTotalCost = ((localStorage.getItem("bitcoin-amount")) * localStorage.getItem("bitcoin-cost")).toFixed(2);
    document.getElementById("bitcoin-totalCost").innerText = bitcoinTotalCost;
    let bitcoinGains= ((localStorage.getItem("bitcoin-amount") * localStorage.getItem("bitcoin-currentvalue")) - (localStorage.getItem("bitcoin-amount") * localStorage.getItem("bitcoin-cost"))).toFixed(2);
    let bitcoinGainsPercentage = 0;
    if(bitcoinGains != 0){
        bitcoinGainsPercentage = (((bitcoinEquity - bitcoinTotalCost)/(bitcoinTotalCost)) * 100).toFixed(2);
    }
    
    document.getElementById("bitcoin-gain").innerText = "$" + bitcoinGains + "(" + bitcoinGainsPercentage + "%)";
    if (bitcoinGains > 0){
        document.getElementById("bitcoin-gain").style.color = "green";
    } else if (bitcoinGains < 0){
        document.getElementById("bitcoin-gain").style.color = "red";
    }
    
    
    
    //Ether Card Update:
    document.getElementById("ether").innerText = localStorage.getItem("ether-currentvalue");
    document.getElementById("ether-owned").innerText= localStorage.getItem("ether-amount"); 
    document.getElementById("ether-cost").innerText= localStorage.getItem("ether-cost");  
    let etherEquity = (localStorage.getItem("ether-amount") * localStorage.getItem("ether-currentvalue")).toFixed(2);
    document.getElementById("ether-value").innerText= etherEquity;
    let etherTotalCost = ((localStorage.getItem("ether-amount")) * localStorage.getItem("ether-cost")).toFixed(2);
    document.getElementById("ether-totalCost").innerText = etherTotalCost;
    let etherGains = ((localStorage.getItem("ether-amount") * localStorage.getItem("ether-currentvalue")) - (localStorage.getItem("ether-amount") * localStorage.getItem("ether-cost"))).toFixed(2);
    let etherGainsPercentage = 0;
    if(etherGains != 0){
        etherGainsPercentage = (((bitcoinEquity - bitcoinTotalCost)/(bitcoinTotalCost)) * 100).toFixed(2);
    }
    document.getElementById("ether-gain").innerText = "$" +  etherGains + "(" + etherGainsPercentage + "%)";
    if (etherGains > 0){
        document.getElementById("ether-gain").style.color = "green";
    } else if (etherGains < 0){
        document.getElementById("ether-gain").style.color = "red";
    }
};






declarelocalStorageValues();
update();