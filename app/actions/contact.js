// app/actions/contact.js
'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject') || 'No subject';
  const message = formData.get('message');

  // Validation
  if (!name || !email || !message) {
    return { success: false, message: 'All fields are required.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [process.env.EMAIL_TO],
      replyTo: email,
      subject: `Ethlathini Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Ethlathini Rest Camp website contact form.
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f9f7f3; padding: 1rem; border-radius: 8px; border-left: 4px solid #C4874A;">${message}</p>
        <hr style="border: none; border-top: 1px solid #e8e4de; margin: 1rem 0;" />
        <p style="font-size: 12px; color: #8a8a8a;">This message was sent from the Ethlathini Rest Camp website contact form.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send message. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Server error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}