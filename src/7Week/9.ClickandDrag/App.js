const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 5; //mouse 민감도
    slider.scrollLeft = scrollLeft - walk;
    console.log(slider.scrollLeft, slider.offsetLeft)
});
/*
1. scrollLeft = > 객체 내 이동위치
2. offsetLeft = > 객체의 부모 객체와의 상대적 위치
3. pageX = > 문서 전체 기준
