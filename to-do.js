// class Task
class Task {
    constructor(text, priority) {
        this.text = text;
        this.priority = priority;
    }
    done() {
        var txt = $(this).parent("li");
        $(this)
            .removeClass("done")
            .addClass("undo")
            .attr("style", "float: right;")
            .text("Undo");
        $(txt).clone().appendTo("#doneList");
        $(this).parent("li").remove();
    }
    undo() {
        var txtUndo = $(this).parent("li");
        $(this)
            .removeClass("undo")
            .addClass("done")
            .attr("style", "float: right;background-color: white;")
            .text("Done");
        $(txtUndo).clone().appendTo("#todoList");
        $(this).parent("li").remove();
    }
    delete() {
        $(this).parent("li").remove();
    }
    toHTML() {
        var htmlString = "";
        if (this.priority == 1) {
            htmlString +=
                '<li class="list-group-item list-group-item-action"><span class="dot-High mr-2"></span>' +
                this.text +
                '<button type="button" class="done btn-outline-secondary badge-pill" style="float: right">Done</button><button type="button" class="close" style="float: right; padding-right: 10px"><span>&times;</span></button></li>';
        } else if (this.priority == 2) {
            htmlString +=
                '<li class="list-group-item list-group-item-action"><span class="dot-Low mr-2"></span>' +
                this.text +
                '<button type="button" class="done btn-outline-secondary badge-pill" style="float: right">Done</button><button type="button" class="close" style="float: right; padding-right: 10px"><span>&times;</span></button></li>';
        }
        return htmlString;
    }
}
// end class

// main code
var task = new Task();

var inputText = document.getElementById("myInput").value;
var inputPriority = document.getElementById("selectP").value;

var task = new Task(inputText, inputPriority);

document.getElementById("addToListBTtn").onclick = function () {
    document.getElementById("#todoList").toHTML();
};

document.getElementsByClassName("done").onclick = function () {
    task.done();
};

document.getElementsByClassName("undo").onclick = function () {
    task.undo();
};

document.getElementsByClassName("close").onclick = function () {
    task.delete();
};

//--------------------------------------------------------------------

// show number of items in each category of priority fadeIn
window.addEventListener("click", function () {
    $("#summaryTab").fadeIn(1000);
    $("#highNrTODO").text(
        "High Priority Items: " + $("#todoList").find("span.dot-High").length
    );
    $("#lowNrTODO").text(
        "Low Priority Items: " + $("#todoList").find("span.dot-Low").length
    );
    $("#highNrDONE").text(
        "High Priority Items: " + $("#doneList").find("span.dot-High").length
    );
    $("#lowNrDONE").text(
        "Low Priority Items: " + $("#doneList").find("span.dot-Low").length
    );
});

// add item to list
$("#addToListBTtn").click(function () {
    var text = $("#myInput").val();
    if (text === "" || text[0] === " ") {
        //if spaces or No text was typed nothing will be added to the list
        $("#myInput").val("");
    } else {
        if ($("#selectP option:selected").val() == 1) {
            $("#todoList").append(
                '<li class="list-group-item list-group-item-action"><span class="dot-High mr-2"></span>' +
                    text +
                    '<button type="button" class="done btn-outline-secondary badge-pill" style="float: right">Done</button><button type="button" class="close" style="float: right; padding-right: 10px"><span>&times;</span></button></li>'
            );
            $("#myInput").val("");
            $("#selectP option:selected").attr("selected", false);
        } else if ($("#selectP option:selected").val() == 2) {
            $("#todoList").append(
                '<li class="list-group-item list-group-item-action"><span class="dot-Low mr-2"></span>' +
                    text +
                    '<button type="button" class="done btn-outline-secondary badge-pill" style="float: right">Done</button><button type="button" class="close" style="float: right; padding-right: 10px"><span>&times;</span></button></li>'
            );
            $("#myInput").val("");
            $("#selectP option:selected").attr("selected", false);
        }
    }
});

// function validate form Bootstrap javascript
(function () {
    "use strict";
    window.addEventListener(
        "load",
        function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName("needs-validation");
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(
                forms,
                function (form) {
                    form.addEventListener(
                        "submit",
                        function (event) {
                            if (form.checkValidity() === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add("was-validated");
                        },
                        false
                    );
                }
            );
        },
        false
    );
})();

// on mouseover DONE button change background to green/white
$(document).on("mouseover", ".done", function () {
    $(this).css("background-color", "#28a745");
});
$(document).on("mouseout", ".done", function () {
    $(this).css("background-color", "white");
});
$(document).on("mouseover", ".undo", function () {
    $(this).css("background-color", "#007bff");
});
$(document).on("mouseout", ".undo", function () {
    $(this).css("background-color", "white");
});

//jquery x delete the item completely
$(document).on("click", ".close", function () {
    $(this).parent("li").remove();
});

//jquery moves item from todo list to done list
$(document).on("click", ".done", function () {
    var txt = $(this).parent("li");
    $(this)
        .removeClass("done")
        .addClass("undo")
        .attr("style", "float: right;")
        .text("Undo");
    $(txt).clone().appendTo("#doneList");
    $(this).parent("li").remove();
});

//jquery undo item
$(document).on("click", ".undo", function () {
    var txtUndo = $(this).parent("li");
    $(this)
        .removeClass("undo")
        .addClass("done")
        .attr("style", "float: right;background-color: white;")
        .text("Done");
    $(txtUndo).clone().appendTo("#todoList");
    $(this).parent("li").remove();
});
