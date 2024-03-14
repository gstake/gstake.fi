import {memo} from 'react'
import styled from 'styled-components'
// import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import Image from 'next/image'
import EntranceEffWrapper from 'components/hoc/EntranceEffWrapper'

const SUPPORTED_NETWORKS = [
    {
        background: (
            <Image
                className="network-bg"
                src={'/static/img/gstake_bg_grt.png'}
                alt="network bg"
                width={540}
                height={320}
            />
        ),
        title: 'The Graph',
        href: 'https://testnet.gstake.fi',
        available: true,
        bgColor: 'linear-gradient(180deg, rgba(17, 18, 44, 0.00) 0%, #614996 100%)',
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
                src={'/static/img/gstake_bg_livepeer.png'}
                alt="network bg"
                width={540}
                height={320}
            />
        ),
        title: 'Livepeer',
        available: false,
        bgColor: 'linear-gradient(180deg, #0A170F 0%, rgba(36, 49, 42, 0.00) 100%)',
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
    {
        background: (
            <Image
                className="network-bg"
                src={'/static/img/gstake_bg_arweave.png'}
                alt="network bg"
                width={540}
                height={320}
            />
        ),
        title: 'Arweave',
        bgColor: 'linear-gradient(180deg, #12151A 0%, rgba(45, 45, 46, 0.00) 100%)',
        borderColor: '#818181',
        available: false,
        icon: (
            <Image
                className="network-icon"
                src={'/static/img/gstake_arwave.png'}
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
                src={'/static/img/gstake_bg_other.png'}
                alt="network bg"
                width={540}
                height={320}
            />
        ),
        title: 'Other Network',
        available: false,
        isContinue: true,
        bgColor: 'linear-gradient(180deg, rgba(47, 37, 31, 0.00) 0%, #1C1917 100%)',
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
]

const PageBanner = memo(() => {
    // const {t} = useTranslation('common')
    const router = useRouter()

    return (
        <BannerWrapper id="home">
            <div className="background">
                <div className="opacity-mask"></div>
                <Image
                    className="video-bg"
                    src={'/static/img/gstake_bg.jpg'}
                    alt="logo of binance"
                    width={708}
                    height={148}
                />

                <div className={`main-content ${router.locale}`}>
                    <div className="line1">The first liquidity staking protocol</div>
                    <div className="line2">
                        for <span>DePIN</span>
                    </div>

                    <div className="sub-title-line">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <path
                                d="M13.8747 41.298C15.9072 41.274 17.9346 41.0865 19.9369 40.7371C20.68 40.6195 21.3596 40.52 21.9849 40.4657C19.2664 38.7558 16.5479 37.6792 14.7808 37.6792C14.5405 37.6792 14.31 37.5839 14.1401 37.4142C13.9701 37.2446 13.8747 37.0145 13.8747 36.7745C13.8747 36.5346 13.9701 36.3045 14.1401 36.1348C14.31 35.9651 14.5405 35.8698 14.7808 35.8698H14.7836C19.5056 35.8716 31.0901 43.5923 31.0901 50.3449C31.0901 50.3513 31.0937 50.3567 31.0937 50.363V51.2704C-15.0122 61.2919 78.4582 61.8564 32.906 51.2813V50.3449C31.626 43.3135 46.751 26.8135 31.0937 44.8344C29.8208 42.8872 28.2575 41.1454 26.4577 39.6695C25.9204 38.1098 22.0148 27.7366 12.8779 29.4193C6.96059 30.505 4.60455 28.0623 4.58643 28.0352C4.44761 27.8761 4.25718 27.7708 4.04845 27.7377C3.83973 27.7046 3.62599 27.7459 3.44465 27.8542C3.26497 27.9612 3.12739 28.1263 3.05485 28.3222C2.9823 28.5181 2.97916 28.7329 3.04594 28.9308C3.22717 29.4374 7.4318 41.298 13.8747 41.298Z"
                                fill="white"
                            />
                        </svg>
                        Supported Networks
                    </div>

                    <EntranceEffWrapper threshold={0.4} animationListCount={4}>
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
                    </EntranceEffWrapper>
                </div>
            </div>
        </BannerWrapper>
    )
})

export default PageBanner

const BannerWrapper = styled.div`
    position: relative;
    width: 100%;
    min-width: 1200px;
    height: 1638px;
    /* padding-bottom: 56.25%; */
    background: #181d27;
    overflow: hidden;

    div.background {
        width: 100%;

        .video-bg {
            position: absolute;
            object-fit: fill;
            width: 2145px;
            height: 1638px;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            /* mix-blend-mode: screen; */
        }

        .opacity-mask {
            position: absolute;
            background: radial-gradient(circle, rgba(0, 0, 0, 0) 40%, #181d27 70%);
            width: 2145px;
            height: 1638px;
            top: 0;
            left: 50%;
            z-index: 1;
            transform: translate(-50%, 0);
        }

        video {
            position: absolute;
            object-fit: fill;
            width: 100%;
            height: 100%;
            z-index: 3;
        }
    }

    div.main-content {
        position: absolute;
        top: 300px;
        left: 50%;
        width: 1128px;
        transform: translate(-50%, 0);
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
            line-height: 160%; /* 102.4px */
            opacity: 0.8 !important;
        }
        .line2 {
            color: #fff;
            font-family: Bai Jamjuree;
            font-size: 64px;
            font-style: normal;
            font-weight: 500;
            line-height: 160%; /* 102.4px */
            opacity: 0.8 !important;

            > span {
                color: #fff;
                font-family: Bai Jamjuree;
                font-size: 64px;
                font-style: normal;
                font-weight: 700;
                line-height: 160%; /* 102.4px */
                background: linear-gradient(180deg, #36ff93 0%, #006ebe 100%);
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

const NetworkBlock = styled.div<{bgColor: string; borderColor: string}>`
    width: 540px;
    height: 320px;
    padding: 64px 64px 48px;
    position: relative;

    &:nth-of-type(3) {
        margin-top: 160px;
    }

    > .title-line {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #fff;
        font-family: Bai Jamjuree;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 44.8px */
        z-index: 1;
        position: relative;

        > img.network-icon {
            width: 64px;
            height: 64px;
            margin-right: 22px;
        }
    }

    > .link-button {
        width: 240px;
        height: 48px;
        background: ${(props) => props.bgColor};
        border: solid 1px ${(props) => props.borderColor};
        z-index: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-align: center;
        font-family: Bai Jamjuree;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 2.16px;
        border-radius: 8px;
        margin-top: 96px;
        cursor: pointer;
        transition: all 0.5s;

        > span {
            font-size: 13px;
        }

        &:hover {
            letter-spacing: 3px;

            &.disabled {
                letter-spacing: 2.16px;
            }
        }

        &.disabled {
            opacity: 0.4;
            cursor: default;
        }
    }

    > img.network-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`
