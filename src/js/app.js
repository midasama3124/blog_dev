import 'bootstrap';
import 'bootstrap-select';
import 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import '../sass/main.scss';
import './custom';

console.warn("Running js files...");

/* Truncate length of card title and text */
export function truncateText(selector, maxLength) {
  $(selector).text(function (index, oldText) {
    if (oldText.length > maxLength) {
      return oldText.substring(0, maxLength) + '...';
    }
    return oldText;
  });
}
truncateText('.card-title', 20);
truncateText('.card-text', 150);
truncateText('.truncated-text', 15);

/* Admin page */
$('#menu-action').click(function () {
  $('.admin-sidebar').toggleClass('active');
  $('.admin-main').toggleClass('active');
  $(this).toggleClass('active');

  if ($('.admin-sidebar').hasClass('active')) {
    $(this).find('i').addClass('fa-times');
    $(this).find('i').removeClass('fa-bars');
  } else {
    $(this).find('i').addClass('fa-bars');
    $(this).find('i').removeClass('fa-times');
  }
});

// Add hover feedback on menu
$('#menu-action').hover(function () {
  $('.admin-sidebar').toggleClass('hovered');
});

/* Show password if checkbox input is checked */
// Gather our DOM references.
var password = document.querySelector(".password");
var pswToggle = document.querySelector(".show-password");

// NOTE: The "(input)" event doesn't work on checkboxes in Safari or IE. As such,
// I'm using the "(click)" event to make this works cross-browser.
if (pswToggle) pswToggle.addEventListener("click", handleToggleClick, false);

// I handle the toggle click, changing the TYPE of password input.
function handleToggleClick(event) {
  if (this.checked) {
    console.warn("Change input 'type' to: text");
    password.type = "text";
  } else {
    console.warn("Change input 'type' to: password");
    password.type = "password";
  }
}

/* HTML loading */
$(function () {
  $("#navbar-placeholder").load("navbar.html");
  $("#footer-placeholder").load("footer.html");
});

/* Custom form behavior */
// Custom error messages
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

/* Sorting table */
$(document).ready(function () {
  $('#sorting-table').DataTable({
    "order": [[1, "asc"]],
    "lengthChange": false,
    "oLanguage": {
      "sLengthMenu": "Mostrar _MENU_ items",
      "sSearch": "Buscar:",
      "sInfo": "Mostrando de _START_ a _END_ de _TOTAL_ items"
    },
    "language": {
      search: '<i class="fa fa-filter" aria-hidden="true"></i>',
      searchPlaceholder: 'Filtra items',
      "paginate": {
        "previous": "Anterior",
        "next": "Siguiente"
      }
    },
    "columnDefs": [{
      "targets": 0,
      "orderable": false,
      "searchable": false,
      "visible": true
    }]
  });
});

// Avatar image based on user name
(function (w, d) {
  function LetterAvatar(name, size) {
    name = name || '';
    size = size || 60;
    var colours = [
      "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
      "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ],
      nameSplit = String(name).toUpperCase().split(' '),
      initials, charIndex, colourIndex, canvas, context, dataURI;
    if (nameSplit.length == 1) {
      initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
    } else {
      initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
    if (w.devicePixelRatio) {
      size = (size * w.devicePixelRatio);
    }
    charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
    colourIndex = charIndex % 20;
    canvas = d.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    context = canvas.getContext("2d");
    context.fillStyle = colours[colourIndex - 1];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = Math.round(canvas.width / 2) + "px Arial";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(initials, size / 2, size / 1.5);
    dataURI = canvas.toDataURL();
    canvas = null;
    return dataURI;
  }
  LetterAvatar.transform = function () {
    Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function (img, name) {
      name = img.getAttribute('avatar');
      img.src = LetterAvatar(name, img.getAttribute('width'));
      img.removeAttribute('avatar');
      img.setAttribute('alt', name);
    });
  };
  // AMD support
  if (typeof define === 'function' && define.amd) {
    define(function () { return LetterAvatar; });
    // CommonJS and Node.js module support.
  } else if (typeof exports !== 'undefined') {
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module != 'undefined' && module.exports) {
      exports = module.exports = LetterAvatar;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.LetterAvatar = LetterAvatar;
  } else {
    window.LetterAvatar = LetterAvatar;
    d.addEventListener('DOMContentLoaded', function (event) {
      LetterAvatar.transform();
    });
  }
})(window, document);