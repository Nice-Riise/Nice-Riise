document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);


  // Send mail 
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#emails-info-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function clickedMail(id){
  fetch(`/emails/${id}`)
.then(response => response.json())
.then(email => {
    // Print email
    console.log(email);

    // ... sort the apps ...
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#emails-info-view').style.display = 'block';
    
    // display email in the view
    
    document.querySelector('#emails-info-view').innerHTML = `
    <li class="list-group-item">From: ${email.sender}</li> 
    <li class="list-group-item">To: ${email.recipients}</li>
    <li class="list-group-item">Subject: ${email.subject}</li>
    <li class="list-group-item">${email.timestamp}</li>
    <li class="list-group-item">${email.body}</li>
      <br>                                                                   
    <button class="btn btn-sm btn-success" id="archive_Button">Archive</button>
    <button class="btn btn-sm btn-info" id="reply_button">Reply</button>
    
    `;

   


    // Mark email as read
    if (!email.read) {
      fetch(`/emails/${email.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
        })
      })
  }

  
  // change archive_Button to unarchive
 // change archive_Button to unarchive
    document.querySelector('#archive_Button').innerHTML = 'Unarchive';
  if (email.archived) {
    document.querySelector('#archive_Button').innerHTML = 'Unarchive';
    document.querySelector('#archive_Button').classList.remove('btn-success');
    document.querySelector('#archive_Button').classList.add('btn-danger');
} else {
    document.querySelector('#archive_Button').innerHTML = 'Archive';
    document.querySelector('#archive_Button').classList.remove('btn-danger');
    document.querySelector('#archive_Button').classList.add('btn-success');
}



       // add/remove mail to/from archive

        document.querySelector('#archive_Button').addEventListener('click', () => {
          if (email.archived) {
            fetch(`/emails/${email.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  archived: false
              })
            })
            .then(() => load_mailbox('archive'))
            

          
          } else {
            fetch(`/emails/${email.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  archived: true
              })
            })
            .then(() => load_mailbox('inbox'));

          }
        });
        //Reply Button function
          document.querySelector('#reply_button').addEventListener('click', () => {
        compose_email();
        
          document.querySelector('#compose-recipients').value = email.sender;
          document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
          document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
        });  
  });
  
}




  


function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-info-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch emails from the server
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      // Loop through emails and create a div for each email
      emails.forEach(userEmail => {
          console.log(userEmail);
        // Create a new email element
        const newEmail = document.createElement('div');
          newEmail.className = "list-group-item"; 
          newEmail.id = `email-${userEmail.id}`;

          
        // Add innerHTML to the newEmail element
          newEmail.innerHTML = `
            <h6>From: ${userEmail.sender}</h6> 
            <h7>Subject: ${userEmail.subject}</h7>
           <p>${userEmail.timestamp}</p>
          `;

          //textfeild styling only on hover pointer and border
          newEmail.style.cursor = 'pointer';
          newEmail.addEventListener('mouseover', function() {
            newEmail.style.border = '2px solid #3B71CA';
          });
          newEmail.addEventListener('mouseleave', function() {
            newEmail.style.border = 'none';
          });

          //textfeild box
          newEmail.style.borderRadius = '10px';
          newEmail.style.padding = '10px';
          newEmail.style.margin = '10px';

         

          //backround colour change on read/unread
          if (userEmail.read) {
            newEmail.style.backgroundColor = 'gray';
          } else {
            newEmail.style.backgroundColor = 'white';
          }

        // Add click event listener to the newEmail element
        newEmail.addEventListener('click', function() {
            clickedMail(userEmail.id)
        });

        // Append the newEmail element to the emails-view container
        document.querySelector('#emails-view').appendChild(newEmail);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}



// Test send mail function
function send_email(event){
  event.preventDefault();

  // Store emails
  const recipients = document.querySelector('#compose-recipients').value;
  const subject =  document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

// Store data 
fetch('/emails', {
  method: 'POST',
  body: JSON.stringify({
  recipients: recipients, 
  subject: subject, 
  body: body
    })
  })

  .then(response => response.json())
  .then(result => {

  //Print result
   console.log(result);
   load_mailbox('sent');
  });

}

