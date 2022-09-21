const express = require('express')
const app = express()
let users = require('./InitialData');
// const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// your code goes here
let newid = users.length + 1;
app.get('/api/student', (req, res) => {
    try {
        res.json({
            status: 'Sucess',
            users
        })
    } catch (e) {
        res.json({
            status: 'Sucess',
            message: e.message
        })
    }


})
app.get('/api/student/:id', (req, res) => {
    try {
        const idx = users.findIndex(obj => obj.id == req.params.id)
        if (idx == -1) {
            return res.status(404).json({
                status: 'failed',
                message: 'this data is not avilable'
            })
        }
        res.json({
            status: 'Sucess',
            data: users[idx]
        })
    } catch (e) {
        res.status(400).json({
            status: 'Sucess',
            message: e.message
        })
    }


});
app.post("/api/student", (req, res) => {
    try {
        

        if (!req.body.name || !req.body.currentClass || !req.body.division) {
            return res.status(400).json({
                status: "Failed",
                message: "Incomplete data"
            })
        }
    
        users.push({
            id: newid,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        });
        newid++;

        res.json({
            status: "Sucess",
            id: newid
        });

    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        })
    }
});

app.put('/api/student/:id', (req, res) => {
    try {
        
        const idx = users.findIndex(obj => obj.id == req.params.id)
        if (idx == -1) {
            res.status(400).json({
                status: "failed",
                message: "id data is not avilable"
            })
        }
        
            if (req.body.name) {
                users[idx].name = req.body.name;

            }
            if (req.body.currentClass) {
                users[idx].currentClass = req.body.currentClass;
            }
            if (req.body.division) {
                users[idx].division = req.body.division;
            }
            res.json({
                status: 'success',
                data: users[idx]
            })
      

    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

})
app.delete('/api/student/:id', (req, res) => {
    try {
        const idx = users.findIndex(obj => obj.id == req.params.id)
        if (idx == -1) {
            res.status(404).json({
                status: "failed",
                message: "Invalid id"
            })

        }
            users.splice(idx, 1)
            res.json({
                status: 'success',
                mesaage: "delete the rocord"
            })
       
    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        }) 
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   