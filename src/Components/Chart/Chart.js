import React, { useEffect, useState, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { DATASET_CONFIG, THRESHOLD_LINE_CONFIG } from '../../Constants/chart-config'
import { POPULATION_ISRAEL_API, STOCK_VOLUME_API } from '../../Constants/apis'
import IsraelPopulationService from '../../Services/israel-population-service'
import StockVolumeService from '../../Services/stock-volume-service'
import { Loader, Dimmer } from 'semantic-ui-react'
import 'chartjs-plugin-annotation'

const Chart = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const { filters, setError } = props
    const mountedDataPoints = useRef();
    const mountedThreshold = useRef();

    const services = {
        [POPULATION_ISRAEL_API.TITLE]: new IsraelPopulationService(),
        [STOCK_VOLUME_API.TITLE]: new StockVolumeService(),
    }
    const [chartData, setChartData] = useState({
        ...DATASET_CONFIG,
        labels: POPULATION_ISRAEL_API.LABELS
    });

    const [annotation, setAnnotation] = useState({
        ...THRESHOLD_LINE_CONFIG,
    });

    const calculateAndSetAnnotation = (data) => {
        if (!filters.threshold) {
            const newAnnotation = { ...annotation }
            newAnnotation.annotations[0].value = Math.round(Math.max(...data) * 0.98)
            newAnnotation.annotations[0].label.content = Math.round(Math.max(...data) * 0.98)
            setAnnotation(newAnnotation)
        }
    }

    useEffect(() => {
        try {
            setIsLoading(true)
            services[filters.currentAPI.TITLE].getChartData().then(({ data, labels }) => {
                const newChartData = { ...chartData, labels, cachedData: data }
                newChartData.datasets[0].data = data
                newChartData.datasets[0].label = filters.currentAPI.TITLE
                setChartData(newChartData)

                calculateAndSetAnnotation(data)
                setIsLoading(false)
            })
        }
        catch (e) {
            setError('Fetching chart data failed')
        }
    }, [filters.currentAPI])

    useEffect(() => {
        if (!mountedDataPoints.current) {
            mountedDataPoints.current = true;
        } else {
            //componentDidUpate logic
            try {
                const newChartData = { ...chartData }
                newChartData.datasets[0].data = newChartData.cachedData.slice(0, filters.numOfDataPoints)
                setChartData(newChartData)
                calculateAndSetAnnotation(newChartData.datasets[0].data)
            }
            catch (e) {
                setError('Setting number of data points failed')
            }
        }
    }, [filters.numOfDataPoints])

    useEffect(() => {
        if (!mountedThreshold.current) {
            mountedThreshold.current = true;
        } else {
            //componentDidUpate logic
            try {
                const newAnnotation = { ...annotation }
                newAnnotation.annotations[0].value = filters.threshold
                newAnnotation.annotations[0].label.content = filters.threshold
                setAnnotation(newAnnotation)

                // in order to re-render chart, the dataset must be changed
                const newChartData = { ...chartData }
                newChartData.datasets[0][Math.random()] = null
                setChartData(newChartData)
            }
            catch (e) {
                setError('Setting the threshold failed')
            }
        }
    }, [filters.threshold])

    return (
        <Wrapper>
            {isLoading ?
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer> :
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        annotation
                    }} />}
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
