import React, {Component} from 'react'
// import './index.css'
import {withRouter, NextRouter} from 'next/router'

interface WithRouterProps {
    router: NextRouter
}

class TextCountDown extends Component<
    WithRouterProps & {leftTime: number},
    {leftTime: number; exiting: boolean; timeText: string}
> {
    raf: any
    constructor(props) {
        super(props)
        this.state = {
            leftTime: props.leftTime || 0,
            exiting: false,
            timeText: '',
        }
        // this.timeCounter = null;
        this.raf = null
    }

    componentDidMount() {
        this.init()
        this.run()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {leftTime: curTime} = this.props
        const {leftTime: nextTime} = nextProps
        if (nextTime > 0 && curTime !== nextTime) {
            this.setState(
                {
                    leftTime: nextTime,
                },
                () => {
                    cancelAnimationFrame(this.raf)
                    this.init()
                    this.run()
                }
            )
        }
    }

    componentWillUnmount() {
        this.setState({
            exiting: true,
        })
    }

    // 初始化数字
    init() {
        const {leftTime} = this.state
        const nowTimeStr = this.formatDate(leftTime, 'DDHHIISS')
        // for (let i = 0; i < this.flipObjs.length; i++) {
        //   this.flipObjs[i].current.setFront(nowTimeStr[i])
        // }
        this.setState({timeText: nowTimeStr})
    }

    // 开始计时
    run() {
        let {leftTime: targetTime} = this.state
        let lastTime = 0

        const _CountDownLoop = () => {
            if (this.state.exiting) {
                return
            }
            if (Date.now() - lastTime >= 1000) {
                const nowTimeStr = this.formatDate(targetTime, 'DDHHIISS')
                targetTime -= 1000
                this.setState({timeText: nowTimeStr})
                lastTime = Date.now()
            }

            if (targetTime > 0) {
                this.raf = requestAnimationFrame(() => {
                    _CountDownLoop()
                })
            }
        }

        _CountDownLoop()
    }

    // 正则格式化日期
    formatDate(date, dateFormat) {
        const {locale} = this.props.router
        const timeText = {
            'zh-CN': {
                launch_day: '天',
                launch_hour: '小时',
                launch_minute: '分',
                launch_second: '秒',
            },
            'zh-HK': {
                launch_day: '天',
                launch_hour: '小時',
                launch_minute: '分',
                launch_second: '秒',
            },
            en: {
                launch_day: 'D',
                launch_hour: 'H',
                launch_minute: 'Min',
                launch_second: 'S',
            },
            'ko-KR': {
                launch_day: 'D',
                launch_hour: 'H',
                launch_minute: 'Min',
                launch_second: 'S',
            },
        }
        // 格式化月、日、时、分、秒
        const o = {
            'D+': parseInt(`${date / (1000 * 60 * 60 * 24)}`, 10),
            'H+': parseInt(`${(date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)}`, 10),
            'I+': parseInt(`${(date % (1000 * 60 * 60)) / (1000 * 60)}`, 10),
            'S+': (date % (1000 * 60)) / 1000,
        }

        const dayText = {
            'D+': timeText[locale].launch_day,
            'H+': timeText[locale].launch_hour,
            'I+': timeText[locale].launch_minute,
            'S+': timeText[locale].launch_second,
        }

        Object.keys(o).forEach((k) => {
            if (new RegExp(`(${k})`).test(dateFormat)) {
                // 取出对应的值
                const str = `${o[k]}`
                const textStr = `${dayText[k]}`
                /* 根据设置的格式，输出对应的字符
                 * 例如: 早上8时，hh => 08，h => 8
                 * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
                 * 例如: 下午15时，hh => 15, h => 15
                 */
                dateFormat = dateFormat.replace(
                    RegExp.$1,
                    // RegExp.$1.length === 1 ? str : this.padLeftZero(str)
                    +str + textStr + ' '
                )
            }
        })
        return dateFormat
    }

    // 日期时间补零
    padLeftZero(str) {
        return `00${str}`.substr(str.length)
    }

    render() {
        const {timeText} = this.state
        return <div>{timeText}</div>
    }
}
export default withRouter(TextCountDown)
