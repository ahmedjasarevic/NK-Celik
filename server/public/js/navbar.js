// public/js/cart.js
$(document).ready(function() {
    // Function to open cart sidebar
    $('.open-cart-btn').click(function() {
      $('.cart-sidebar').css('width', '250px');
      loadCartItems(); // Load cart items when opening the cart
    });
  
    // Function to close cart sidebar
    $('.close-cart').click(function() {
      $('.cart-sidebar').css('width', '0');
    });

     // Function to open cart sidebar
  $('.open-cart-btn').click(function() {
    $('.cart-sidebar').css('width', '250px');
    loadCartItems(); // Load cart items when opening the cart
  });

  // Function to close cart sidebar
  $('.close-cart').click(function() {
    $('.cart-sidebar').css('width', '0');
  });
  
    // Add item to cart
    $('.add-to-cart-btn').click(function() {
      var productName = $('.item-title').text();
      var productPrice = $('.price-title').text();
      var productImage = $('.image-wrapper img').attr('src');
      var quantity = $('#quantity').text();
      var sizeElement = $('#selectedSize');
      if (sizeElement.length && sizeElement.val()) {
        var size = sizeElement.val();
        console.log(size);
    } else {
        console.log('Veličina nije pronađena ili nema postavljenu vrijednost.');
    }
  
      $.post('/add-to-cart', {
        name: productName,
        price: productPrice,
        imageUrl: productImage,
        quantity: quantity,
        size: size
      }, function(data) {
        if (data.success) {
          updateCartCount();
        }
      });
    });
  });
  
  function updateCartCount() {
    $.get('/cart-items', function(data) {
      $('.cart-item-count').text(data.cart.length);
    });
  }
  function openDropdown() {
    var dropdownContent = document.getElementById("myDropdown");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
        document.addEventListener('click', closeDropdown);
        event.stopPropagation();
    }
}

function closeDropdown(event) {
    var dropdownContent = document.getElementById("myDropdown");
    if (!dropdownContent.contains(event.target)) {
        dropdownContent.style.display = "none";
        document.removeEventListener('click', closeDropdown);
    }
}

function loadCartItems() {
    $.get('/cart-items', function(data) {
      
      var cartContent = $('.cart-content');
  
      cartContent.empty();
      data.cart.forEach(function(item) {
        console.log(item);
        var cartItem = '<div class="cart-item">' +
                       '<img src="' + item.imageUrl + '" alt="' + item.name + '">' +
                       '<div class="cart-item-details">' +
                       '<h3>' + item.name + ' ' + item.size + ' </h3>' +
                       '<p>' + item.price + '</p>' +
                       '<p>Količina: ' + item.quantity + '</p>' +
                       '</div>' +
                       '</div>';
        cartContent.append(cartItem);
      });
    });
  }
  
  function updateCartCount() {
    $.get('/cart-items', function(data) {
      $('.cart-item-count').text(data.cart.length);
    });
  }
  
  