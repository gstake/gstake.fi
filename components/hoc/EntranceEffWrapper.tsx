import React, {useRef, useState, useEffect} from 'react'
import {gsap} from 'gsap'
import {useInView} from 'react-intersection-observer'
import styled from 'styled-components'

// make elements of list is invisible at the first time
const createCSS = (list) => {
    return list.reduce((s, x) => {
        return `
      ${s}
      ${`${x.className} {
        opacity: 0;
      }`}`
    }, '')
}

const createAnimationList = (count): AnimationEle[] => {
    return new Array(count).fill({}).map((x, i) => {
        return {
            className: `.up${i + 1}`,
            delay: (i + 2) / 10,
        }
    })
}

interface AnimationEle {
    className: string
    delay: number
    props?: {
        x?: number
        y?: number
        startAt?: {
            x?: number
            opacity?: number
        }
    }
}

interface EffWrapperProps {
    list: AnimationEle[]
}

/*
  @props children: Elements wrapped by EnterEffWrapper, contains elements to animate (Which has className for gsap to select)

  @props threshold: pass to react-intersection-observer useInView to adjust start animation timing. default value is 0.4

  @props animationList: a list contains animation element classNames and each delay, if not passed, use default ANIMATION_LIST
*/
const EnterEffWrapper = ({children, threshold = 0.4, animationList = [], animationListCount = 5}) => {
    const {ref, inView} = useInView({
        threshold,
    })
    const [entered, setEntered] = useState(false)
    useEffect(() => {
        if (inView && !entered) {
            setEntered(true)
        }
    }, [inView, setEntered])

    const ElementRef = useRef()
    const gsapQuery = gsap.utils.selector(ElementRef)

    useEffect(() => {
        if (entered) {
            const _animationList = animationList.length ? animationList : createAnimationList(animationListCount)

            _animationList.forEach((x) => {
                gsap.to(
                    gsapQuery(x.className),
                    x.props
                        ? {
                              opacity: 1,
                              delay: x.delay,
                              duration: 0.6,
                              ease: 'power3',
                              ...x.props,
                          }
                        : {
                              y: 0,
                              opacity: 1,
                              delay: x.delay,
                              duration: 0.6,
                              startAt: {y: 30, opacity: 0},
                              ease: 'power3',
                          }
                )
            })
        }
    }, [entered])

    return (
        <EffWrapper
            list={animationList?.length ? animationList : createAnimationList(animationListCount)}
            ref={ElementRef}
        >
            <InViewObserver ref={ref}>{children}</InViewObserver>
        </EffWrapper>
    )
}

export default EnterEffWrapper

const EffWrapper = styled.div<EffWrapperProps>`
    ${(props) => (props.list ? createCSS(props.list) : '')}
`
const InViewObserver = styled.div``
