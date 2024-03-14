import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from 'utils/session'
import {NextApiRequest, NextApiResponse} from 'next'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const {token} = await req.body
    try {
        if (token) {
            const user = {userToken: token, isLoggedIn: true, userRequested: true}
            req.session.user = user
            await req.session.save()
            res.json(user)
        } else {
            // res.status(500).json({message: 'Not Logined'})
            res.json({
                userToken: '',
                isLoggedIn: false,
                userRequested: true,
            })
        }
    } catch (error) {
        // console.log(error, 'check error')
        // res.status(500).json({message: (error as Error).message})
        res.json({
            userToken: '',
            isLoggedIn: false,
            userRequested: true,
        })
    }
}
