interface Email {
  from: string
  to: string
  subject: string
  text: string
}

function sendEmail(email: Email) {}
