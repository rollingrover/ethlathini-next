// app/actions/booking.js
'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Minimal HTML-escaping so submitted text can't break out of the email markup
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendBookingEmail(formData) {
  const name = formData.get('name');
  const surname = formData.get('surname');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const arrive = formData.get('arrive');
  const depart = formData.get('depart');
  const adults = formData.get('adults');
  const children = formData.get('children');
  const vehicle = formData.get('vehicle');
  const notes = formData.get('notes');
  const siteType = formData.get('siteType') || 'Not specified';

  // Validation
  if (!name || !surname || !email || !phone || !arrive || !depart) {
    return { success: false, message: 'All required fields must be filled.' };
  }

  // Calculate nights
  const arriveDate = new Date(arrive);
  const departDate = new Date(depart);
  const nights = Math.round((departDate - arriveDate) / 86400000);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [process.env.EMAIL_TO],
      replyTo: email,
      subject: `New Booking Request from ${name} ${surname}`,
      text: `
New Booking Request

Guest Details:
---------------
Name: ${name} ${surname}
Email: ${email}
Phone: ${phone}

Stay Details:
-------------
Arrival: ${arrive}
Departure: ${depart}
Nights: ${nights}
Adults: ${adults}
Children: ${children}

Site Type: ${siteType}
Vehicle: ${vehicle || 'Not specified'}

Additional Notes:
-----------------
${notes || 'None'}

---
This booking request was sent from the Ethlathini Rest Camp website.
      `,
      html: `
        <h2>New Booking Request</h2>
        
        <h3>Guest Details</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)} ${escapeHtml(surname)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        
        <h3>Stay Details</h3>
        <p><strong>Arrival:</strong> ${escapeHtml(arrive)}</p>
        <p><strong>Departure:</strong> ${escapeHtml(depart)}</p>
        <p><strong>Nights:</strong> ${nights}</p>
        <p><strong>Adults:</strong> ${escapeHtml(adults)}</p>
        <p><strong>Children:</strong> ${escapeHtml(children)}</p>
        
        <h3>Site Details</h3>
        <p><strong>Site Type:</strong> ${escapeHtml(siteType)}</p>
        <p><strong>Vehicle:</strong> ${escapeHtml(vehicle || 'Not specified')}</p>
        
        <h3>Additional Notes</h3>
        <p style="background: #f9f7f3; padding: 1rem; border-radius: 8px; border-left: 4px solid #C4874A;">${escapeHtml(notes || 'None')}</p>
        
        <hr style="border: none; border-top: 1px solid #e8e4de; margin: 1rem 0;" />
        <p style="font-size: 12px; color: #8a8a8a;">This booking request was sent from the Ethlathini Rest Camp website.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send booking request. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Server error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}