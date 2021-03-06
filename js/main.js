// 배지 및 스크롤 시작 //
// 스크롤이 어떤 값 이상으로 커지면 배지를 사라지게 한다.
const badgeEl = document.querySelector('header .badges');
// 스크롤이 어떤 값 이상으로 커지면 스크롤 버튼을 사라지게 한다.
const toTopEl = document.querySelector('#to-top');

// 화면자체
window.addEventListener('scroll', _.throttle(function() { // 일정 시간 마다 함수가 실행되게 제한을 두는 lodashjs 애니메이션 라이브러리
  if(window.scrollY > 500) {
    // 배지 숨기기
    // badgeEl.style.display = 'none';
    // gsap.to(요소, 지속시간, {옵션})
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    }); 
    // 가장 위로 올라가는 스크롤 애니메이션 기능
    // 스크롤 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 스크롤 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100 // x축으로 100픽셀 이동하여 숨겨짐
    });
  }
}, 300));


// 가장 위로 올라가는 스크롤 애니메이션 기능
// scrollTo 옵선을 사용하기 위해 cdn 가져옴
toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0 // 스크롤(화면)의 위치를 0픽셀 지점으로 이동 (0.7초 동안)
  })
})
// 배지 및 스크롤 끝 //

// 첫번째 섹션의 이미지들이 시간차로 순서대로 나타남
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  // gsap.to(요소, 지속시간, {옵션})
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});


// 공지사항 스와이퍼
// (선택자, {옵션})
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
}); 

// 프로모션 스와이퍼
new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백 픽셀
  centeredSlides: true, // 첫번째 슬라이드가 가운데 위치
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

// AWARDS 스와이퍼
new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

// Promotion Toggle
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 램덤한 숫자를 생성하는 함수
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 둥둥 떠다니는 스티커
function floatingObject(selector, delay, size) {
  // 애니메이션 삽입
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1, // 무한반복
      yoyo: true, // 한번 재생하고 다시 뒤로 재생해서 돌아오도록
      ease: Power1.easeInOut, // Easing 함수
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  // Scene() - 특정 요소를 감시하는 옵션을 지정하는 메소드
  // setClassToggle() - HTML 클래스 지정 
  // addTo() - 컨트롤러 추가
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 감시하고 있는 섹션 정보 (보여짐 여부를 감시할 요소를 지정)
      triggerHook: .8 // 뷰포트 - 시작:0, 끝:1
    })
    .setClassToggle(spyEl, 'show') // 해당 요소에 HTML 클래스 추가
    .addTo(new ScrollMagic.Controller());
});



