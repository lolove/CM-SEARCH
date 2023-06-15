const express = require('express')
const app = express()
const port = 3000

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'db',
      port : 5432,
      user : 'postgres',
      password : '123456',
      database : 'chsearch'
    }
  });

app.get('/', async (req, res) => {
    const a = await knex.select("*").from("articles").whereLike('title',`%${req.query.keywords}%`).orWhereLike('content',`%${req.query.keywords}%`);
    res.send(a);
})

app.get('/createArticle', async (req, res) => {
    const a = knex.insert({"title":req.query.keywords,"content":req.query.content}).into("articles");
    console.log(a.toSQL());
    await a;

    res.send(req.query.keywords);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})