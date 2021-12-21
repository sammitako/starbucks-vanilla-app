const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', 'search');
});

searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 스크롤이 어떤 값 이상으로 커지면 배지를 사라지게 한다.
const badgeEl = document.querySelector('header .badges');

// 화면자체
window.addEventListener('scroll', _.throttle(function() { // 일정 시간 마다 함수가 실행되게 제한을 두는 js 애니메이션 라이브러리
  if(window.scrollY > 500) {
    // 배지 숨기기
    // badgeEl.style.display = 'none';
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    }); // 요소, 지속시간, {옵션}
  } else {
    // 배지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
  }
}, 300));