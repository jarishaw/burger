$(function () {
    $("#addburger").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burgerinput").val().trim()
        };

        $.ajax("/burgers/create", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("added a burger");

                location.reload();

            }
            );
    });

    $(".change-burger").on("click", function (event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: newDevoured
        };

        // Send the PUT request.
        $.ajax("/burgers/update/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log("changed devoured to", newDevoured);
                // Reload the page to get the updated list
                location.reload();
            }
            );
    });

});