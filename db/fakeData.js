const faker = require('faker');
const moment = require('moment');
const db = require('./models.js');
const connection = db.connection;

//Ref on npmjs.com/package/csv-writer
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//Time-stamp for start of seed to reference at end when finished
const start = new Date();
//Async seeding function  
const seed = (async () => {
  //CSV writer layout
  const csv = createCsvWriter({
    path: './data.csv',
    header: [
      {id: 'book_id', title: 'book_id'},
      {id: 'image_url', title: 'image_url'},
      {id: 'reviewer_name', title: 'reviewer_name'},
      {id: 'star_rate', title: 'star_rate'},
      {id: 'review_date', title: 'review_date'},
      {id: 'review_description', title: 'review_description'},
      {id: 'likes_count', title: 'likes_count'}, 
    ],
  });
  //Storage for batches of data obj's
  var seedData = [];
  //Loop for 10M data obj's
  for (var i = 0; i < 10000000; i++) {
    seedData.push({
      book_id: Math.floor(Math.random() * 1000000),
      image_url: 'https://pixel.nymag.com/imgs/daily/vulture/2017/03/30/30-chandler-bing.w330.h330.jpg',
      reviewer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      star_rate: Math.floor(Math.random() * 6),
      review_date: moment(faker.date.past()).format('YYYY-MM-DD'),
      review_description: `${faker.lorem.paragraph()}`,
      likes_count: Math.floor(Math.random() * 1000),
    });
    //Condition to check for each batch size OR final batch load
    if(seedData.length === 10000 || i === 10000000) {
      console.log('Made it inside of if statement in data creation loop!')
      await csv.writeRecords(seedData)
      //Reset for our next batch
      seedData = [];
    }
  };
  //DB query to load final CSV file of 10M rows
  connection.query('LOAD DATA LOCAL INFILE "h-service/data.csv" INTO TABLE reviews FIELDS TERMINATED BY "," LINES TERMINATED BY "\n" IGNORE 1 ROWS (book_id, image_url, reviewer_name, star_rate, review_date, review_description, likes_count)', (err) => {
    if (err) console.log('Error with CSV query in DB seed: --->', err);
    else {
      //Final time-stamp of seeding time
      const seedTime = ((new Date() - start)/60000).toFixed(2);
      console.log('Time to seed db: ', seedTime);
    }
  });
});
seed();