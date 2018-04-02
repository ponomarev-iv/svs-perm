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

function openImagePopup(){
    var imgPopup = $('.js-image-popup'),
        title = $(imgPopup).siblings();

    if(imgPopup.length){
        if(title.length){
            for(var i=0;i<title.length;i++){
                var titleTxt = $(title[i]).text();
                $(imgPopup[i]).attr('title', titleTxt);
            }
        }

        imgPopup.magnificPopup({
            type:'image',
            fixedContentPos: true,
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    }
}

$(document).ready(function () {
    sendForm();
    openImagePopup();
})