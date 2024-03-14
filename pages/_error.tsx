import PropTypes from 'prop-types'

const Error = ({statusCode}) => <p>{statusCode}</p>

Error.getInitialProps = async ({res, err}) => {
    let statusCode = null
    if (res) {
        // ;({statusCode} = res)
        statusCode = res.statusCode
    } else if (err) {
        // ;({statusCode} = err)
        statusCode = err.statusCode
    }
    return {
        statusCode,
    }
}

Error.defaultProps = {
    statusCode: null,
}

Error.propTypes = {
    statusCode: PropTypes.number,
    // t: PropTypes.func.isRequired,
}

export default Error
