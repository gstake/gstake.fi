import {useRef, useMemo, useEffect} from 'react'
import styled from 'styled-components'
import _sortBy from 'lodash/sortBy'
import {useRouter} from 'next/router'

import depthChart from 'deepthcharts/dist/main.min.js'

const flatArr = (data) => {
    const res = []

    data.map((item) => {
        res.push({
            price: Number(item[0]),
            volume: Number(item[1]),
        })
    })

    return res
}

const parseData = (data) => {
    const {ask, bid} = data
    const _res = {
        bids: [],
        asks: [],
    }

    if (bid && bid.length) {
        _res.bids = _sortBy(flatArr(bid), ['price']).reverse()
    }

    if (ask && ask.length) {
        _res.asks = _sortBy(flatArr(ask), ['price'])
    }

    return _res
}

const totalSum = (arr) => {
    if (arr.length) {
        let sum = 0

        arr.map((item) => {
            sum += item.volume
            item.volume = sum
        })
    }

    return arr
}

const DepthChart = ({
    data,
    volumePrecision,
    pricePrecision,
}: {
    data: any
    volumePrecision: number
    pricePrecision: number
}) => {
    const router = useRouter()

    const depthRef = useRef(null)
    const depthWrapRef = useRef(null)
    const chartRef = useRef(null)

    const formatData = useMemo(() => {
        const _d = parseData(data) || {
            bids: [],
            asks: [],
        }

        if (_d.bids.length) {
            _d.bids = totalSum(_d.bids)
        }

        if (_d.asks.length) {
            _d.asks = totalSum(_d.asks)
        }

        if (!_d.bids.length && _d.asks.length) {
            _d.bids = [{volume: 0, price: _d.asks[0].price}]
        }

        if (!_d.asks.length && _d.bids.length) {
            _d.asks = [{volume: 0, price: _d.bids[0].price}]
        }

        return _d
    }, [data])

    useEffect(() => {
        const {clientWidth, clientHeight} = depthWrapRef.current

        chartRef.current = new depthChart({
            dom: depthRef.current,
            width: clientWidth + 20,
            height: clientHeight,
            decimal: {
                price: pricePrecision,
                value: volumePrecision,
            },
            data: {
                bids: [],
                asks: [],
            },
            locale: router.locale === 'zh-CN' ? 'zh' : router.locale === 'zh-HK' ? 'hk' : 'en',
        })
    }, [pricePrecision, volumePrecision])

    useEffect(() => {
        if (formatData && chartRef.current) {
            chartRef.current.updata(formatData, {
                price: pricePrecision,
                value: volumePrecision,
            })
        }
    }, [formatData, pricePrecision, volumePrecision])

    return (
        <Wrap ref={depthWrapRef}>
            <div ref={depthRef} id="depth"></div>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export default DepthChart
