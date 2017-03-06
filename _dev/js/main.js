/**
 * Created by ponomarev-iv on 02.02.2017.
 */

function sendForm() {
    $("#form").submit(function () {
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            alert("Спасибо за обращение в нашу компанию. В ближайшее время мы свяжемся с вами.");
            $("#form").trigger("reset");
        });
        return false;
    });
}

$(document).ready(function () {
    sendForm();
})