document.addEventListener('DOMContentLoaded', function() {
    fetch('personal-info/about-me.txt')
    .then(response => response.text())
    .then(text => {
        // Use innerHTML to correctly interpret <br/> tags
        document.getElementById('personal-description').innerHTML = text;
    })
    .catch(error => console.error('Error loading the description:', error));
});