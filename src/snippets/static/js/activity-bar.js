function showPreview() {
    let output = document.getElementById('output');
    let preview = docuemnt.getElementById('preview');
    // show preview
    document.getElementById('preview-holder').style.display = 'block';
}

function toggleDarkMode() {

    if (localStorage.getItem('mode') == 'LIGHT') {
        localStorage.setItem('mode', 'DARK');
    } else {
        localStorage.setItem('mode', 'LIGHT');
    }

    updateColorScheme();
    
}

function updateColorScheme() {
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
            document.getElementById('snip-logo').src = "http://localhost:8000/static/imgs/logo-light.png";
            break;
        case 'LIGHT':
            document.getElementById('snip-logo').src = "http://localhost:8000/static/imgs/logo.png";
            break;
    }
}