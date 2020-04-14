let input = document.getElementById('input');
let lines = document.getElementById('lines');
let plines = document.getElementById('previewLines');
let preview = document.getElementById('preview');
let previewHolder = document.getElementById('preview-holder');
let output = document.getElementById('output');
let save = document.getElementById('save');

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

let message = {};

function parseTags() {
    let title = input.value.match('(\&#:TITLE:)(.*?)(\:&#)');
    let syntax = input.value.match('(\&#:SYNTAX:)(.*?)(\:&#)');
    let description = input.value.match('(&#:DESC:)(.|\n)*?(:&#)');
    let values = [title, syntax, description];
    values.forEach(x => {
        if (x != null) {
            input.value = input.value.replace(x[0], '').trim();
        }
    })
    message = {
        title: title != null ? title[2] : "",
        syntax: syntax != null ? syntax[2] : "",
        description: description != null ? description[0].replace('&#:DESC:', '').replace(':&#', '') : "",
        content: input.value
    };
}


preview.addEventListener('click', (event) => {
    output.className = "text-sm break-words";
    previewHolder.style.display = 'block';


    parseTags();

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




document.addEventListener('DOMContentLoaded', (event) => {
    //updateColorScheme();
});

save.addEventListener('click', (event) => {
    console.log(message);
    let sourceURN = input.getAttribute('data-cloned-from');
    if (sourceURN) {
        message.source = sourceURN
    };
    axios.post('/api/v1/snippet/', message).then(res => {
        console.log(res.data);
        window.history.replaceState(null, null, `/${res.data.urn}/`);
        window.location.reload();
    })
})

function saveImage() {
    domtoimage.toJpeg(document.getElementById('output'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
}