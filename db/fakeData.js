const faker = require('faker');
const { review } = require('./models.js');

const fakeData = [];

for (let i = 0; i < 10000; i += 1) {
  const document = {
    id: Math.floor(Math.random() * 100),
    image_url: faker.image.people(),
    reviewer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    star_rate: Math.floor(Math.random() * 6),
    review_date: faker.date.past(),
    review_description: faker.lorem.paragraphs(),
    likes_count: Math.floor(Math.random() * 1000),
  };

  fakeData.push(document);
}

review.insertMany(fakeData)
  .then(() => {
    console.log('data is successfully seeded!');
  });
