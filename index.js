const port = 4325;

const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public/home.html"));
})
app.get("/manager", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public/manager.html"));
})
app.get("/guard", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public/guard.html"));
})

let cnt=0;
let points=[{id:1,name:"adva"}];

app.get('/pointsList', (req, res) => {
    res.status(200).json(points);
})
app.post('/CreatePoints', (req, res) => {
    let exists= false;
    let name=req.body.name;
    for (let i=0; i<points.length; i++) {
    if (name===points[i].name){
        exists=true;
         break;
    }}
    if (exists){
        res.status(400).json({message:"Name is already in use"});
    }
    else {
    let point={};
    point.id = cnt++;
    point.name=name;
    points.push(point);

    res.status(200).send(point);
    }

})
app.patch('/EditPoints/:id', (req, res) => {
    let exists= false;
    let id=req.params.id;
    let newName= req.body.name;
    for (let i=0; i<points.length; i++) {
        if (points[i].name===newName) {
            exists=true;
            break;
        }
    }
    if (exists){return res.status(400).json({message:"there is already a point with that name"})}
    else {
        points[id].name = newName;
        res.status(200).json({message:"Updated point"});
    }
})
app.delete('/DeletePoints', (req, res) => {
    let id=req.body.id;
    points.splice(id, 1);
    res.status(200).json({message:"Deleted point"});
})

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
})