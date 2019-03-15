import axios from 'axios';

async function fetchAndCalculateChartData() {
    const { data } = await axios('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
    const stocksByTime = data['Time Series (5min)']

    for (let key in stocksByTime) {
        this.chartData.data.push(stocksByTime[key]['5. volume'])
        this.chartData.labels.push(key)
    }

    this.chartData.data = this.chartData.data.reverse();
    this.chartData.labels = this.chartData.labels.reverse();

    return this.chartData
}
export default class StockVolumeService {

    constructor() {
        this.chartData = {
            data: [],
            labels: []
        };
    }

    getChartData() {
        return fetchAndCalculateChartData.call(this)
    }
}