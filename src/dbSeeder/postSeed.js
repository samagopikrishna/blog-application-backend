require("../dbConfig/db");
const Author = require("../models/Author");
const Post = require("../models/Post");
const faker = require("faker");

const seedPosts = () => {
  const authors = ["Dani", "John", "Arun"];
  authors.forEach((name) => {
    new Author({
      name
    })
      .save()
      .then((result) => {
        console.log(result);
        const { _id } = result;
        for (let i = 0; i < 5; i++) {
          new Post({
            title: faker.lorem.word(),
            content: faker.lorem.paragraphs(),
            author: _id
          })
            .save()
            .then(console.log)
            .catch(console.error);
        }
      })
      .catch(console.error);
  });
};

const clearPosts = () => {
  Author.remove({}).then(console.log).catch(console.error);

  Post.remove({}).then(console.log).catch(console.error);
};

seedPosts();
