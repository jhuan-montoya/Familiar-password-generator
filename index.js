const express = require('express');
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static("public"));

app.use(express.json());

app.use(bodyParser.text());

app.listen(3000, () =>
  console.log('Servidor iniciado na porta 3000')
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.post('/generatenew', function(req, res) {
  var result = randomPassword(req.body)
  res.send(result)
});

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
function generate(val) {
  const nums = new Set();
  while (nums.size !== val) {
    nums.add(Math.floor(Math.random() * val) + 1);
  }
  return [...nums]
}

function randomPassword(array) {
  var especialCaracters = ["@", "#", "$", "!", "(", "&"]
  var sequence = generate(4)
  var pass = ""
  for (i in sequence) {
    pass = pass + array["part" + sequence[i]]
    console.log(pass)
  }


  for (i in pass) {
    let prob = between(1, 8)
    if (prob == 4) {
      var replacement = especialCaracters[between(1, especialCaracters.length)]
      pass = pass.replace(pass[i], replacement)
    }
    if (prob == 6) {
      var upper = pass[i].toUpperCase()
      pass = pass.replace(pass[i], upper)
    }
  }
  return pass
}