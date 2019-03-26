const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const fileNames = JSON.parse(fs.readFileSync('fileNames.json', 'utf8'));

function *generator() {
  for (let i = 0; i < fileNames.length; i++) {
    yield fileNames[i];
  }
}

const cursor = generator(fileNames);

/** Mock a cursor **/
app.get('/rides/cursor', (req, res, next) => {
  res.json({
    cursor: cursor.next()
  })
});

/** An endpoint for adding live data **/
app.post('/rides/', (req, res, next) => {
  //push new file
  fileNames.push()
  res.status(200).send();
})

app.get('/rides/cursor/:name', (req, res, next) => {
  const name = req.params.name;
  const json = fs.readFileSync(path.join(__dirname, 'data', `${name}`), 'utf8');
  const obj = JSON.parse(json);
  res
    .status(200)
    .json({
      data: obj,
      next: cursor.next()
    })
})


/* TODO: use SSE to stream json data in order to live update map
app.get('/rides/stream', (req, res, next) => {
  res.send('hello world');
});

app.use((err, req, res, next) => {
  console.error(`Final Error Handler ${err.stack}`);
  res.statusCode = 500;
});
*/

app.listen(5000);
