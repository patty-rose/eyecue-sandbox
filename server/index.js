const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");

dotenv.config(); //load environment variables from .env file

const app = express(); //declare the express app

const port = 3000; // set port

app.get("/", async (req, res) => {
  await prisma.user.create({
    //creates an entity to add to the 'user' table
    data: {
      name: "John Doe",
      email: "jondoe@gmail.com",
      password: "123456",
    },
  });

  const users = await prisma.user.findMany(); //pulls all data from the 'users' table
  const names = users.map((user) => user.name); //pulls names property from each user entity and stores it as a variable

  res.send(
    `There are ${names.length} users with the names of: ${names.join(", ")}`
  );
});

app.listen(port, () => console.log(`App listening on port ${port}!`)); // listen for requests
