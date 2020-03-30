
const AUTH_COOKIE = 'authcookie';
const UserService = require('../service/user-service');
const userService = new UserService();

class AuthenticationController {
    constructor(session){
        this.session = session;

    }
    static getLogin(req, res){
        res.render('login-view');
    }
    postLogin(req, res){
        const user = req.body;
        const authenticatedUser = userService.getUser(user.username, user.password); // megnézi, hogy létezik-e a user
        if(authenticatedUser){
            const session = this.session.registerSession(authenticatedUser); // ha létezik a user, regisztrál hozzá egy sessiont
            res.cookie(AUTH_COOKIE, session.id); // és a session id-t elmenti a res.cookie-ba  (ezt logoutnál törölni fogja, így logout után nem tud benavigálni azokra az oldalakra, ahol ellenőrizzük, hogy van-e regisztrált session-je)
            res.redirect('/admin');
        }
        else {
            res.render('login-view');
        }
    }
    getLogout(req, res){
        this.session.deleteSession(req.session.id);
        res.clearCookie(AUTH_COOKIE);
        res.redirect('/login');
    }
}

module.exports = AuthenticationController