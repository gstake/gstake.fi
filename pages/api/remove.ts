import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from 'utils/session'
import {NextApiRequest, NextApiResponse} from 'next'
import type {User} from 'pages/api/user'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
    req.session.destroy()
    res.json({isLoggedIn: false, userToken: '', userRequested: true})
}
