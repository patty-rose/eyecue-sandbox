import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
import cors from 'cors';
const app = express()

//for socket.io
import http from 'http'
const server = http.createServer(app);

import { Socket } from 'socket.io';
const io = require('socket.io')(server, {cors: {origin: "*"}});

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }));

app.use(express.json())

// ... your REST API routes will go here between app.use and app.listen..


//GET users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

//GET posts
app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })
  res.json(posts)
})

//GET unique post by id
app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

//POST user: creates a new user
app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  })// pass in the values from the body of the HTTP request to the Prisma Client create query
  res.json(result)
})

//POST post: creates a new post as a draft
app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })//first need to extract them manually to pass them to the Prisma Client query. Because the structure of the JSON in the request body does not match the structure that’s expected by Prisma Client, you need to create the expected structure manually.
  res.json(result)
})

//POST post: publishes unique post by id
app.put('/post/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })//the ID of the post to be published is retrieved from the URL and passed to the update query of Prisma Client.
  res.json(post)
})

//DELETE post
app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  })//also retrieves the post ID from the URL and passes it to the delete query of Prisma Client.
  res.json(post)
})

io.on('connection', (socket: Socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('new-user', (data: any) => {
    io.emit('new-user', data);
  })
})

// app.listen(3001, () =>
//   console.log('REST API server ready at: http://localhost:3001'),
// )

server.listen(3001, () =>
  console.log('REST API server ready at: http://localhost:3001'),
)