const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3030;

const BlogPostController = require('./controller/blog-post-controller.js');
const AuthenticationController = require('./controller/authentication-controller.js');
const AdminController = require('./controller/admin-controller.js');
const AuthMiddleWare = require('./middleware/authentication-middleware.js');
const SessionService = require('./service/session-service');
const sessionService = new SessionService();
const blogPostController = new BlogPostController(sessionService);
const authenticationController = new AuthenticationController(sessionService);
const adminController = new AdminController();
const authMiddleWare = new AuthMiddleWare(sessionService);

app.set('view engine', 'handlebars');

app.use(cookieParser())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', handlebars({
    partialsDir: __dirname + '/views/partials/'
}));

app.get('/', blogPostController.listAllPosts);
app.get('/login', AuthenticationController.getLogin);
app.post('/login', authenticationController.postLogin.bind(authenticationController));
app.get('/logout', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare),authenticationController.getLogout.bind(authenticationController));
app.get('/admin', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare), adminController.getAdminView);
app.get('/post', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare), blogPostController.newPostView);
app.post('/post', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare), blogPostController.newPost.bind(blogPostController));
app.get('/post/:id', blogPostController.singlePostView);
app.get('/post/:slug', blogPostController.singlePostView);
app.get('/edit-post/:id', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare), blogPostController.editPostView);
app.post('/edit-post/:id', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare), blogPostController.editPost.bind(blogPostController));
app.get('/admin-post-list', authMiddleWare.checkIfUserIsAuthenticated.bind(authMiddleWare), blogPostController.listAllPosts);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));