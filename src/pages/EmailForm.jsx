import React, { useState } from 'react';
// Define your functional component
const EmailForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  });

  // Function to handle form submission
  const sendEmail = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Internal Server Error. Please try again later.');
    }
  };

  // Function to update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white shadow-md rounded-md text-black">
      <h1 className="text-2xl font-semibold mb-4">Email Form</h1>
      <form id="emailForm" className="space-y-4">
        <div>
          <label htmlFor="to" className="block mb-1 text-sm">To:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            required
            placeholder="Enter recipient email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="cc" className="block mb-1 text-sm">CC:</label>
          <input
            type="email"
            id="cc"
            name="cc"
            value={formData.cc}
            onChange={handleInputChange}
            placeholder="Enter CC email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="bcc" className="block mb-1 text-sm">BCC:</label>
          <input
            type="email"
            id="bcc"
            name="bcc"
            value={formData.bcc}
            onChange={handleInputChange}
            placeholder="Enter BCC email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 text-sm">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            placeholder="Enter email subject"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="body" className="block mb-1 text-sm">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            rows="4"
            required
            placeholder="Enter email body"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
          ></textarea>
        </div>

        <button
          type="button"
          onClick={sendEmail}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition-all duration-300"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

// Export the component
export default EmailForm;
