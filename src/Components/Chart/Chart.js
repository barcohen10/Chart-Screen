import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { DATASET_CONFIG } from '../../Constants/chart-config'
import { POPULATION_ISRAEL_API, STOCK_VOLUME_API } from '../../Constants/apis'
import IsraelPopulationService from '../../Services/israel-population-service'
import StockVolumeService from '../../Services/stock-volume-service'
import { Loader, Dimmer } from 'semantic-ui-react'

const Chart = (props) => {
    const [chartData, setChartData] = useState({
        ...DATASET_CONFIG,
        labels: POPULATION_ISRAEL_API.LABELS
    });
    const [isLoading, setIsLoading] = useState(true);

    const { filters } = props
    const services = {
        [POPULATION_ISRAEL_API.TITLE]: new IsraelPopulationService(),
        [STOCK_VOLUME_API.TITLE]: new StockVolumeService(),
    }

    useEffect(() => {
        setIsLoading(true)
        services[filters.currentAPI.TITLE].getChartData().then(({ data, labels }) => {
            const newChartData = { ...chartData }
            newChartData.datasets[0].data = data
            newChartData.datasets[0].label = filters.currentAPI.TITLE
            newChartData.labels = labels

            setChartData(newChartData)
            setIsLoading(false)
        })
    }, [filters])

    return (
        <Wrapper>
            {isLoading ?
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer> :
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />}
        </Wrapper>
    )
}

export default Chart

const Wrapper = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

