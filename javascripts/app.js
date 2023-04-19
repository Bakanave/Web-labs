var main = function () {
    "use strict";
    var headsOfDepartments = [
        "Галиев Ильфат Рамилович",
        "Георгиев Дмитрий Сергеевич",
        "Секачев Герман Дмитриевич"
    ];
    var ordinaryEmployees = [
        "Ибрагимов Тимур Рафаэлевич",
        "Искандеров Адильхан Нариманович",
        "Ташлыков Даниил Владимирович",
        "Миронов Игорь Евгеньевич",
        "Ямалтдинова Назиля Фанилевна"
    ];
    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);
        $(element).on("click", function () {
            var $element = $(element),
                $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = 0; i < headsOfDepartments.length; ++i) {
                    $content.append($("<li>").text(headsOfDepartments[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                ordinaryEmployees.forEach(function (employee) {
                    $content.append($("<li>").text(employee));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $(".content").append("<p>");
                $(".content").append("<input>");
				$(".content").append("<button>Добавить</button>");
				$(".content input").addClass("input_field");
				$(".content button").addClass("input_button");

                $(".content").on("click", ".input_button", function() {
                    if ($(".input_field").val() != "") {
                        ordinaryEmployees.push($(".input_field").val());
                        alert("Сотрудник был добавлен");
                    }
                });
            }
            return false;
        })
        return false;
    });
    $(".tabs a:first-child span").trigger("click");
};

main();