import axios from 'axios';

function fetchAndCalculateChartData() {
    this.chartData = {
        data: [],
        labels: [],
    };
    const promiseArray = []
    const fetchPopulation = (() => {
        let year = 2009
        return () => {
            this.chartData.labels = [...this.chartData.labels, year]
            return axios.get(`https://api.population.io/1.0/population/${year++}/Israel?format=json`)
        }
    })();

    for (let i = 0; i <= 10; i++) {
        promiseArray.push(fetchPopulation())
    }

    return axios.all(promiseArray)
        .then((responseArray) => {
            responseArray.forEach(({ data }) => {
                let population = 0
                data.forEach(({ total }) => {
                    population += total
                });
                this.chartData.data.push(population)
            });            
            return this.chartData
        });
}

export default class IsraelPopulationService {

    constructor() {
        this.chartData = null
    }

    getChartData() {
        if (!this.chartData) {
            return fetchAndCalculateChartData.call(this)
        }
        else {
            return Promise.resolve(this.chartData)
        }
    }
}