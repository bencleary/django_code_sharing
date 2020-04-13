let input = document.getElementById('input');
let lines = document.getElementById('lines');
let plines = document.getElementById('previewLines');
let preview = document.getElementById('preview');
let previewHolder = document.getElementById('preview-holder');
let output = document.getElementById('output');

function makeLineNumber(number) {
    let li = document.createElement('li');
    li.innerText = number;
    lines.append(li);
}

function updateLineNumber() {
    input.style.height = input.scrollHeight + 10 + "px";
    lines.innerHTML = "";
    let counts = input.value.lineCount() + 1;
    for (x = 1; x < counts; x++) {
        makeLineNumber(x);
    }
}

input.addEventListener('change', updateLineNumber, false);
input.addEventListener('keyup', updateLineNumber, false);
input.addEventListener('keypress', updateLineNumber, false);
input.addEventListener('keydown', function (e) {
    let key = e.key;
    if (key == "Tab") {
        e.preventDefault();
        const TABSIZE = 4;
        document.execCommand('insertText', false, ' '.repeat(TABSIZE));
    }
})
//input.addEventListener('change', updateLineNumber());

preview.addEventListener('click', (event) => {
    output.className = "text-sm break-words";
    previewHolder.style.display = 'block';
    output.innerText = input.value;
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    plines.innerHTML = "";
    let counts = input.value.lineCount() + 1;
    for (x = 1; x < counts; x++) {
        let li = document.createElement('li');
        li.innerText = x;
        plines.append(li);
    }
})


function reset() {
    previewHolder.style.display = 'none';
    output.innerText = "";
    input.value = "";
    updateLineNumber();
}

function hidePreview() {
    previewHolder.style.display = 'none';
}

function updateTextArea() {
    updateLineNumber();
}

updateTextArea();


function toggleDarkMode() {

    if (localStorage.getItem('mode') == 'LIGHT') {
        localStorage.setItem('mode', 'DARK');
    } else {
        localStorage.setItem('mode', 'LIGHT');
    }

    switch (localStorage.getItem('mode')) {
        case 'LIGHT':
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('mode', 'LIGHT');
            break;
        case 'DARK':
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('mode', 'DARK');
            break;
    }
    toggleButtonIcon();
    updateButtonTitle();
    updateLogo();
}

function toggleButtonIcon() {
    switch (localStorage.getItem('mode')) {
        case 'DARK':
            document.getElementById('light-dark-toggle').innerHTML = '<i class="fas fa-sun"></i>';
            break;
        case 'LIGHT':
            document.getElementById('light-dark-toggle').innerHTML = '<i class="fas fa-moon"></i>';
            break;
    }

}

function updateButtonTitle() {
    switch (localStorage.getItem('mode')) {
        case 'DARK':
            document.getElementById('light-dark-toggle').title = 'Enable Light Mode';
            break;
        case 'LIGHT':
            document.getElementById('light-dark-toggle').title = 'Enable Dark Mode';
            break;
    }
}

function updateLogo() {
    switch (localStorage.getItem('mode')) {
        case 'DARK':
            document.getElementById('snip-logo').src = "/static/imgs/logo-light.png";
            break;
        case 'LIGHT':
            document.getElementById('snip-logo').src = "/static/imgs/logo.png";
            break;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    switch (localStorage.getItem('mode')) {
        case 'LIGHT':
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('mode', 'LIGHT');
            break;
        case 'DARK':
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('mode', 'DARK');
            break;
    }
    toggleButtonIcon();
    updateButtonTitle();
    updateLogo();
});