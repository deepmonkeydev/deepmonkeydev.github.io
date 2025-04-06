// Boot sequence
const bootScreen = document.getElementById('boot-screen');
const mainInterface = document.getElementById('main-interface');
const bootLines = [
    document.getElementById('boot-line-1'),
    document.getElementById('boot-line-2'),
    document.getElementById('boot-line-3'),
    document.getElementById('boot-line-4'),
    document.getElementById('boot-line-5'),
    document.getElementById('boot-line-6')
];
const bootTime = document.getElementById('boot-time');
const terminal = document.querySelector('.terminal');
const responseElement = document.getElementById('response');

function updateBootTime() {
    const now = new Date();
    bootTime.textContent = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.toLocaleTimeString('en-US', { hour12: false })}`;
}

let delay = 0;
bootLines.forEach((line, index) => {
    setTimeout(() => {
        line.style.display = 'block';
        if (index === 3) updateBootTime();
    }, delay);
    delay += 600;
});

setTimeout(() => {
    bootScreen.style.opacity = '0';
    setTimeout(() => {
        bootScreen.style.display = 'none';
        mainInterface.style.display = 'block';
        mainInterface.style.opacity = '1';

        const img = new Image();
        img.src = 'background.jpg';
        img.onload = () => {
            terminal.classList.add('loaded');
        };
        img.onerror = () => {
            console.error('Failed to load background.jpg');
            responseElement.textContent = 'Error: Background image failed to load.';
        };
    }, 500);
}, delay + 1200);

// Time and date update
function updateTimeDate() {
    const now = new Date();
    document.getElementById('date').textContent = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    document.getElementById('time').textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateTimeDate, 1000);
updateTimeDate();

// Input functionality
const inputPrompt = document.querySelector('.input-prompt');
const randomResponses = [
    "Try again but this time use just one word",
    "The wisdom of the ancients is beyond your grasp",
    "You are not prepared",
    "Comfort and error messages are for the weak",
    "You are not a worthy adversary",
    "How hard is it to type a single word?",
    "Response not found....Its here but you can't see it",
];

inputPrompt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = inputPrompt.value.trim().toLowerCase();
        if (randomResponsess[command]) {
            responseElement.textContent = responses[command];
        } else {
            const randomIndex = Math.floor(Math.random() * randomResponses.length);
            responseElement.textContent = randomResponses[randomIndex];
        }
        inputPrompt.value = '';
    }
});

// Login prompt functionality
const guestButton = document.getElementById('guest-button');
const loginPrompt = document.getElementById('login-prompt');
const loginSubmit = document.getElementById('login-submit');
const loginCancel = document.getElementById('login-cancel');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

guestButton.addEventListener('click', () => {
    loginPrompt.classList.add('active');
});

loginCancel.addEventListener('click', () => {
    loginPrompt.classList.remove('active');
    usernameInput.value = '';
    passwordInput.value = '';
});

loginSubmit.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (username && password) {
        responseElement.textContent = `Logged in as: ${username}`;
        loginPrompt.classList.remove('active');
        usernameInput.value = '';
        passwordInput.value = '';
    } else {
        responseElement.textContent = 'Please enter both username and password.';
    }
});