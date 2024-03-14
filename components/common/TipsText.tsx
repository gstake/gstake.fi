import {memo} from 'react'
import Tooltip from 'rc-tooltip'
import styled from 'styled-components'

interface TipsTextProps {
    placement?: string // 弹层位置，见下方 arrowPlacementMap
    text: string | React.ReactNode // 弹层内容，可 text 或者节点 html
    title: string | React.ReactNode // 触发弹层的文本
    titleStyle?: object // 自定义文本样式，传入样式 style object
    overlayStyle?: {
        // 自定义文本样式，传入样式 style object
        background?: string
    } // 弹层样式
    overlayClassName?: string // 自定义弹层父元素类名，用于自定义样式
    prefix?: string | React.ReactNode // prefix 与 suffix，主用于传入 icon
    suffix?: string | React.ReactNode
}

const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1,
}
const arrowWidth = 12,
    horizontalArrowShift = 22
// verticalArrowShift = 8
const targetOffset = [0, 0]
const builtinPlacements = {
    left: {
        points: ['cr', 'cl'],
        overflow: autoAdjustOverflow,
        offset: [-10, 0],
        targetOffset: targetOffset,
    },
    right: {
        points: ['cl', 'cr'],
        overflow: autoAdjustOverflow,
        offset: [10, 0],
        targetOffset: targetOffset,
    },
    top: {
        points: ['bc', 'tc'],
        overflow: autoAdjustOverflow,
        offset: [0, -10],
        targetOffset: targetOffset,
    },
    bottom: {
        points: ['tc', 'bc'],
        overflow: autoAdjustOverflow,
        offset: [0, 10],
        targetOffset: targetOffset,
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [-(horizontalArrowShift + arrowWidth), -10],
        targetOffset: targetOffset,
    },
    leftTop: {
        points: ['tr', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [-10, 0],
        targetOffset: targetOffset,
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -10],
        targetOffset: targetOffset,
    },
    rightTop: {
        points: ['tl', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [10, 0],
        targetOffset: targetOffset,
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 10],
        targetOffset: targetOffset,
    },
    rightBottom: {
        points: ['bl', 'br'],
        overflow: autoAdjustOverflow,
        offset: [10, 0],
        targetOffset: targetOffset,
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 10],
        targetOffset: targetOffset,
    },
    leftBottom: {
        points: ['br', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [-10, 0],
        targetOffset: targetOffset,
    },
}
const arrowPlacementMap = {
    right: 'borderRightColor',
    rightTop: 'borderRightColor',
    rightBottom: 'borderRightColor',

    top: 'borderTopColor',
    topLeft: 'borderTopColor',
    topRight: 'borderTopColor',

    left: 'borderLeftColor',
    leftTop: 'borderLeftColor',
    leftBottom: 'borderLeftColor',

    bottom: 'borderBottomColor',
    bottomLeft: 'borderBottomColor',
    bottomRight: 'borderBottomColor',
}

const TipsText = memo(
    ({
        // defaultStyle,
        placement = 'top',
        title = '',
        titleStyle = {},
        text,
        overlayStyle = {
            background: '',
        },
        overlayClassName = '',
        prefix,
        suffix,
    }: TipsTextProps) => {
        const arrowColor = overlayStyle.background
            ? {
                  [arrowPlacementMap[placement]]: overlayStyle.background,
              }
            : {
                  [arrowPlacementMap[placement]]: 'rgb(40, 43, 50)',
              }

        return (
            <Wrapper>
                <Tooltip
                    trigger={['hover']}
                    // overlay={text}
                    placement={placement}
                    // destroyTooltipOnHide={true}
                    overlayClassName={overlayClassName}
                    arrowContent={<div style={{...arrowColor}} className="rc-tooltip-custom-arrow"></div>}
                    overlay={
                        <div style={{...overlayStyle}} className="rc-tooltip-custom-inner">
                            {text}
                        </div>
                    }
                    onPopupAlign={() => true}
                    builtinPlacements={builtinPlacements}
                >
                    <TitleWrap>
                        {!!prefix && <div className="prefix">{prefix}</div>}
                        <span style={{...titleStyle}} className="tooltip-title">
                            {title}
                        </span>
                        {!!suffix && <div className="suffix">{suffix}</div>}
                    </TitleWrap>
                </Tooltip>
            </Wrapper>
        )
    }
)

const Wrapper = styled.span`
    display: inline-block;
    cursor: pointer;
`

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .prefix {
        margin-right: 4px;
    }
    .suffix {
        margin-left: 4px;
    }
`

export default TipsText
