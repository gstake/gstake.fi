import {useEffect} from 'react'
import Head from 'next/head'
import {useTranslation} from 'next-i18next'

import Modal from 'components/common/Modal'

declare const window: any

interface CaptchaRes {
    rand_str: string
    ticket: string
}

interface CaptchaProps {
    type: 'google' | 'tencent'
    successCallback: (CaptchaRes) => void
    failCallback: () => void
}

const TencentCaptchaC = ({successCallback, failCallback, type}: CaptchaProps) => {
    const {
        i18n: {language},
    } = useTranslation('common')

    useEffect(() => {
        if (type === 'tencent' && window.TencentCaptcha) {
            const captcha1 = new window.TencentCaptcha('2034216079', (res) => {
                if (res.ret <= 0) {
                    if (res && res.ticket) {
                        // success
                        successCallback({
                            rand_str: res.randstr,
                            ticket: res.ticket,
                        })
                    }
                }
                failCallback()
            })
            captcha1.show()
        }

        if (type === 'google') {
            const verifyCallback = (res) => {
                successCallback({
                    recaptcha_web: res,
                })
            }

            window.onloadCallback = function () {
                // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
                // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
                window.grecaptcha.render(document.getElementById('html_element'), {
                    sitekey: '6LdOyqYbAAAAAEnp4rookgBE1KHRbv4bmGyFT8Aj',
                    callback: verifyCallback,
                    hl: language,
                })
            }
        }

        return () => {
            failCallback()
        }
    }, [type, language])

    return (
        <>
            <Head>
                <script
                    src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
                    async
                    defer
                ></script>
            </Head>
            {type === 'google' && (
                <Modal
                    isOpen={true}
                    onRequestClose={failCallback}
                    // footer={null}
                    overlayDismiss={true}
                    // closable={false}
                    style={{
                        content: {
                            width: '360px',
                            height: '280px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '2px',
                        },
                    }}
                >
                    <div id="html_element"></div>
                </Modal>
            )}
        </>
    )
}

export default TencentCaptchaC
