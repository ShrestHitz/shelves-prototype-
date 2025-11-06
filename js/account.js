document.addEventListener('DOMContentLoaded', function() {
    const accountForm = document.getElementById('accountForm');
    const formMessage = document.getElementById('formMessage');

    accountForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous messages
        formMessage.textContent = '';
        formMessage.className = '';

        // Get form data
        const formData = {
            username: document.getElementById('username').value,
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            enrollmentNumber: document.getElementById('enrollmentNumber').value,
            department: document.getElementById('department').value,
            semester: parseInt(document.getElementById('semester').value)
        };

        try {
            // Make API call to create user
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Account created successfully
                formMessage.textContent = 'Account created successfully!';
                formMessage.className = 'success-message';
                accountForm.reset();
            } else if (response.status === 400) {
                // Username already exists
                formMessage.textContent = 'Username already exists. Please choose a different username.';
                formMessage.className = 'error-message';
            } else {
                // Other error
                formMessage.textContent = 'Error creating account. Please try again.';
                formMessage.className = 'error-message';
            }
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = 'Error connecting to server. Please try again later.';
            formMessage.className = 'error-message';
        }
    });
});