document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS SELECTION ---
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');

    const signupForm = document.getElementById('signupForm');
    const signupUsername = document.getElementById('signupUsername');
    const fullName = document.getElementById('fullName');
    const signupPassword = document.getElementById('signupPassword');

    const signupUsernameError = document.getElementById('signupUsernameError');
    const signupErrorFullname = document.getElementById('signupErrorFullname');
    const signupPasswordError = document.getElementById('signupPasswordError');

    const switchBtn = document.getElementById('switchBtn');
    const toggleText = document.getElementById('toggleText');

    const dividerBox = document.querySelector('.divider');
    const fbBox = document.querySelector('.fb-login');
    const forgotPass = document.querySelector('.forgot-password');

    // FIX 1: Selecting forgotPassBtn properly
    const forgotPassBtn = document.getElementById('forgotPassBtn') || document.querySelector('.forgot-password a');
    const forgotModal = document.getElementById('forgotModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const forgotForm = document.getElementById('forgotForm');
    const forgotMobile = document.getElementById('forgotMobile');
    const forgotNewPass = document.getElementById('forgotNewPass');
    const forgotMobileError = document.getElementById('forgotMobileError');
    const forgotPassError = document.getElementById('forgotPassError');

    let isSignUp = false;

    // Helper: Clear Errors & Reset Input Validation States
    function clearErrors() {
        if (usernameInput) usernameInput.classList.remove('error');
        if (usernameError) usernameError.textContent = '';
        if (passwordInput) passwordInput.classList.remove('error');
        if (passwordError) passwordError.textContent = '';
        if (signupUsername) signupUsername.classList.remove('error');
        if (signupUsernameError) signupUsernameError.textContent = '';
        if (fullName) fullName.classList.remove('error');
        if (signupErrorFullname) signupErrorFullname.textContent = '';
        if (signupPassword) signupPassword.classList.remove('error');
        if (signupPasswordError) signupPasswordError.textContent = '';
        
        checkInputs();
    }

    // --- 1. TOGGLE BETWEEN LOGIN & SIGN UP ---
    if (switchBtn) {
        switchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isSignUp = !isSignUp;
            clearErrors();

            if (isSignUp) {
                if (loginForm) loginForm.classList.add('hidden');
                if (signupForm) signupForm.classList.remove('hidden');

                if (dividerBox) dividerBox.classList.add('hidden');
                if (fbBox) fbBox.classList.add('hidden');
                if (forgotPass) forgotPass.classList.add('hidden');

                if (toggleText) toggleText.textContent = "Have an account?";
                switchBtn.textContent = "Log in";
            } else {
                if (signupForm) signupForm.classList.add('hidden');
                if (loginForm) loginForm.classList.remove('hidden');

                if (dividerBox) dividerBox.classList.remove('hidden');
                if (fbBox) fbBox.classList.remove('hidden');
                if (forgotPass) forgotPass.classList.remove('hidden');

                if (toggleText) toggleText.textContent = "Don't have an account?";
                switchBtn.textContent = "Sign up";
            }
        });
    }

    // --- 2. LOGIN FORM INPUT LISTENERS ---
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            if (passwordInput.value.trim() === '') {
                passwordInput.classList.add('error');
                if (passwordError) passwordError.textContent = 'Please enter password in this box';
            }
        });

        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.trim() !== '') {
                passwordInput.classList.remove('error');
                if (passwordError) passwordError.textContent = '';
            }
            checkInputs();
        });

        passwordInput.addEventListener('focus', () => {
            if (usernameInput && usernameInput.value.trim() === '') {
                usernameInput.classList.add('error');
                if (usernameError) usernameError.textContent = 'Please enter details in this box';
            }
        });
    }

    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            if (usernameInput.value.trim() !== '') {
                usernameInput.classList.remove('error');
                if (usernameError) usernameError.textContent = '';
            }
            checkInputs();
        });
    }

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordBtn.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.textContent = 'Show';
            }
        });
    }

    function checkInputs() {
        if (!usernameInput || !passwordInput || !loginBtn) return;
        const usernameValue = usernameInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const isTenDigit = /^\d{10}$/.test(usernameValue);

        loginBtn.disabled = !(isTenDigit && passwordValue.length >= 6);
    }

    // --- 3. SIGN UP FOCUS & VALIDATION LOGIC ---
    if (fullName && signupUsername) {
        fullName.addEventListener('focus', () => {
            if (signupUsername.value.trim() === '') {
                signupUsername.classList.add('error');
                if (signupUsernameError) signupUsernameError.textContent = 'Please enter details in this box';
            }
        });
    }

    if (signupPassword && signupUsername && fullName) {
        signupPassword.addEventListener('focus', () => {
            if (signupUsername.value.trim() === '') {
                signupUsername.classList.add('error');
                if (signupUsernameError) signupUsernameError.textContent = 'Please enter details in this box';
            }
            if (fullName.value.trim() === '') {
                fullName.classList.add('error');
                if (signupErrorFullname) signupErrorFullname.textContent = 'Please enter details in this box';
            }
        });
    }

    if (signupUsername) {
        signupUsername.addEventListener('input', () => {
            if (signupUsername.value.trim() !== '') {
                signupUsername.classList.remove('error');
                if (signupUsernameError) signupUsernameError.textContent = '';
            }
        });
    }

    if (fullName) {
        fullName.addEventListener('input', () => {
            fullName.value = fullName.value.toUpperCase();
            const hasNonAlphabet = /[^A-Z\s]/.test(fullName.value);

            if (hasNonAlphabet) {
                fullName.classList.add('error');
                if (signupErrorFullname) signupErrorFullname.textContent = 'Please enter only Alphabets';
            } else {
                fullName.classList.remove('error');
                if (signupErrorFullname) signupErrorFullname.textContent = '';
            }
        });
    }

    if (signupPassword) {
        signupPassword.addEventListener('input', () => {
            if (signupPassword.value.trim() !== '') {
                signupPassword.classList.remove('error');
                if (signupPasswordError) signupPasswordError.textContent = '';
            }
        });

        signupPassword.addEventListener('blur', () => {
            if (signupPassword.value.trim() === '') {
                signupPassword.classList.add('error');
                if (signupPasswordError) signupPasswordError.textContent = 'Please enter details in this box';
            }
        });
    }

    // --- 4. SIGN UP SUBMISSION ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userVal = signupUsername ? signupUsername.value.trim() : '';
            const passVal = signupPassword ? signupPassword.value.trim() : '';
            const nameVal = fullName ? fullName.value.trim() : '';

            // 10-digit number validation check
            const isTenDigit = /^\d{10}$/.test(userVal);
            if (!isTenDigit) {
                if (signupUsername) signupUsername.classList.add('error');
                if (signupUsernameError) signupUsernameError.textContent = 'Please enter a valid 10-digit mobile number';
                return;
            }

            // Alphabet-only Full Name check
            const hasNonAlphabet = /[^A-Z\s]/.test(nameVal);
            if (hasNonAlphabet || nameVal === '') {
                if (fullName) fullName.classList.add('error');
                if (signupErrorFullname) signupErrorFullname.textContent = 'Please enter only Alphabets';
                return;
            }

            if (passVal === '' || passVal.length < 6) {
                if (signupPassword) signupPassword.classList.add('error');
                if (signupPasswordError) signupPasswordError.textContent = 'Password must be at least 6 characters';
                return;
            }

            let users = JSON.parse(localStorage.getItem('talkoUsers')) || [];
            const userExists = users.some(u => String(u.username) === String(userVal));

            if (userExists) {
                if (signupUsername) signupUsername.classList.add('error');
                if (signupUsernameError) signupUsernameError.textContent = 'User already registered!';
                return;
            }

            const newUser = {
                username: userVal,
                phone: userVal,
                name: nameVal,
                password: passVal,
                avatarImg: '',
                isBlocked: false
            };

            users.push(newUser);
            localStorage.setItem('talkoUsers', JSON.stringify(users));

            alert('Account created successfully!');

            if (switchBtn) switchBtn.click();
            if (usernameInput) usernameInput.value = userVal;
            checkInputs();
        });
    }

    // --- 5. LOGIN SUBMISSION ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const value = usernameInput.value.trim();
            const passValue = passwordInput.value.trim();

            clearErrors();

            const users = JSON.parse(localStorage.getItem('talkoUsers')) || [];
            const foundUser = users.find(u => String(u.username) === String(value) || String(u.phone) === String(value));

            if (!foundUser) {
                usernameInput.classList.add('error');
                if (usernameError) usernameError.textContent = 'This account is not registered';
                return;
            }

            if (foundUser.isBlocked) {
                usernameInput.classList.add('error');
                if (usernameError) usernameError.textContent = 'You are blocked!';
                return;
            }

            if (foundUser.password !== passValue) {
                passwordInput.classList.add('error');
                if (passwordError) passwordError.textContent = 'Incorrect password';
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(foundUser));

            alert(`Logged in successfully as: ${foundUser.name || foundUser.username}`);
            window.location.replace("dashboard.html");
        });
    }

    // --- 6. FORGOT PASSWORD MODAL HANDLERS ---
    if (forgotPassBtn && forgotModal) {
        forgotPassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            forgotModal.classList.remove('hidden');
        });
    }

    if (closeForgotModal && forgotModal) {
        closeForgotModal.addEventListener('click', () => {
            forgotModal.classList.add('hidden');
            if (forgotMobile) forgotMobile.value = '';
            if (forgotNewPass) forgotNewPass.value = '';
            if (forgotMobileError) forgotMobileError.textContent = '';
            if (forgotPassError) forgotPassError.textContent = '';
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const mobileVal = forgotMobile ? forgotMobile.value.trim() : '';
            const newPassVal = forgotNewPass ? forgotNewPass.value.trim() : '';

            if (forgotMobileError) forgotMobileError.textContent = '';
            if (forgotPassError) forgotPassError.textContent = '';

            const isTenDigit = /^\d{10}$/.test(mobileVal);
            if (!isTenDigit) {
                if (forgotMobileError) forgotMobileError.textContent = 'Enter valid 10-digit number';
                return;
            }

            if (newPassVal.length < 6) {
                if (forgotPassError) forgotPassError.textContent = 'Password must be at least 6 characters';
                return;
            }

            let users = JSON.parse(localStorage.getItem('talkoUsers')) || [];
            const userIndex = users.findIndex(u => String(u.username) === String(mobileVal) || String(u.phone) === String(mobileVal));

            if (userIndex === -1) {
                if (forgotMobileError) forgotMobileError.textContent = 'No account registered with this number!';
                return;
            }

            users[userIndex].password = newPassVal;
            localStorage.setItem('talkoUsers', JSON.stringify(users));

            alert('Password reset successfully! Please log in with your new password.');
            
            if (forgotModal) forgotModal.classList.add('hidden');
            if (forgotMobile) forgotMobile.value = '';
            if (forgotNewPass) forgotNewPass.value = '';
            
            if (usernameInput) usernameInput.value = mobileVal;
            if (passwordInput) passwordInput.value = '';
            checkInputs();
        });
    }

    // --- FACEBOOK LOGIN DEMO ALERT ---
    const fbLoginBtn = document.querySelector('.fb-login a');
    if (fbLoginBtn) {
        fbLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Facebook OAuth is disabled in frontend demo mode. Please log in using Mobile Number & Password.');
        });
    }

    checkInputs(); 
});