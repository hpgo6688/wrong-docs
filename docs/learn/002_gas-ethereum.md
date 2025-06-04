```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ethereum Gas Prices</title>
    <style>
        #low-price {
            color: #00a186;
        }

        #average-price {
            color: #0784c3;
        }

        #high-price {
            color: #dc3545;
        }

        #gas-prices {
            display: flex;
            justify-content: space-around;
            margin: 20px;
            font-weight: bolder;
        }

        .price-level {
            background-color: #333;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            width: 200px;
        }

        .price {
            font-size: 24px;
            margin: 10px 0;
        }

        .time,
        .details {
            font-size: 14px;
            color: #aaa;
        }
    </style>
</head>

<body>
    <div id="gas-prices">
        <div class="price-level">
            <h3>Low</h3>
            <p class="price" id="low-price"></p>
            <p class="details" id="low-details"></p>
            <p class="time" id="low-time"></p>
        </div>
        <div class="price-level">
            <h3>Average</h3>
            <p class="price" id="average-price"></p>
            <p class="details" id="average-details"></p>
            <p class="time" id="average-time"></p>
        </div>
        <div class="price-level">
            <h3>High</h3>
            <p class="price" id="high-price"></p>
            <p class="details" id="high-details"></p>
            <p class="time" id="high-time"></p>
        </div>
    </div>

    <script>
        async function fetchGasPrices() {
            const response = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=XD2UM9Q8ENEACEFV5VK37IFU69WW3XTBT3');
            const data = await response.json();
            return data.result;
        }

        function calculatePriorityFee(gasPrice, baseFee) {
            return (parseFloat(gasPrice) - parseFloat(baseFee)).toFixed(3);
        }

        function formatValue(val) {
            return parseFloat(val).toFixed(3);
        }

        function estimateTime(gasPrice) {
            if (gasPrice < 0.8) return "~ 2 mins: 0 secs";
            if (gasPrice < 1.2) return "~ 1 min: 44 secs";
            return "~ 30 secs";
        }

        async function updateUI() {
            const gasPrices = await fetchGasPrices();

            const baseFee = gasPrices.suggestBaseFee;
            const low = gasPrices.SafeGasPrice;
            const average = gasPrices.ProposeGasPrice;
            const high = gasPrices.FastGasPrice;

            const lowPriority = calculatePriorityFee(low, baseFee);
            const averagePriority = calculatePriorityFee(average, baseFee);
            const highPriority = calculatePriorityFee(high, baseFee);

            document.getElementById('low-price').innerText = `${formatValue(low)} gwei`;
            document.getElementById('average-price').innerText = `${formatValue(average)} gwei`;
            document.getElementById('high-price').innerText = `${formatValue(high)} gwei`;

            document.getElementById('low-details').innerText = `Base: ${formatValue(baseFee)} | Priority: ${lowPriority}`;
            document.getElementById('average-details').innerText = `Base: ${formatValue(baseFee)} | Priority: ${averagePriority}`;
            document.getElementById('high-details').innerText = `Base: ${formatValue(baseFee)} | Priority: ${highPriority}`;

            document.getElementById('low-time').innerText = `${estimateTime(low)}`;
            document.getElementById('average-time').innerText = `${estimateTime(average)}`;
            document.getElementById('high-time').innerText = `${estimateTime(high)}`;
        }

        updateUI();
        setInterval(updateUI, 60000); // 每分钟更新一次
    </script>
</body>

</html>
```
