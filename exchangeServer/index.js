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
  const articleId = req.query.articleId;
  const isShared = await knex.select('isShared').from('exchange_permissions').where('resourceId','=',articleId).then(x=>x[0]);
  console.log(isShared===undefined);
  if(isShared===undefined || !isShared){
    res.send([]);
    return null;
  }
  const article = await knex.select("*").from("articles").where("id","=",articleId);
  res.send(article);
})


app.get('/createPermission', async (req, res) => {
  const articleId = req.query.articleId;
    const a = knex.insert({"resourceId":articleId,"isShared":true}).into("exchange_permissions");
    console.log(a.toSQL());
    await a;

    res.send(req.query.keywords);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})