const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db');

db.serialize(function() {
	db.run(
		'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author VARCHAR(100), title VARCHAR NOT NULL, slug VARCHAR NOT NULL, content VARCHAR NOT NULL, created_at VARCHAR(10))',
		);
	db.run(
		"INSERT INTO posts (author, title, slug, content, created_at) VALUES ('Admin', 'test title', 'test-slug', 'test content', '2020.03.28')"
	);
})