function sendEmail(resetFunc) {
   const hasErrors = validateForm();

   if (!hasErrors) {
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const note = document.getElementById('message').value;
      const postcode = document.getElementById('postcode').value;

      const emailSubject = 'Job request from ' + name;

      let params = {
         subject: emailSubject,
         name,
         phone,
         email,
         note,
         postcode,
      };

      emailjs
         .send('service_er619ue', 'template_1z2nk9m', params)
         .then((message) => {
            if (message.text == 'OK') {
               swal(
                  'Thank you!',
                  'Your request has been submitted!',
                  'success'
               );
               document.contact_form.reset();
            } else {
               swal('Oops!', 'Something went wrong!', 'error');
            }
         });
   }
}

function validateForm() {
   const errors = [];

   const name = document.getElementById('name').value;
   const nameErrorField = document.getElementById('name-field-error');

   const email = document.getElementById('email').value;
   const emailErrorField = document.getElementById('email-field-error');

   const note = document.getElementById('message').value;
   const noteErrorField = document.getElementById('message-field-error');

   const postcode = document.getElementById('postcode').value;
   const postcodeErrorField = document.getElementById('postcode-field-error');

   if (!name) {
      nameErrorField.innerText = 'Name is required';
      errors.push('name');
   } else {
      nameErrorField.innerText = '';
   }

   if (!email) {
      emailErrorField.innerText = 'Email is required';
      errors.push('email');
   } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      emailErrorField.innerText = 'Please enter a valid email';
      errors.push('email');
   } else {
      emailErrorField.innerText = '';
   }

   if (!note) {
      noteErrorField.innerText = 'Message is required';
      errors.push('note');
   } else {
      noteErrorField.innerText = '';
   }

   if (!postcode) {
      postcodeErrorField.innerText = 'Post Code is required';
      errors.push('postcode');
   } else {
      postcodeErrorField.innerText = '';
   }

   if (errors.length > 0) {
      return true;
   } else {
      nameErrorField.innerText = '';
      emailErrorField.innerText = '';
      noteErrorField.innerText = '';
      postcodeErrorField.innerText = '';

      return false;
   }
}
