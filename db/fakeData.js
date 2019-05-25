const faker = require('faker');
const moment = require('moment');
const { review } = require('./models.js');
const generator = require('random-date-generator');

const fakeData = [];

var newDate = () => {
  generator.getRandomDate();
  var start = new Date(2015, 1, 1);
  var end = new Date(2019, 12, 31);
  return generator.getRandomDateInRange(start, end);
}

for (let i = 0; i < 10000; i += 1) {
  const document = {
    id: Math.floor(Math.random() * 100),
    image_url: 'https://pixel.nymag.com/imgs/daily/vulture/2017/03/30/30-chandler-bing.w330.h330.jpg',
    reviewer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    star_rate: Math.floor(Math.random() * 6),
    review_date: newDate(),
    review_description: faker.lorem.paragraphs(),
    likes_count: Math.floor(Math.random() * 1000),
  };

  fakeData.push(document);
}

review.insertMany(fakeData)
  .then(() => {
    console.log('data is successfully seeded!');
  });
