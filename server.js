var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose")
    app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://0.0.0.0:27017/egnirc');

var EmployeeSchema = mongoose.Schema({
    name: String,
    tags: [String]
});
var Employee = mongoose.model("Employee", EmployeeSchema);
http.createServer(app).listen(3000);
app.get("/employees", async (req, res) => {
    await Employee.find()
        .then(async (Employees) => {
            res.json(Employees);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/employees", async (req, res) => {
    console.log(req.body);
    let newEmployee = new Employee({
        "name": req.body.name,
        "tags": req.body.tags
    });

    await newEmployee.save()
        .then(async (result) => {
            await Employee.find()
                .then(async (result) => {
                    res.json(result);
                })
                .catch(async (err) => {
                    res.send(err);
                });
        })
        .catch(async (err) => {
            console.log(err);
            res.send("ERROR");
        });
});