import {memo} from 'react'
import styled from 'styled-components'
// import {useTranslation} from 'next-i18next'

import {LogoSvg} from 'components/common/Header'
import {PageInner} from './About'
import Image from 'next/image'

const PagePartner = memo(() => {
    // const {t} = useTranslation('common')
    return (
        <PagePartnerWrapper>
            <AreasInner>
                <ContactGroup>
                    <a target="_blank" rel="noopener" href="https://github.com/gstake">
                        <SingleContact>
                            <Image
                                className="higher-more"
                                src={'/static/img/gstake_github.png'}
                                alt="intro bg"
                                width={64}
                                height={64}
                            />
                            <div>
                                <div className="title">Github</div>
                                <div className="mail">Contribute</div>
                            </div>
                        </SingleContact>
                    </a>
                    <a target="_blank" rel="noopener" href="https://twitter.com/gstakefinance">
                        <SingleContact>
                            <Image
                                className="higher-more"
                                src={'/static/img/gstake_x.png'}
                                alt="intro bg"
                                width={64}
                                height={64}
                            />
                            <div>
                                <div className="title">X (Twitter)</div>
                                <div className="mail">Follow @gstakefinance</div>
                            </div>
                        </SingleContact>
                    </a>
                    <a target="_blank" rel="noopener" href="https://discord.gg/TcHv2Awp6d">
                        <SingleContact>
                            <Image
                                className="higher-more"
                                src={'/static/img/gstake_discord.png'}
                                alt="intro bg"
                                width={64}
                                height={64}
                            />
                            <div>
                                <div className="title">Discord</div>
                                <div className="mail">Join us know more</div>
                            </div>
                        </SingleContact>
                    </a>
                    <a target="_blank" rel="noopener" href="https://t.co/WKy3Hl4rVX">
                        <SingleContact>
                            <Image
                                className="higher-more"
                                src={'/static/img/gstake_far.png'}
                                alt="intro bg"
                                width={64}
                                height={64}
                            />
                            <div>
                                <div className="title">Farcaster</div>
                                <div className="mail">@gstakefinance</div>
                            </div>
                        </SingleContact>
                    </a>
                </ContactGroup>

                <ContactUsButton href="mailto:info@gstake.fi">
                    <div className="title">Contact us</div>
                    <div className="sub-title">info@gstake.fi</div>
                </ContactUsButton>

                <div className="divider"></div>

                <div className="logo-wrap">
                    <LogoSvg />

                    <div className="terms-line">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://docs.gstake.fi/legal/terms-of-service"
                        >
                            Terms of Service
                        </a>
                        <div className="divider"></div>
                        <a target="_blank" rel="noopener noreferrer" href="https://docs.gstake.fi/legal/privacy-notice">
                            Privacy Notice
                        </a>
                    </div>
                </div>
            </AreasInner>
        </PagePartnerWrapper>
    )
})

export default PagePartner

const PagePartnerWrapper = styled.div`
    width: 100%;
    background: #1e2431;
`

const AreasInner = styled(PageInner)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding-top: 86px;
    padding-bottom: 100px;

    > .divider {
        background: radial-gradient(50% 50% at 50% 50%, #275b5b 0%, rgba(121, 137, 172, 0) 100%);
        width: 100%;
        height: 2px;
        margin: 60px auto;
    }

    .logo-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .terms-line {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 32px;

            > a {
                font-family: Poppins;
                font-size: 18px;
                font-weight: 400;
                line-height: 25px;
                letter-spacing: 0em;
                text-align: left;
                color: #6b859d;
                text-decoration: none;
            }

            > .divider {
                width: 2px;
                height: 32px;
                background: #6b859d;
                margin: 0 32px;
            }
        }
    }
`

const ContactGroup = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 32px;

    > a {
        text-decoration: none;
    }
`

const SingleContact = styled.div`
    width: 380px;
    height: 100px;
    border-radius: 8px;
    background: #282f3d;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 0 24px;

    > img {
        width: 64px;
        height: 64px;
        margin-right: 24px;
    }

    .title {
        color: #fff;
        font-family: Poppins;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 33.6px */
        text-decoration: none;
    }
    .mail {
        color: #8d95aa;
        font-family: Poppins;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
        text-decoration: none;
    }
`

const ContactUsButton = styled.a`
    width: 792px;
    height: 78px;
    margin-top: 30px;
    background: #181e29;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px;
    text-decoration: none;

    .title {
        font-family: Poppins;
        font-size: 24px;
        font-weight: 500;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: left;
        color: #fff;
    }
    .sub-title {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #8d95aa;
    }
`
