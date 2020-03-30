const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db');

class BlogPostRepository {
    save(user,post, createdAt){
        return new Promise((resolve,reject) => {
            db.serialize(() => {
                db.run(
                    `INSERT INTO posts (author, title, slug, content, created_at, published) VALUES ("${user.username}", "${post.postTitle}", "${post.postSlug}",  "${post.postContent}", "${createdAt}", "true")`, err => {
                        if(err){
                            reject(err)
                            return
                        }
                        resolve()
                    }
                );
            })
        })
    }
    saveAsDraft(user,post, createdAt){
        return new Promise((resolve,reject) => {
            db.serialize(() => {
                db.run(
                    `INSERT INTO posts (author, title, slug, content, created_at, published) VALUES ("${user.username}", "${post.postTitle}", "${post.postSlug}",  "${post.postContent}", "${createdAt}", "false")`, err => {
                        if(err){
                            reject(err)
                            return
                        }
                        resolve()
                    }
                );
            })
        })
    }
    update(user,post, editedAt, id, published){
        return new Promise((resolve,reject) => {
            db.serialize(() => {
                db.run(
                    `UPDATE posts SET edited_by = "${user.username}", title = "${post.postTitle}", slug = "${post.postSlug}", content = "${post.postTitle}", edited_at = "${editedAt}", published = "${published}" WHERE id = ${id}`, err => {
                        if(err){
                            reject(err)
                            return
                        }
                        resolve()
                    }
                );
            })
        })
    }
    list(){
        return new Promise((resolve,reject) => {
            db.serialize(() => {
                db.all(
                    `SELECT * from posts`, (err, results) => {
                        if(err){
                            reject(err)
                            
                        }
                        resolve(results)
                    }
                );
            })
        })
    }

    getSinglePost(idOrSlug){
        return new Promise((resolve,reject) => {
                db.get(
                    `SELECT * FROM posts WHERE id = '${idOrSlug}' OR slug = '${idOrSlug}' `, (err, results) => {
                        if(err){
                            reject(err)
                            console.log(err)
                            return
                            
                        }
                        resolve(results)
                    }
                );
        })
    }
}


module.exports = BlogPostRepository