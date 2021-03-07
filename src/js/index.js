import '../scss/style.scss';

const $ = require('jquery');

$('#target').html("Hello Everyone This is jQuery!");

$(function() {
    $('.toggle').on("click", function() {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
            $(this).find("a").html("<i class='fas fa-bars'></i>");
        } else {
            $(".item").addClass("active");
            $(this).find("a").html("<i class='fas fa-times'></i>");
        }
    });
});

/** WIP trying to setup forms  */
//const uname = document.querySelector('#uname');
//const pword = document.querySelector('#pword');

/** Footer Element */
let footer = document.createElement("footer");
footer.classList.add("footer");

let favicon = document.createElement("i");
favicon.classList.add(`fas.fa-copyright`);

let copyright = new Date().getFullYear();
// document.append(footer);
// document.append(favicon);
// document.append(copyright);
console.log(copyright);

/**
 <footer class="footer">
        <i class="fas fa-copyright"></i> 2020 -
        <script>
            document.write(new Date().getFullYear());
        </script>
    </footer>
 */