(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);



document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    //document.getElementById("message").textContent = "Enviando...";
    //document.getElementById("message").style.display = "block";
    document.getElementById("submit-button").disabled = true;

    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
        keyValuePairs.push(encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]));
    }

    var formDataString = keyValuePairs.join("&");

    fetch("https://script.google.com/macros/s/AKfycbyooOojfBtfaIPVtRKlKSc96XWXQe26t6cPQ7GAm2c1ynHPHjlZip89GeThjxEBA9bz5g/exec", {
        method: "POST",
        body: formDataString,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    .then(response => response.json())
    .then(data => {
        //document.getElementById("message").textContent = "Datos enviados con éxito!";
        //document.getElementById("message").style.backgroundColor = "green";
        //document.getElementById("message").style.color = "beige";
        document.getElementById("submit-button").disabled = false;
        document.getElementById("form").reset();
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
        }, 2600);
    })
    .catch(error => {
        console.error(error);
        document.getElementById("message").textContent = "Ocurrió un error al enviar el formulario.";
        document.getElementById("message").style.display = "block";
        document.getElementById("submit-button").disabled = false;
    });
});