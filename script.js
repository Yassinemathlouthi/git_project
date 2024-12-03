document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    };

    navSlide();

    // Planet modal
    const modal = document.getElementById('planet-modal');
    const planets = document.querySelectorAll('.planet');
    const closeModal = document.querySelector('.close-modal');

    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            const planetName = planet.getAttribute('data-planet');
            showPlanetInfo(planetName);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showPlanetInfo(planetName) {
        const modalPlanetName = document.getElementById('modal-planet-name');
        const modalPlanetInfo = document.getElementById('modal-planet-info');
        const modalPlanetGallery = document.getElementById('modal-planet-gallery');

        modalPlanetName.textContent = planetName;
        modalPlanetInfo.innerHTML = `<p>Loading ${planetName} information...</p>`;
        modalPlanetGallery.innerHTML = '';

        // Simulated API call to get planet information
        setTimeout(() => {
            const planetInfo = getPlanetInfo(planetName);
            modalPlanetInfo.innerHTML = `
                <p><strong>Type:</strong> ${planetInfo.type}</p>
                <p><strong>Distance from Sun:</strong> ${planetInfo.distance}</p>
                <p><strong>Number of Moons:</strong> ${planetInfo.moons}</p>
                <p>${planetInfo.description}</p>
            `;

            planetInfo.images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `${planetName} image`;
                modalPlanetGallery.appendChild(img);
            });
        }, 1000);

        modal.style.display = 'block';
    }

    function getPlanetInfo(planetName) {
        // This is a mock function. In a real application, this would be an API call.
        const planetData = {
            Mercury: {
                type: 'Terrestrial planet',
                distance: '57.9 million km',
                moons: 0,
                description: 'Mercury is the smallest planet in our solar system and the closest to the Sun.',
                images: ['https://source.unsplash.com/featured/?mercury,planet', 'https://source.unsplash.com/featured/?space']
            },
            Venus: {
                type: 'Terrestrial planet',
                distance: '108.2 million km',
                moons: 0,
                description: 'Venus is often called Earth\'s twin because of their similar size and proximity to the Sun.',
                images: ['https://source.unsplash.com/featured/?venus,planet', 'https://source.unsplash.com/featured/?galaxy']
            },
            Earth: {
                type: 'Terrestrial planet',
                distance: '149.6 million km',
                moons: 1,
                description: 'Earth is the only planet known to support life and has a diverse range of ecosystems.',
                images: ['https://source.unsplash.com/featured/?earth,planet', 'https://source.unsplash.com/featured/?moon']
            },
            Mars: {
                type: 'Terrestrial planet',
                distance: '227.9 million km',
                moons: 2,
                description: 'Mars is often called the Red Planet due to its reddish appearance.',
                images: ['https://source.unsplash.com/featured/?mars,planet', 'https://source.unsplash.com/featured/?asteroid']
            },
            Jupiter: {
                type: 'Gas giant',
                distance: '778.5 million km',
                moons: 79,
                description: 'Jupiter is the largest planet in our solar system and has a distinctive Great Red Spot.',
                images: ['https://source.unsplash.com/featured/?jupiter,planet', 'https://source.unsplash.com/featured/?cosmos']
            },
            Saturn: {
                type: 'Gas giant',
                distance: '1.434 billion km',
                moons: 82,
                description: 'Saturn is known for its prominent ring system, composed mainly of ice particles.',
                images: ['https://source.unsplash.com/featured/?saturn,planet', 'https://source.unsplash.com/featured/?nebula']
            },
            Uranus: {
                type: 'Ice giant',
                distance: '2.871 billion km',
                moons: 27,
                description: 'Uranus is tilted on its side, causing extreme seasonal variations.',
                images: ['https://source.unsplash.com/featured/?uranus,planet', 'https://source.unsplash.com/featured/?constellation']
            },
            Neptune: {
                type: 'Ice giant',
                distance: '4.495 billion km',
                moons: 14,
                description: 'Neptune is known for its deep blue color and strong winds.',
                images: ['https://source.unsplash.com/featured/?neptune,planet', 'https://source.unsplash.com/featured/?milkyway']
            }
        };

        return planetData[planetName];
    }

    // Quiz functionality
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const submitAnswer = document.getElementById('submit-answer');
    const quizResult = document.getElementById('quiz-result');
    const quizScore = document.getElementById('score');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');

    let currentQuestion = null;
    let score = 0;
    let currentDifficulty = 'beginner';

    function loadQuestion() {
        const question = getRandomQuestion(currentDifficulty);
        currentQuestion = question;

        quizQuestion.textContent = question.question;
        quizOptions.innerHTML = '';

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectOption(button));
            quizOptions.appendChild(button);
        });

        submitAnswer.disabled = true;
        quizResult.textContent = '';
    }

    function selectOption(selectedButton) {
        quizOptions.querySelectorAll('button').forEach(button => {
            button.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
        submitAnswer.disabled = false;
    }

    submitAnswer.addEventListener('click', () => {
        const selectedOption = quizOptions.querySelector('.selected');
        if (selectedOption) {
            const userAnswer = selectedOption.textContent;
            if (userAnswer === currentQuestion.answer) {
                score++;
                quizResult.textContent = 'Correct! Well done!';
                quizResult.style.color = '#00ff00';
            } else {
                quizResult.textContent = `Sorry, that's incorrect. The correct answer is ${currentQuestion.answer}.`;
                quizResult.style.color = '#ff0000';
            }
            quizScore.textContent = score;
            setTimeout(loadQuestion, 2000);
        }
    });

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentDifficulty = button.getAttribute('data-difficulty');
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            score = 0;
            quizScore.textContent = score;
            loadQuestion();
        });
    });

    function getRandomQuestion(difficulty) {
        const questions = {
            beginner: [
                {
                    question: "Which planet is known as the 'Red Planet'?",
                    options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
                    answer: 'Mars'
                },
                {
                    question: "What is the largest planet in our solar system?",
                    options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
                    answer: 'Jupiter'
                },
                {
                    question: "Which planet is closest to the Sun?",
                    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
                    answer: 'Mercury'
                }
            ],
            medium: [
                {
                    question: "Which planet is known for its prominent ring system?",
                    options: ['Uranus', 'Jupiter', 'Neptune', 'Saturn'],
                    answer: 'Saturn'
                },
                {
                    question: "How many moons does Mars have?",
                    options: ['0', '1', '2', '4'],
                    answer: '2'
                },
                {
                    question: "Which planet is nicknamed the 'Ice Giant'?",
                    options: ['Neptune', 'Uranus', 'Pluto', 'Saturn'],
                    answer: 'Uranus'
                }
            ],
            pro: [
                {
                    question: "What is the Great Red Spot on Jupiter?",
                    options: ['A volcano', 'A storm', 'A crater', 'An ocean'],
                    answer: 'A storm'
                },
                {
                    question: "Which planet has the shortest day in our solar system?",
                    options: ['Mercury', 'Venus', 'Jupiter', 'Saturn'],
                    answer: 'Jupiter'
                },
                {
                    question: "What is the composition of Neptune's atmosphere?",
                    options: ['Mostly nitrogen', 'Mostly carbon dioxide', 'Mostly hydrogen and helium', 'Mostly oxygen'],
                    answer: 'Mostly hydrogen and helium'
                }
            ]
        };

        const difficultyQuestions = questions[difficulty];
        return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
    }

    loadQuestion();

    // Login and Register functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
    registerBtn.addEventListener('click', () => registerModal.style.display = 'block');

    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Here you would typically send a request to your server to authenticate the user
        console.log('Login attempt:', email, password);
        loginModal.style.display = 'none';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Here you would typically send a request to your server to register the user
        console.log('Register attempt:', email, password);
        registerModal.style.display = 'none';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    });

    logoutBtn.addEventListener('click', () => {
        // Here you would typically send a request to your server to log out the user
        console.log('User logged out');
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    });

    // Password strength meter
    const passwordInput = document.getElementById('register-password');
    const passwordStrength = document.getElementById('password-strength');

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;

        switch (strength) {
            case 0:
                passwordStrength.textContent = 'Very Weak';
                passwordStrength.style.color = 'red';
                break;
            case 1:
                passwordStrength.textContent = 'Weak';
                passwordStrength.style.color = 'orange';
                break;
            case 2:
                passwordStrength.textContent = 'Medium';
                passwordStrength.style.color = 'yellow';
                break;
            case 3:
                passwordStrength.textContent = 'Strong';
                passwordStrength.style.color = 'light green';
                break;
            case 4:
                passwordStrength.textContent = 'Very Strong';
                passwordStrength.style.color = 'green';
                break;
        }
    });

    // Simple CAPTCHA
    const captchaDiv = document.getElementById('captcha');
    const captchaText = generateCaptcha();
    captchaDiv.textContent = `CAPTCHA: ${captchaText}`;
    const captchaInput = document.createElement('input');
    captchaInput.type = 'text';
    captchaInput.placeholder = 'Enter CAPTCHA';
    captchaDiv.appendChild(captchaInput);

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    registerForm.addEventListener('submit', (e) => {
        if (captchaInput.value !== captchaText) {
            e.preventDefault();
            alert('CAPTCHA is incorrect');
        }
    });

    // Admin functionality (simplified for demonstration)
    const adminLink = document.createElement('a');
    adminLink.href = '#';
    adminLink.textContent = 'Admin';
    adminLink.style.display = 'none';
    document.querySelector('.nav-links').appendChild(adminLink);

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Admin functionality would be implemented here.');
    });

    // Simulating admin login
    loginForm.addEventListener('submit', (e) => {
        const email = document.getElementById('login-email').value;
        if (email === 'admin@example.com') {
            adminLink.style.display = 'inline-block';
        }
    });
    document.addEventListener('DOMContentLoaded', () => {
        // ... (keep existing code)
    
        // Login and Register functionality
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginModal = document.getElementById('login-modal');
        const registerModal = document.getElementById('register-modal');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const switchToRegister = document.getElementById('switch-to-register');
        const switchToLogin = document.getElementById('switch-to-login');
    
        loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
        registerBtn.addEventListener('click', () => registerModal.style.display = 'block');
    
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
        });
    
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                loginModal.style.display = 'none';
                registerModal.style.display = 'none';
            });
        });
    
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) loginModal.style.display = 'none';
            if (e.target === registerModal) registerModal.style.display = 'none';
        });
    
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            // Here you would typically send a request to your server to authenticate the user
            console.log('Login attempt:', email, password);
            loginModal.style.display = 'none';
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        });
    
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            // Here you would typically send a request to your server to register the user
            console.log('Register attempt:', email, password);
            registerModal.style.display = 'none';
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        });
    
        logoutBtn.addEventListener('click', () => {
            // Here you would typically send a request to your server to log out the user
            console.log('User logged out');
            loginBtn.style.display = 'inline-block';
            registerBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        });
    
        // Password strength meter
        const passwordInput = document.getElementById('register-password');
        const passwordStrength = document.getElementById('password-strength');
    
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let strength = 0;
            if (password.match(/[a-z]+/)) strength++;
            if (password.match(/[A-Z]+/)) strength++;
            if (password.match(/[0-9]+/)) strength++;
            if (password.match(/[$@#&!]+/)) strength++;
    
            switch (strength) {
                case 0:
                    passwordStrength.textContent = 'Very Weak';
                    passwordStrength.style.color = '#ff4136';
                    break;
                case 1:
                    passwordStrength.textContent = 'Weak';
                    passwordStrength.style.color = '#ff851b';
                    break;
                case 2:
                    passwordStrength.textContent = 'Medium';
                    passwordStrength.style.color = '#ffdc00';
                    break;
                case 3:
                    passwordStrength.textContent = 'Strong';
                    passwordStrength.style.color = '#2ecc40';
                    break;
                case 4:
                    passwordStrength.textContent = 'Very Strong';
                    passwordStrength.style.color = '#01ff70';
                    break;
            }
        });
    
        // Simple CAPTCHA
        const captchaDiv = document.getElementById('captcha');
        const captchaText = generateCaptcha();
        captchaDiv.innerHTML = `<p>CAPTCHA: ${captchaText}</p>`;
        const captchaInput = document.createElement('input');
        captchaInput.type = 'text';
        captchaInput.placeholder = 'Enter CAPTCHA';
        captchaDiv.appendChild(captchaInput);
    
        function generateCaptcha() {
            return Math.random().toString(36).substring(2, 8).toUpperCase();
        }
    
        registerForm.addEventListener('submit', (e) => {
            if (captchaInput.value !== captchaText) {
                e.preventDefault();
                alert('CAPTCHA is incorrect');
            }
        });
    
        // ... (keep the rest of your existing code)
    });
});