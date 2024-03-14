import ReactModal from 'react-modal'
import _merge from 'lodash/merge'

interface Props {
    isOpen: boolean
    children: React.ReactNode
    ariaHideApp?: boolean
    overlayDismiss?: boolean
    style?: any
    className?: string
    onRequestClose?: () => void
    onAfterOpen?(): () => void
}

const customStyles = {
    overlay: {
        zIndex: '10',
        backgroundColor: 'rgba(0, 0, 0, .7)',
    },
    content: {
        padding: 0,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

const Modal = ({
    isOpen = false,
    children,
    style,
    onAfterOpen,
    onRequestClose,
    className,
    overlayDismiss,
    ariaHideApp,
}: Props) => {
    return (
        <ReactModal
            isOpen={isOpen}
            style={_merge(customStyles, style)}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            className={className}
            ariaHideApp={ariaHideApp}
            shouldCloseOnOverlayClick={overlayDismiss}
        >
            {children}
        </ReactModal>
    )
}

export default Modal
