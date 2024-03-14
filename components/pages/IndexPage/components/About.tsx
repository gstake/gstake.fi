import {memo} from 'react'
import styled from 'styled-components'
// import {useTranslation} from 'next-i18next'

import EntranceEffWrapper from 'components/hoc/EntranceEffWrapper'
import Image from 'next/image'

const PageBanner = memo(() => {
    // const {t} = useTranslation('common')
    return (
        <PageWrapper>
            <div className="inner">
                <div className="sub-title-line">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <path
                            d="M13.8747 41.298C15.9072 41.274 17.9346 41.0865 19.9369 40.7371C20.68 40.6195 21.3596 40.52 21.9849 40.4657C19.2664 38.7558 16.5479 37.6792 14.7808 37.6792C14.5405 37.6792 14.31 37.5839 14.1401 37.4142C13.9701 37.2446 13.8747 37.0145 13.8747 36.7745C13.8747 36.5346 13.9701 36.3045 14.1401 36.1348C14.31 35.9651 14.5405 35.8698 14.7808 35.8698H14.7836C19.5056 35.8716 31.0901 43.5923 31.0901 50.3449C31.0901 50.3513 31.0937 50.3567 31.0937 50.363V51.2704C-15.0122 61.2919 78.4582 61.8564 32.906 51.2813V50.3449C31.626 43.3135 46.751 26.8135 31.0937 44.8344C29.8208 42.8872 28.2575 41.1454 26.4577 39.6695C25.9204 38.1098 22.0148 27.7366 12.8779 29.4193C6.96059 30.505 4.60455 28.0623 4.58643 28.0352C4.44761 27.8761 4.25718 27.7708 4.04845 27.7377C3.83973 27.7046 3.62599 27.7459 3.44465 27.8542C3.26497 27.9612 3.12739 28.1263 3.05485 28.3222C2.9823 28.5181 2.97916 28.7329 3.04594 28.9308C3.22717 29.4374 7.4318 41.298 13.8747 41.298Z"
                            fill="white"
                        />
                    </svg>
                    Why need Gstake
                </div>

                <EntranceEffWrapper threshold={0.4} animationListCount={4}>
                    <IntrosInner className="up1">
                        <div className="intro-section-1">
                            <div className="title up2">
                                Liquidity for <span>staked</span> tokens
                            </div>
                            <div className="intro up3">
                                Gstake is safe, convenient and efficient, allowing you to release the full liquidity of
                                your assets.
                            </div>
                        </div>

                        <Image
                            className="intro-bg up4"
                            src={'/static/img/gstake_intro.png'}
                            alt="intro bg"
                            width={540}
                            height={320}
                        />
                    </IntrosInner>
                </EntranceEffWrapper>

                <EntranceEffWrapper threshold={0.6} animationListCount={4}>
                    <IntrosInner className="up1">
                        <div className="intro-section-2">
                            <div className="single-line up2">
                                <div className="line1">
                                    <Image
                                        className="icon"
                                        src={'/static/img/gstake_leaf.png'}
                                        alt="intro bg"
                                        width={64}
                                        height={64}
                                    />
                                    Lower the Money for&nbsp;<span>stake</span>
                                </div>
                                <div className="intro">
                                    Stake any amount of your tokens to access staking rewards and receive Liquid Staking
                                    Token.
                                </div>
                            </div>

                            <div className="single-line up3">
                                <div className="line1">
                                    <Image
                                        className="icon"
                                        src={'/static/img/gstake_leaf.png'}
                                        alt="intro bg"
                                        width={64}
                                        height={64}
                                    />
                                    Lower the learning for&nbsp;<span>stake</span>
                                </div>
                                <div className="intro">
                                    Stake, Receive Liquid Staking Token, Use in Depin. Just three steps you can finish
                                    all things.
                                </div>
                            </div>
                        </div>
                        <Image
                            className="intro-bg"
                            src={'/static/img/gstake_intro_2.png'}
                            alt="intro bg"
                            width={540}
                            height={320}
                        />
                    </IntrosInner>
                </EntranceEffWrapper>

                <EntranceEffWrapper threshold={0.3} animationListCount={5}>
                    <IntroCardWrap>
                        <div className="single-card up1">
                            <div className="title">
                                Higher capital
                                <br />
                                <span>efficiency</span>
                            </div>

                            <Image
                                className="higher-capital up4"
                                src={'/static/img/gstake_capital.png'}
                                alt="intro bg"
                                width={288}
                                height={293}
                            />
                        </div>

                        <div className="single-card up3">
                            <div className="title">
                                Higher and more
                                <br />
                                stable&nbsp;<span>APY</span>
                            </div>

                            <Image
                                className="higher-more up5"
                                src={'/static/img/gstake_lines.png'}
                                alt="intro bg"
                                width={213}
                                height={164}
                            />
                        </div>
                    </IntroCardWrap>
                </EntranceEffWrapper>
            </div>
        </PageWrapper>
    )
})

export default PageBanner

const PageWrapper = styled.div`
    width: 100%;
    position: relative;
    background: #181d27;
    padding-bottom: 204px;

    .inner {
        width: 1128px;
        margin: 0 auto;

        .sub-title-line {
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
    }
`

export const PageInner = styled.div`
    width: 1200px;
    margin: 0 auto;
`

const IntrosInner = styled.div`
    width: 100%;
    height: 400px;
    border-radius: 16px;
    border: 1px solid #282f41;
    background: #1e2431;
    position: relative;
    margin-bottom: 110px;

    .intro {
        color: #8d95aa;
        font-family: Bai Jamjuree;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 33.6px */
    }

    .intro-section-1 {
        position: absolute;
        top: 110px;
        left: 564px;
        width: 488px;
        z-index: 1 !important;

        > .title {
            color: #fff;
            font-family: Bai Jamjuree;
            font-size: 32px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 44.8px */
            margin-bottom: 32px;

            > span {
                color: #fff;
                font-family: Bai Jamjuree;
                font-style: normal;
                font-weight: 700;
                background: linear-gradient(180deg, #36ff93 0%, #006ebe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }
    }

    .intro-section-2 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 52px 78px 0;

        .single-line {
            .line1 {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                > img {
                    margin-right: 6px;
                }

                color: #fff;
                font-family: Bai Jamjuree;
                font-size: 32px;
                font-style: normal;
                font-weight: 500;
                line-height: 140%; /* 44.8px */
                margin-bottom: 8px;

                > span {
                    color: #fff;
                    font-family: Bai Jamjuree;
                    font-style: normal;
                    font-weight: 700;
                    background: linear-gradient(180deg, #36ff93 0%, #006ebe 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            }

            > .intro {
                padding-left: 70px;
                margin-bottom: 40px;
            }
        }
    }

    > img {
        width: 100%;
        height: 100%;
    }
`

const IntroCardWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .single-card {
        width: 540px;
        height: 320px;
        border-radius: 16px;
        border: 1px solid #282f41;
        background: #1e2431;
        position: relative;
        padding: 64px;

        > .title {
            color: #fff;
            font-family: Bai Jamjuree;
            font-size: 32px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%; /* 44.8px */
            margin-bottom: 32px;

            > span {
                color: #fff;
                font-family: Bai Jamjuree;
                font-style: normal;
                font-weight: 700;
                background: linear-gradient(180deg, #36ff93 0%, #006ebe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }

        > .higher-capital {
            position: absolute;
            right: -9px;
            bottom: -37px;
        }

        > .higher-more {
            position: absolute;
            right: 64px;
            bottom: 0;
        }
    }
`
