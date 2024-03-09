document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleToolbox');
    const toolbox = document.getElementById('toolbox');

    toggleButton.addEventListener('click', function() {
        toolbox.classList.toggle('toolbox-visible');
    });
});