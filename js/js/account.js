document.getElementById('accountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        enrollmentNumber: document.getElementById('enrollmentNumber').value,
        department: document.getElementById('department').value,
        semester: parseInt(document.getElementById('semester').value),
        createdAt: new Date().toLocaleString()
    };
    
    let accounts = JSON.parse(localStorage.getItem('shelves_accounts') || '[]');
    
    if (accounts.some(acc => acc.username === formData.username)) {
        document.getElementById('formMessage').innerHTML = '<p style="color:red;">❌ Username exists!</p>';
        return;
    }
    
    accounts.push(formData);
    localStorage.setItem('shelves_accounts', JSON.stringify(accounts));
    
    document.getElementById('formMessage').innerHTML = '<p style="color:green;">✅ Account created!</p>';
    document.getElementById('accountForm').reset();
    console.log('Accounts:', accounts);
});