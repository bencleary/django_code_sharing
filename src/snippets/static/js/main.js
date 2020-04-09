String.prototype.lines = function () {
    return this.split(/\r*\n/);
}
String.prototype.lineCount = function () {
    return this.lines().length;
}

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