// Function to check if an element is in the viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Function to handle the animation
const handleAnimations = () => {
    const fadeIns = document.querySelectorAll('.fade-in');

    fadeIns.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('appear');
        }
    });
};

// Listen for scroll and resize events
window.addEventListener('scroll', handleAnimations);
window.addEventListener('resize', handleAnimations);

// Run the function on page load to animate elements already in view
document.addEventListener('DOMContentLoaded', handleAnimations);