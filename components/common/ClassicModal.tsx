import ReactModal from 'react-modal'
import _merge from 'lodash/merge'

import Loading from 'components/common/Loading'

interface ModalProps {
    visible: boolean
    width?: number | string
    afterClose?: () => void
    onCancel: () => void
    maskClosable?: boolean
    className?: string
    style?: any
    children?: any
    loading?: boolean
}

const customStyles = (width: number | string) => {
    return {
        overlay: {
            zIndex: '10',
            backgroundColor: 'rgba(0, 0, 0, .7)',
        },
        content: {
            // padding: 0,
            // top: '50%',
            // left: '50%',
            // right: 'auto',
            // bottom: 'auto',
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
            width: width === 'auto' ? width : width + 'px',
            height: 'auto',
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'middle',
            backgroundColor: '#fff',
            borderRadius: '2px',
        },
    }
}

export default ({
    visible = false,
    width = 440,
    afterClose,
    onCancel,
    maskClosable = true,
    className,
    style,
    children,
    loading,
}: ModalProps) => {
    return (
        <ReactModal
            isOpen={visible}
            style={_merge(customStyles(width), style)}
            onAfterOpen={afterClose}
            onRequestClose={onCancel}
            className={`styled-modal ${className}`}
            shouldCloseOnOverlayClick={maskClosable}
            appElement={typeof document !== 'undefined' && document.body}
            overlayClassName={`classic-modal-overlay ${loading ? 'loading' : ''}`}
        >
            {loading ? <Loading hasBac={true} /> : children}
        </ReactModal>
    )
}
