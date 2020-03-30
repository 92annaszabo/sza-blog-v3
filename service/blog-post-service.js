const BlogPostRepository = require('../repository/blog-post-repository');
const blogPostRepository = new BlogPostRepository();

class BlogPostService {
    getAllPosts(){
        return  blogPostRepository.list();
    }
    getSinglePost(idOrSlug){
        console.log(idOrSlug)
        return  blogPostRepository.getSinglePost(idOrSlug);
    }
}

module.exports = BlogPostService