const securityUpdateDescription = document.getElementById("securityUpdateDescription-logout")
securityUpdateDescription.addEventListener('click', () => {
    confirm('Are you sure you want to logout?')
    if (confirm == 0) {
        alert("ok")
    }
    window.location.href = '../HTML/Register.html'
})





        // Access the toggle button and the body element
        const toggleButton = document.getElementById('toggle-button');
        const body = document.body;

        // Check for saved theme in local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.className = savedTheme;
            toggleButton.innerHTML = savedTheme === 'dark-mode'
                ? '<i class="fa fa-toggle-on" aria-hidden="true"></i>'
                : '<i class="fa fa-toggle-off" aria-hidden="true"></i>';
        }

        // Toggle between dark and light modes
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                toggleButton.innerHTML = '<i class="fa fa-toggle-on" aria-hidden="true"></i>';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                toggleButton.innerHTML = '<i class="fa fa-toggle-off" aria-hidden="true"></i>';
                localStorage.setItem('theme', 'light-mode');
            }
        });


//confirm box
   
    const confirmBox = document.getElementById('custom-confirm');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');
    const logout = document.getElementById('securityUpdateDescription-logout')







