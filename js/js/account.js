// API base URL - change this to your backend URL
const API_BASE_URL = 'http://localhost:8080/api';

document.getElementById('accountForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        username: document.getElementById('username').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        enrollmentNumber: document.getElementById('enrollmentNumber').value,
        department: document.getElementById('department').value,
        semester: parseInt(document.getElementById('semester').value)
    };
    
    const messageDiv = document.getElementById('formMessage');
    messageDiv.innerHTML = '<p>Creating account...</p>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.innerHTML = `<p class="success-message">${data.message}</p>`;
            document.getElementById('accountForm').reset();
        } else {
            messageDiv.innerHTML = `<p class="error-message">${data.error || 'Failed to create account'}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = '<p class="error-message">Network error. Please try again.</p>';
    }
});