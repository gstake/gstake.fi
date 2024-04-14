import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import {useTranslation} from 'next-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import EntranceEffWrapper from 'components/hoc/EntranceEffWrapper'
import Header from 'components/common/Header'
import { Typewriter } from 'react-simple-typewriter'

const SUPPORTED_NETWORKS = [
    {
        background: (
            <Image
                className="network-bg"
                src={'/static/img/pic-one.jpg'}
                alt="network bg"
                width={1872}
                height={1088}
            />
        ),
        title: 'DePIN',
        available: false,
        isContinue: true,
        bgColor: 'linear-gradient(180deg, #36ff93 0%, #006ebe 100%)',
        borderColor: '#5B5656',
        icon: (
            <Image
                className="network-icon"
                src={'/static/img/gstake_other.png'}
                alt="network bg"
                width={64}
                height={64}
            />
        ),
    },
    {
        background: (
            <Image
                className="network-bg"
                src={'/static/img/pic-two.jpg'}
                alt="network bg"
                width={1872}
                height={1088}
            />
        ),
        title: 'The Graph',
        href: 'https://testnet.gstake.fi',
        available: true,
        bgColor: 'linear-gradient(180deg, #8371A8 0%, #ADA1C5 100%)',
        borderColor: '#676EB8',
        icon: (
            <Image
                className="network-icon"
                src={'/static/img/gstake_grt.png'}
                alt="network bg"
                width={64}
                height={64}
            />
        ),
    },
    {
        background: (
            <Image
                className="network-bg"
                src={'/static/img/pic-three.jpg'}
                alt="network bg"
                width={1872}
                height={1088}
            />
        ),
        title: 'Streamr',
        bgColor: 'linear-gradient(180deg, #B95450 0%, #D29492 100%)',
        borderColor: '#818181',
        available: false,
        icon: (
            <Image
                className="network-icon"
                src={'/static/img/gstake_streamer.png'}
                alt="network bg"
                width={64}
                height={64}
            />
        ),
    },
    {
        background: (
            <Image
                className="network-bg"
                src={'/static/img/pic-four.jpg'}
                alt="network bg"
                width={1872}
                height={1088}
            />
        ),
        title: 'Livepeer',
        available: false,
        bgColor: 'linear-gradient(180deg, #75F9FD 0%, #81F7FD 100%)',
        borderColor: '#3B4D45',
        icon: (
            <Image
                className="network-icon"
                src={'/static/img/gstake_livepeer.png'}
                alt="network bg"
                width={64}
                height={64}
            />
        ),
    },
]

