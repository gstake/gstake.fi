// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type {IronSessionOptions} from 'iron-session'
import type {User} from 'pages/api/user'

export const sessionOptions: IronSessionOptions = {
    password: (process.env.SECRET_COOKIE_PASSWORD || 'JFtapdZYZ9iGLDVq4Mmq9DaMHfzMt3Dh8PuVEHWpdPpWm') as string,
    cookieName: 'bw-session-cookie',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        httpOnly: false,
        secure: process.env.NEXT_PUBLIC_APP_ENV === 'prod',
    },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
    interface IronSessionData {
        user?: User
    }
}
