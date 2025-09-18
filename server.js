// console.log('hello world')
const express = require('express');

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



// const users = [
//   { email: "afaq@gmail.com", password: "pass123" },
//   { email: "ahmedkhan@gmail.com", password: "hello456" },
//   { email: "ali@example.com", password: "mypwd789" },
//   { email: "emily4@example.com", password: "qwerty12" },
//   { email: "mike5@example.com", password: "letmein34" },
//   { email: "anna6@example.com", password: "secure56" }
// ];

// const emailSet = new Set(users.map(u => u.email));
// if (emailSet.size !== users.length) {
//   console.error("Duplicate emails found in users array!");
// } else {
//   console.log(" All user emails are unique.");
// }


// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   // Find the user
//   const user = users.find(u => u.email === email && u.password === password);

//   if (user) {
//     res.send("Login is successfully");
//   } else {
//     res.send("Login is failed");
//   }
// });

// ---------------------------


let userData = [
    {
        email: 'afaq@yahoo.com',
        pass: '12345'
    },
    {
        email: 'ahmed@gmail.com',
        pass: '54321'
    }
]


app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ status: 400, message: "Email and password are required" });
    }

    if (password.length < 5) {
        return res.send({ status: 400, message: "Password must be at least 5 characters" });
    }

    // Check if email already exists
    const existingUser = userData.find(u => u.email === email);
    if (existingUser) {
        return res.send({ status: 409, message: "Email already registered" });
    }

    // Add new user
    userData.push({ email, password });
    res.send({ status: 201, message: "User registered successfully" });
});

app.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    let isFound = false;
    console.log(email);
    console.log(password);
    if(password.length < 5){
        return res.send("password length must be at least 5")
    }
    for (var i = 0; i < userData.length; i++) {
        if (email === userData[i].email
            &&
            password === userData[i].pass) {
            isFound = true;
            return res.send({
                status: 200,
                message: 'login successfully'
            })
        }
    }

    if (isFound === false) {
        res.send({
                status: 404,
                message: 'User Not found'
            })
    }

})
















// app.post('/home', (req, res, next) => {
//     const userAge = req.body.userAge
//     // console.log(userAge);
//     if (userAge > 18) {
//         res.send('You are allow in the web');
//     }else{
        
//         res.send('You are not allow in the web');
//     }
// })





app.listen(PORT, () => {
    console.log(`server is running, on port : ${PORT}`)
})