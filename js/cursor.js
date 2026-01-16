const cursor = document.querySelector('.custom-cursor');
const interactiveElements = 'a, button, .cursor-hover';

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    const dt = 0.15;
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;

    cursor.style.transform = `translate3d(${cursorX - 30}px, ${cursorY - 30}px, 0)`;

    requestAnimationFrame(updateCursor);
}

document.querySelectorAll(interactiveElements).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
});

requestAnimationFrame(updateCursor);
