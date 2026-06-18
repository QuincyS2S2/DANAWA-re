    // ===== 상단 메인 배너: 카드형 슬라이더 + 자동재생 + 진행바 + 재생/정지 =====
    // 진행 라인 채우기 (현재 슬라이드 위치 / 전체)
    function updateProgress(sw) {
        var total = $('.banner .swiper-slide').not('.swiper-slide-duplicate').length;
        var percent = ((sw.realIndex + 1) / total) * 100;
        $('.ctrl-progress-fill').css('width', percent + '%');
    }

    const bannerSwiper = new Swiper('.banner.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: '.ctrl-prev',
            nextEl: '.ctrl-next',
        },
        on: {
            init: updateProgress,
            slideChange: updateProgress,
        },
    });

    // 재생 / 정지 토글
    $('.ctrl-play').on('click', function () {
        if ($('.ctrl-play').hasClass('paused')) {
            bannerSwiper.autoplay.start();
            $('.ctrl-play').removeClass('paused').attr('aria-label', '자동재생 정지');
        } else {
            bannerSwiper.autoplay.stop();
            $('.ctrl-play').addClass('paused').attr('aria-label', '자동재생 시작');
        }
    });

    // ===== 서브 카테고리 네비게이션 배너 =====
    const subNavSwiper = new Swiper('.sub-nav-swiper.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 50,
        freeMode: true,
        navigation: {
            prevEl: '.sub-nav-prev',
            nextEl: '.sub-nav-next',
        },
    });

    $('.todaySale-swiper .product-list > li').addClass('swiper-slide');
    $('.recommended-swiper .product-list > li').addClass('swiper-slide');
 
    // jQuery 없이 하려면:
    // document.querySelectorAll('.todaySale-swiper .product-list > li, .recommended-swiper .product-list > li')
    //   .forEach(li => li.classList.add('swiper-slide'));
 
    const todaySaleSwiper = new Swiper('.todaySale-swiper', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
        navigation: {
            prevEl: '.todaySale .back-arrow',
            nextEl: '.todaySale .next-arrow',
        },
        breakpoints: {
            768:  { slidesPerView: 4, slidesPerGroup: 4 },
            1200: { slidesPerView: 6, slidesPerGroup: 6 },
        },
    });
 
    const recommendedSwiper = new Swiper('.recommended-swiper', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
        navigation: {
            prevEl: '.RecommendedProducts .back-arrow',
            nextEl: '.RecommendedProducts .next-arrow',
        },
        breakpoints: {
            768:  { slidesPerView: 4, slidesPerGroup: 4 },
            1200: { slidesPerView: 6, slidesPerGroup: 6 },
        },
    });

    // EventZone(난리난 다나와): 애플 스토어 스타일 가로 슬라이더
    // 왼쪽은 콘텐츠에 정렬, 오른쪽은 화면 밖으로 흘러나가는(bleed) 구조
    const eventzoneSwiper = new Swiper('.eventzone-swiper', {
        slidesPerView: 'auto',   // 카드 고정폭(380px)에 맞춰 자동 배치
        spaceBetween: 20,
        navigation: {
            prevEl: '.EventZone .ez-prev',
            nextEl: '.EventZone .ez-next',
        },
    });

    const underNav = new Swiper('.under-nav-swiper', {
    slidesPerView: 'auto',   // 각 탭이 글자 길이만큼만
    spaceBetween: 20,        // gap 역할
    freeMode: true,          // 슬라이드에 안 끼고 자유 스크롤
    grabCursor: true,        // 마우스 올리면 손 모양 커서
});

// 클릭하면 언더라인(active) 이동
document.querySelectorAll('.under-nav-swiper .swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        document.querySelector('.under-nav-swiper .swiper-slide.active')?.classList.remove('active');
        slide.classList.add('active');
    });
});


window.addEventListener('load', function () {
    const marquee = document.querySelector('.marquee');
    const track = document.querySelector('.marquee-track');
    if (!marquee || !track) return;

    // 처음에 들어있던 로고들을 '씨앗'으로 저장
    const seed = Array.from(track.children).map(n => n.cloneNode(true));

    // 1) 한 세트가 화면 폭을 덮을 때까지 로고 반복
    while (track.scrollWidth < marquee.clientWidth) {
        seed.forEach(n => track.appendChild(n.cloneNode(true)));
    }
    // 2) 현재 내용을 통째로 한 번 더 복제 → 완벽한 2등분
    Array.from(track.children).forEach(n => track.appendChild(n.cloneNode(true)));
});