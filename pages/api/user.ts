import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from 'utils/session'
import {NextApiRequest, NextApiResponse} from 'next'

export type User = {
    isLoggedIn: boolean
    userToken: string
    userRequested?: boolean
}

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
    if (req?.session?.user?.userToken) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            ...req.session.user,
            isLoggedIn: true,
            userRequested: true,
        })
    } else {
        res.json({
            isLoggedIn: false,
            userToken: '',
            userRequested: true,
        })
    }
}
