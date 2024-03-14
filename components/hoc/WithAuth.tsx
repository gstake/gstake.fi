// import {useAuth} from 'utils/auth-context'
import useAuth from 'utils/ironSessionLib/useIronUser'
import {useRouter} from 'next/router'

const WithAuth = (Component) => {
    const Auth = (props) => {
        // Login data added to props via redux-store (or use react context for example)
        const {userToken} = useAuth()
        const router = useRouter()

        // If user is not logged in, return login component
        if (!userToken) {
            router.push('/login')
        }

        // If user is logged in, return original component
        return <Component {...props} />
    }

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }

    return Auth
}

export default WithAuth
