const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db');
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type , Accept'
  );
  next();
})

app.use(express.json())
app.use('/api',require('./routes/createuser'))
app.use('/api',require('./routes/display'))
app.use('/api',require('./routes/createuser'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
