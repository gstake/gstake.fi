import styled from 'styled-components'

interface ImageWrapperProps {
    src: string
    alt?: string
    width?: number | string
    height?: number | string
    loading?: 'lazy' | 'eager'
    className?: string
}

const ImageWrapper = (props: ImageWrapperProps): JSX.Element => {
    const {src = '', alt = '', loading = 'lazy'} = props
    // const fSrc = src.indexOf('static') !== -1 ? src : `/static/img/${src}`

    return (
        <Wrap {...props}>
            <img src={src} alt={alt || src} loading={loading} width={'100%'} height={'100%'} />
        </Wrap>
    )
}

const Wrap = styled.div<ImageWrapperProps>`
    width: ${(props) => (props.width ? props.width + 'px' : '100%')};
    height: ${(props) => (props.height ? props.height + 'px' : '100%')};
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default ImageWrapper
