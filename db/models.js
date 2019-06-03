const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);


connection.connect(err => {
  if (err) {
    console.log('DB ERROR', err);
  } else {
    console.log('Connected to DB!')
  }
});


// connection.query('DROP DATABASE IF EXISTS goodreads', (err, data) => {
//   if(err) {
//     console.log('Issue dropping goodreads DB');
//   } else {
//     console.log('Successfully dropped goodreads DB');
//   }
// });


connection.query('CREATE DATABASE IF NOT EXISTS goodreads', function(err, data) {
  if(err) {
    console.log('DB ERROR creating goodreads', err)
  } else {
    console.log(null, data)
  }
});

connection.query('USE goodreads', function(err, data) {
  if(err) {
    console.log('DB ERROR using goodreads', err)
  } else {
    console.log(null, data)
  }
});

connection.query(`CREATE TABLE IF NOT EXISTS reviews (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, book_id INTEGER, image_url TEXT, reviewer_name TEXT, star_rate INTEGER, review_date TEXT, review_description TEXT, likes_count INTEGER)`, function(err, data) {
  if (err) {
    console.log('ERROR', err)
  } else {
    console.log('Created reviews table in goodreads DB')
  }
});

module.exports.connection = connection;
