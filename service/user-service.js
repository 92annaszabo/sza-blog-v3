const users = [
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'user',
        password: 'user'
    },
]

class UserService {
    getUser(username, password){
        const authenticatedUser = users.find(user => username === user.username && password === user.password);
        return authenticatedUser
    }
}

module.exports = UserService