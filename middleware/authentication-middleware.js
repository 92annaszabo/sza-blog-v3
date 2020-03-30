const AUTH_COOKIE = 'authcookie';


class AuthMiddleware {
    constructor(session) {
        this.session = session
    }
    checkIfUserIsAuthenticated (req, res, next) {
        const authCookie = req.cookies[AUTH_COOKIE] // (1)
        console.log(`Authentication cookie: ${authCookie}`)
        const session = this.session.checkAuthcookie(authCookie)
        //const session = sessionService.checkAuthcookie(authCookie);
        
        if (!session) {
            res.status(401).send('Login required')
            return
        }
        
        req.session = session
        console.log(req.session)
        next();
    }
}

module.exports = AuthMiddleware