const PageBanner = memo(() => {
    // const {t} = useTranslation('common')
    const router = useRouter()
    const innerRef = useRef<HTMLDivElement>()
    const [curItem, setCurItem] = useState(SUPPORTED_NETWORKS[0])
    const [bgHeight, setBgHeight] = useState(1000)
    const [fadingStat, setFadingStat] = useState('')

    const words = SUPPORTED_NETWORKS.map(x => x.title)

    useLayoutEffect(() => {
        console.log(innerRef.current?.clientWidth)
        const width = innerRef.current?.clientWidth
        const height = width / 1.72
        setBgHeight(height)
        setFadingStat('in')
    }, [])

    const onTypeChanged = (count) => {
        const curType = count % 4
        const newItem = SUPPORTED_NETWORKS[curType]
        console.log(curItem?.title)
        if (newItem.title !== curItem?.title) {
            if (!fadingStat || fadingStat === 'out') {
                setFadingStat('in')
            }
            setCurItem(newItem)
        }
    }

    const onDelete = () => {
        console.log(curItem?.title, 'deleted')
        if (fadingStat === 'in') {
            setFadingStat('out')
        }
    }

    return (
        <BannerWrapper fontBackground={curItem?.bgColor} id="home">
            <div style={{ height: bgHeight, overflow: 'hidden' }} ref={innerRef} className="inner">
                {
                    !!curItem &&
                    <div style={{ width: '100%', height: bgHeight, }} className={`${fadingStat} bg-wrap`}>
                        {curItem.background}
                    </div>
                }
                <Header isIndex={true} />
                <div className="background">
                    <div className={`main-content ${router.locale}`}>
                        <div className="line1">THE FIRST<br />LIQUIDITY STAKING PROTOCOL</div>
                        <div className="line2">
                            FOR <Typewriter delaySpeed={5000} loop onDelete={onDelete} onType={onTypeChanged} typeSpeed={200} deleteSpeed={200} words={words} cursor cursorBlinking />
                        </div>

                        <LaunchButton target='_blank' rel="noopener" href="https://gstake-interface-arbitrum-one.vercel.app/">
                            <span>Launch APP</span>
                            <Image className="network-icon"
                                src={'/static/img/launch_app_1.png'}
                                alt="network bg"
                                width={280}
                                height={68} />

                            <div className="beta-tag">
                                <Image className="network-icon"
                                    src={'/static/img/beta_tag.png'}
                                    alt="network bg"
                                    width={48}
                                    height={22} />
                            </div>
                        </LaunchButton>

                        {/* <div className="sub-title-line">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <path
                                    d="M13.8747 41.298C15.9072 41.274 17.9346 41.0865 19.9369 40.7371C20.68 40.6195 21.3596 40.52 21.9849 40.4657C19.2664 38.7558 16.5479 37.6792 14.7808 37.6792C14.5405 37.6792 14.31 37.5839 14.1401 37.4142C13.9701 37.2446 13.8747 37.0145 13.8747 36.7745C13.8747 36.5346 13.9701 36.3045 14.1401 36.1348C14.31 35.9651 14.5405 35.8698 14.7808 35.8698H14.7836C19.5056 35.8716 31.0901 43.5923 31.0901 50.3449C31.0901 50.3513 31.0937 50.3567 31.0937 50.363V51.2704C-15.0122 61.2919 78.4582 61.8564 32.906 51.2813V50.3449C31.626 43.3135 46.751 26.8135 31.0937 44.8344C29.8208 42.8872 28.2575 41.1454 26.4577 39.6695C25.9204 38.1098 22.0148 27.7366 12.8779 29.4193C6.96059 30.505 4.60455 28.0623 4.58643 28.0352C4.44761 27.8761 4.25718 27.7708 4.04845 27.7377C3.83973 27.7046 3.62599 27.7459 3.44465 27.8542C3.26497 27.9612 3.12739 28.1263 3.05485 28.3222C2.9823 28.5181 2.97916 28.7329 3.04594 28.9308C3.22717 29.4374 7.4318 41.298 13.8747 41.298Z"
                                    fill="white"
                                />
                            </svg>
                            Supported Networks
                        </div> */}

                        {/* <EntranceEffWrapper threshold={0.4} animationListCount={4}>
                            <div className="networks-wrap">
                                {SUPPORTED_NETWORKS.map((network, index) => (
                                    <NetworkBlock
                                        borderColor={network.borderColor}
                                        bgColor={network.bgColor}
                                        key={network.title}
                                        className={`up${index + 1}`}
                                    >
                                        <div className="title-line">
                                            {network.icon} {network.title}
                                        </div>
                                        {network.isContinue ? (
                                            <div className={'link-button disabled'}>continuous expansion</div>
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    if (!network.available) {
                                                        return
                                                    }

                                                    window.open(network.href)
                                                }}
                                                className={network.available ? 'link-button' : 'link-button disabled'}
                                            >
                                                {network.available ? (
                                                    <>
                                                        Staking now <span>(testnet)</span>
                                                    </>
                                                ) : (
                                                    'Coming Soon'
                                                )}
                                            </div>
                                        )}
                                        {network.background}
                                    </NetworkBlock>
                                ))}
                            </div>
                        </EntranceEffWrapper> */}
                    </div>
                </div>

            </div>
        </BannerWrapper>
    )
})

export default PageBanner

