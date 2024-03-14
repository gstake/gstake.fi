import React from 'react'

import styled from 'styled-components'

interface StyleProps {
    global?: string
    hasBac?: boolean
}

const LoadingWrap = styled.div<StyleProps>`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);

    img {
        width: 32px;
        height: 32px;
    }
`

const Loading = ({hasBac}) => {
    return (
        <LoadingWrap hasBac={hasBac}>
            {/* <Image src="/static/img/loading.png" width="68" height="68" alt="loading..." /> */}
            <img src={require('../../public/static/img/loading.png')} alt="logo of MetaWorld" width={68} height={68} />
        </LoadingWrap>
    )
}

export default Loading
