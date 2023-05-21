var express = require("express"),
    http = require("http"),
    app = express(),
    employees = [
        {
            "name": "Галиев Ильфат Рамилович",
            "tags": [
                "Отдел дизайна",
                "Главы отделов",
                "Лучшие работники 2022 года",
                "Лучшие работники 2023 года"
            ]
        },
        {
            "name": "Георгиев Дмитрий Сергеевич",
            "tags": [
                "Отдел разработки",
                "Главы отделов"
            ]
        },
        {
            "name": "Секачев Герман Дмитриевич",
            "tags": [
                "Отдел аналитики",
                "Главы отделов",
                "Лучшие работники 2022 года"
            ]
        },
        {
            "name": "Ибрагимов Тимур Рафаэлевич",
            "tags": [
                "Отдел дизайна"
            ]
        },
        {
            "name": "Искандеров Адильхан Нариманович",
            "tags": [
                "Отдел дизайна"
            ]
        },
        {
            "name": "Ташлыков Даниил Владимирович",
            "tags": [
                "Отдел разработки"
            ]
        },
        {
            "name": "Миронов Игорь Евгеньевич",
            "tags": [
                "Отдел разработки",
                "Лучшие работники 2023 года"
            ]
        },
        {
            "name": "Ямалтдинова Назиля Фанилевна",
            "tags": [
                "Отдел аналитики"
            ]
        }
    ];

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
app.use(express.urlencoded({extended: true}));

app.get("/employees", function(req, res) {
    res.json(employees);
})

app.post("/employees", function (req, res) {
    var newEmployee = req.body;
    employees.push(newEmployee);
});