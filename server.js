// console.log('hello world')
const express = require('express');

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



const users = [
  { email: "afaq@gmail.com", password: "pass123" },
  { email: "afaq23@gmail.com", password: "hello456" },
  { email: "ali3@example.com", password: "mypwd789" },
  { email: "emily4@example.com", password: "qwerty12" },
  { email: "mike5@example.com", password: "letmein34" },
  { email: "anna6@example.com", password: "secure56" }
];

const emailSet = new Set(users.map(u => u.email));
if (emailSet.size !== users.length) {
  console.error("Duplicate emails found in users array!");
} else {
  console.log(" All user emails are unique.");
}

// ✅ Step 3: Create login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.send("Login is successfully 🎉");
  } else {
    res.send("Login is failed ❌");
  }
});



app.get('/', (req, res, next) => {
    res.send('hello world!');
})
app.post('/home', (req, res, next) => {
    const userAge = req.body.userAge
    // console.log(userAge);
    if (userAge > 18) {
        res.send('You are allow in the web');
    }else{
        
        res.send('You are not allow in the web');
    }
})

app.get('/json', (req, res) => {
    res.json({ message: 'Hello JSON', time: new Date() });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is: ${userId}`);
});



app.listen(PORT, () => {
    console.log(`server is running, on port : ${PORT}`)
})