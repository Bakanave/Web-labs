function employeesOrginizedByTags(employeesObjects) {
    var tags = [];
    employeesObjects.forEach(function (employee) {
        employee.tags.forEach(function (tag) {
            if (tags.indexOf(tag) === -1)
                tags.push(tag);
        });
    });
    return tags.map(function (tag) {
        var employeesWithTag = [];
        employeesObjects.forEach(function (employee) {
            if (employee.tags.indexOf(tag) !== -1)
                employeesWithTag.push(employee.name);
        });
        return { "tag": tag, "employees": employeesWithTag };
    });
}

var main = function (employeesObjects) {
    "use strict";
    var $ = jQuery;
    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);
        $(element).on("click", function () {

            var employees = employeesObjects.map(function (employee) {
                return employee.name;
            });

            var $element = $(element),
                $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = employees.length - 1; i >= 0; --i) {
                    $content.append($("<li>").text(employees[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                employees.forEach(function (employee) {
                    $content.append($("<li>").text(employee));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                employeesOrginizedByTags(employeesObjects).forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.tag),
                        $content = $("<ul>");
                    tag.employees.forEach(function (employee) {
                        var $li = $("<li>").text(employee);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content h3").addClass("tag");
                    $("main .content").append($content);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                $(".content").append("<p>");
                $(".content").append("<h3>Имя:</h3>");
                $(".content").append("<input id='name'>");
                $(".content").append("<p>");
                $(".content").append("<h3>Теги:</h3>");
                $(".content").append("<input id='tags'>");
                $(".content").append("<p>");
                $(".content").append("<button>Добавить</button>");
                $(".content h3").addClass("label");
                $(".content input").addClass("input_field");
                $(".content button").addClass("input_button");
            }
            return false;
        });
    });
    $(".content").on("click", ".input_button", function () {
        var $name = $("#name").val();
        var $tags = $("#tags").val().split(',');

        if ($name != "") {
            var newEmployeeObject = {
                "name": $name,
                "tags": $tags
            }
            $.post("/employees", newEmployeeObject, function () {});
            $("#name").val("");
            $("#tags").val("");
            employeesObjects.push(newEmployeeObject);
            alert("Сотрудник был добавлен");
        }
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    $.getJSON("/employees", function (employeesObjects) {
        main(employeesObjects);
    });
});