const BannerWrapper = styled.div<{ fontBackground?: string }>`
    position: relative;
    width: 100%;
    min-width: 1200px;
    padding: 18px;
    background: #040507;
    overflow: hidden;
    box-sizing: border-box;

    >.inner {
        width: 100%;
        min-width: 1200px;
        min-height: 900px;
        border-radius: 32px;
        padding: 18px;
        border: 1px solid #2E3549;
        position: relative;

        >.bg-wrap {
            position: absolute;
            width: 100%; 
            height: 100%;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 2s, transform  2s;
            transform: translateX(200px);
            overflow: hidden;

            &.in {
                opacity: 1;
                transform: translateX(0);
            }
            &.out {
                opacity: 0;
                transform: translateX(200px);
            }

            >img {
                width: 102%; 
                height: 102%;
                position: absolute;
                left: -1px;
                top: -1px;
            }
        }
    }

    div.main-content {
        position: absolute;
        top: 20%;
        left: 100px;
        width: 1128px;
        z-index: 4;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        .line1 {
            color: #fff;
            font-family: Bai Jamjuree;
            font-size: 64px;
            font-style: normal;
            font-weight: 500;
            line-height: 160%;
        }
        .line2 {
            color: #fff;
            font-family: Bai Jamjuree;
            font-size: 64px;
            font-style: normal;
            font-weight: 500;
            line-height: 160%;

            > span {
                color: #fff;
                font-family: Bai Jamjuree;
                font-size: 64px;
                font-style: normal;
                font-weight: 700;
                line-height: 160%; /* 102.4px */
                background: ${props => props.fontBackground || 'linear-gradient(180deg, #36ff93 0%, #006ebe 100%)'};
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                transition: all 0.5s;

                &:hover {
                    letter-spacing: 4px;
                }
            }
        }

        .sub-title-line {
            margin-top: 124px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            color: #fff;
            font-family: Poppins;
            font-size: 32px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            height: 64px;
            margin-bottom: 48px;
        }

        .networks-wrap {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 48px;
            height: 1000px;
        }
    }
    div.supported-networks {
        margin-top: 124px;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 180%;
        color: #fff;
        text-align: center;
        position: relative;
        z-index: 4;

        .title-line {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
    }
`

const LaunchButton = styled.a`
    width: 280px;
    height: 68px;
    position: relative;
    margin-top: 40px;
    
    span {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Bai Jamjuree;
        font-size: 22px;
        font-weight: 600;
        line-height: 27.5px;
        text-align: center;
    }

    .beta-tag {
        width: 48px;
        height: 22px;
        position: absolute;
        right: -12px;
        top: -11px;
        z-index: 1;
    }
`

// const NetworkBlock = styled.div<{ bgColor: string; borderColor: string }>`
//     width: 540px;
//     height: 320px;
//     padding: 64px 64px 48px;
//     position: relative;

//     &:nth-of-type(3) {
//         margin-top: 160px;
//     }

//     > .title-line {
//         display: flex;
//         align-items: center;
//         justify-content: flex-start;
//         color: #fff;
//         font-family: Bai Jamjuree;
//         font-size: 32px;
//         font-style: normal;
//         font-weight: 500;
//         line-height: 140%; /* 44.8px */
//         z-index: 1;
//         position: relative;

//         > img.network-icon {
//             width: 64px;
//             height: 64px;
//             margin-right: 22px;
//         }
//     }

//     > .link-button {
//         width: 240px;
//         height: 48px;
//         background: ${(props) => props.bgColor};
//         border: solid 1px ${(props) => props.borderColor};
//         z-index: 1;
//         position: relative;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: #fff;
//         text-align: center;
//         font-family: Bai Jamjuree;
//         font-size: 18px;
//         font-style: normal;
//         font-weight: 400;
//         line-height: 140%;
//         letter-spacing: 2.16px;
//         border-radius: 8px;
//         margin-top: 96px;
//         cursor: pointer;
//         transition: all 0.5s;

//         > span {
//             font-size: 13px;
//         }

//         &:hover {
//             letter-spacing: 3px;

//             &.disabled {
//                 letter-spacing: 2.16px;
//             }
//         }

//         &.disabled {
//             opacity: 0.4;
//             cursor: default;
//         }
//     }

//     > img.network-bg {
//         position: absolute;
//         left: 0;
//         top: 0;
//         width: 100%;
//         height: 100%;
//     }
// `
