const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date(),
        }
    ]
}

app.get('/',(req, res) => {
    res.send('this is working')
});


app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error logging in');
        }
});

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });


// app.get(process.env.COMV_SERVICE_URL,createProxyMiddleware({
//     target: process.env.COMV_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         [`^${process.env.COMV_SERVICE_URL}`]: '',
//     }
// }))

// app.get('/comicvine', (req,res) => {
//     request(
//         { url: 'http://comicvine.gamespot.com/api/characters'},
//         (error, response, body) => {
//             if(error || response.statusCode!==200){
//                 return res.status(500).json({type:'error', message: error.message})
//             } else {
//                 res.json(JSON.parse(body))
//             }
//         }
//     )
// })

app.post('/register',(req,res) => {

})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})