document.addEventListener("DOMContentLoaded", function() {
    const scrollingWrapper = document.querySelector('.scrolling-wrapper');
    const itemsContainer = document.querySelector('.items-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    const itemWidth = itemsContainer.firstElementChild.offsetWidth;
    const containerWidth = scrollingWrapper.offsetWidth;
    const itemsWidth = itemsContainer.offsetWidth;
    const scrollStep = containerWidth / 2;

    let scrollPosition = 0;

    prevButton.addEventListener('click', scrollBackward)
    nextButton.addEventListener('click', scrollForward);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            scrollForward(); // 
        } else if (event.key === 'ArrowLeft') {
            scrollBackward(); // 
        }
    });

    function scrollBackward() {
        scrollPosition -= scrollStep;
        if (scrollPosition >  0) {
            scrollPosition = Math.max(itemsWidth - containerWidth);
        }
        itemsContainer.style.transform = `translateX(-${scrollPosition}px)`;
    }

    function scrollForward() {
        scrollPosition += scrollStep;
        if (scrollPosition > itemsWidth) {
            scrollPosition = 0;
        }
        itemsContainer.style.transform = `translateX(-${scrollPosition}px)`;
    }
});
