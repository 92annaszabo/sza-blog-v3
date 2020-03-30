const BlogPostService = require('../service/blog-post-service');
const blogPostService = new BlogPostService();
const BlogPostRepository = require('../repository/blog-post-repository');
const blogPostRepository = new BlogPostRepository();

class BlogPostController {
    constructor(session){
        this.session = session;

    }
    async listAllPosts(req, res) {
        
        const sourceURL = req.url
        const posts = await blogPostService.getAllPosts();
        
        if (sourceURL == '/') {
            console.log(posts)
    
            posts.forEach(post => {
                if(post.published == 'true'){
                    res.render('post-list-view', {
                        title: "Anna's blog",
                        id: post.id,
                        postTitle: post.title,
                        author: post.author,
                        content: post.content,
                        created_at: post.created_at,
                        edited_at: post.edited_at,
                    });
                }
                else console.log('not published')
            });
        }

        if (sourceURL == '/admin-post-list') {
            res.render('admin-post-list-view', {
                title: "Anna's blog",
                posts: posts
            });
        }
        
    }
    newPostView(req,res){
        res.render('new-post-view', {
            title: 'New Post'
        })
    }
    
    newPost(req,res){
        
        const newpost = req.body;
        const sessionId = req.cookies.sessid;
        const user = this.session.findUser(sessionId);
        const today = new Date;
        const createdAt = today.toISOString().slice(0,10).split('-').join('.')
        console.log(user,newpost, createdAt)
        if(newpost.savePost){
            blogPostRepository.saveAsDraft(user, newpost, createdAt)
        }
        if(newpost.publishPost){
            blogPostRepository.save(user, newpost, createdAt)
        }
        res.redirect('/admin')
    }

    async singlePostView(req, res){      
        const idOrSlug = req.params.id;       
        if(idOrSlug) {
            const post = await blogPostService.getSinglePost(idOrSlug);   
            res.render('single-post-view', {
                title: "Anna's blog",
                author: post.author,
                postTitle: post.title,
                slug: post.slug,
                content: post.content,
                created_at: post.created_at,
                edited_at: post.edited_at
            });
        }       
    }

    async editPostView(req, res){     
        const id = req.params.id;
        if(id){
            const post = await blogPostService.getSinglePost(id);    
            res.render('edit-post-view', {
                title: "Anna's blog",
                id: id,
                author: post.author,
                postTitle: post.title,
                slug: post.slug,
                content: post.content,
                created_at: post.created_at
            });
        }       
    }

    async editPost(req, res){
        const id = req.params.id;
        const post = req.body;
        const sessionId = req.cookies.sessid;
        const user = this.session.findUser(sessionId);
        const today = new Date;
        const editedAt = today.toISOString().slice(0,10).split('-').join('.');
        let published
        if(post.savePost){
            published = 'false';
        }
        if(post.publishPost){
            published = 'true';
        }
        await blogPostRepository.update(user, post, editedAt, id, published);
        res.redirect('/admin-post-list');
        
    }
}

module.exports = BlogPostController