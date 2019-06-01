const faker = require('faker');
const moment = require('moment');
const { review } = require('./models.js');

//Add unique id to keep track of each review added to db 
var uniqueID = 0;

async function dbSeed() {
  try {
    //Time seeding starts to process
    const start = new Date();
    var fakeData = [];

    //Insert 10 Million Reviews into DB
    for (let i = 1; i <= 10000001; i += 1) {
      uniqueID++;
      const document = {
        id: Math.floor(Math.random() * 200000),
        image_url: 'https://pixel.nymag.com/imgs/daily/vulture/2017/03/30/30-chandler-bing.w330.h330.jpg',
        reviewer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        star_rate: Math.floor(Math.random() * 6),
        review_date: moment(faker.date.past()).format('MMM DD, YY'),
        review_description: faker.lorem.paragraphs(),
        likes_count: Math.floor(Math.random() * 1000),
        review_id: uniqueID
      };
      //Add each review obj to fakeData storage arr
      fakeData.push(document)
      //Create batch insert to db with await 
      if (i % 100000 === 0) {
        console.log('Made it inside seed if loop condition!')
        var batch = await review.insertMany(fakeData);
        fakeData = [];
      }
    }
    //Check to see how much time has passed
    const seedTime = ((new Date() - start)/60000).toFixed(2);
    console.log('Time to seed db: ', seedTime);
  } catch(err) {
    console.log('Error in db seed --->', err);
  }

};

//Invoke seeding function
dbSeed();