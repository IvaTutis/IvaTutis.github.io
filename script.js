window.onscroll = function() {
    var navbar = document.getElementById('navbar');
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = '#000';
    } else {
        navbar.style.backgroundColor = '#333';
    }
};

window.onload = function() {
    fetch('homePageContent.txt')
        .then(response => response.text())
        .then(data => {
            var main = document.getElementById('home');
            var lines = data.split('\n');
            main.innerHTML = '<h1 class="heading">' + lines[0] + '</h1>';
            for (var i = 1; i < lines.length; i++) {
                main.innerHTML += '<p class="with-increased-spacing">' + lines[i] + '</p>';
            }
        });
}; 

var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}