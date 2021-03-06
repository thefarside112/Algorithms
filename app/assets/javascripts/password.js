// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
// Only run this code after everything has loaded (jQuery.ready)
// and namespace it so we keep things out of the global namespace
$(function() {
  // Set the minimum strength once and use it multiple times
  var MIN_STRENGTH = 0;

  // Set a "keyup" event handler on the password field
  // Each time a key is pressed in that field, we'll calculate
  // the password strength and change the meter, time-to-crack, etc.
  $('#user_password').on('keyup', function(evt) {
    // Get the new password and check its strength
    var s = zxcvbn($(this).val());

    // Change the strength meter as necessary to match the new
    // password's strength
    $('#strength-meter')
      .removeClass('w-0')
      .removeClass('w-1')
      .removeClass('w-2')
      .removeClass('w-3')
      .removeClass('w-4')
      .addClass('w-' + s.score);

    // Update the time-to-crack display
    $('#time-to-crack').html(s.crack_time_display);

    // Update the hidden field that send the strength score
    // to the server when the form is submitted
    $('#hidden-strength').val(s.score);

    // Enable/disable the submit button depending on
    // password strength
    if (s.score >= MIN_STRENGTH) {
      $('#save-password').removeClass('disabled');
    } else {
      $('#save-password').addClass('disabled');
    }

    if (this.value === document.getElementById('user_password_confirmation').value) {
      $('#password_matching').html('Passwords match!').css('color', '#5da423');
      $('#save-password').removeClass('disabled').removeClass('alert').addClass('success');
    } else {
      $('#password_matching').html('Passwords do not match').css('color', '#c60f13');
      $('#save-password').addClass('disabled').removeClass('success').addClass('alert');
    }
  });

  // Prevent the form from being submitted when the submit
  // button is disabled (strength < MIN_STRENGTH)

  $('#user_password_confirmation').on('keyup', function(evt) {
    if (this.value === document.getElementById('user_password').value) {
      $('#password_matching').html('Passwords match!').css('color', '#5da423');
      $('#save-password').removeClass('disabled').removeClass('alert').addClass('success');
    } else {
      $('#password_matching').html('Passwords do not match').css('color', '#c60f13');
      $('#save-password').addClass('disabled').removeClass('success').addClass('alert');
    }
  });


  // Comment out this section to eliminate the restriction on password strength
  $('#new_user').on('submit', function() {
    if ($('#hidden-strength').val() < MIN_STRENGTH) {
      return false;
    }
  });
});