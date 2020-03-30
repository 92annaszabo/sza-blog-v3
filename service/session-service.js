let sessionCount = 0
let sessions= []

class SessionService {
    // belépéskor a user számára regisztrál egy sessiont
    registerSession(user){
        sessionCount++;
        const session = {id:sessionCount, user}
        sessions.push(session);
        return session
    }
    // authmiddleware: 
    checkAuthcookie(authCookie){ 
        return sessions.find(session => session.id == authCookie);
    }

    findUser(authCookie){
        let user
        sessions.forEach(session => {
            if (session.id == authCookie){ 
               // user = session.user.username     
                user = session.user     
            }
        } );
        return user
    }


    deleteSession(id){
        const sessionToBeDeleted = sessions.find(session => session.id == id);
        delete sessions[sessionToBeDeleted];
    }
    
}

module.exports = SessionService