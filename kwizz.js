$(function() {

    $.ajax({
        url: "quiz_data.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data) {

            var counter = 0;

            $.content = function() {

                $(".q p").html(data[counter].question);
                if (counter === 8) {
                  $(".q p").addClass("smaller");
                }

                $.each(data[counter].answer, function(i, v) {
                    $("div.ans").append("<button>" + v.text + "</button>");
                    $("button").attr("id", function(i) {
                        return i;
                    });
                });
            }

            $.content(counter);

            var correctCounter = 0;

            $(document).on("click", "button", function() {

                var correctness = data[counter].correct;

                if (correctness == $(this).attr("id")) {

                    correctCounter++;

                    $(this).addClass("correct");
                    setTimeout(function() {
                        $("div.ans").empty();
                        counter++;
                        $.content(counter);
                    }, 500);

                } else {
                    $(this).addClass("wrong");

                    setTimeout(function() {
                        $("#" + correctness).addClass("correct")
                    }, 1000);

                    setTimeout(function() {
                        $("div.ans").empty();
                        counter++;
                        $.content(counter);
                    }, 2000);
                }

                if (counter === data.length - 1) {
                    localStorage.setItem('correctCounter', JSON.stringify(correctCounter));

                    setTimeout(function() {
                        window.location.replace("NextQ.html");
                    }, 1300);
                }
            });
        }
    });
});
