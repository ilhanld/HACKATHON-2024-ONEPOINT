
let bg = document.getElementById("bg");
let trees = document.getElementById("trees");
let grass = document.getElementById("grass"); 
let moon = document.getElementById("moon");
let text = document.getElementById("text");

window.addEventListener('scroll', function() {
    var value = window.scrollY;

    bg.style.top = value * 0.5 + 'px';
    moon.style.left = -value * 0.4 + 'px';
    trees.style.top = -value * 0.30 + 'px';
    grass.style.top = -value * 0.15 + 'px';
    text.style.transform = 'translateY(' + (value * 2.3) + 'px)'; 
    trees.style.transform = 'translateY(' + (value * 1.5) + 'px)';
    grass.style.transform = 'translateY(' + (value * 2) + 'px)';  
});
