$('.bottom-menu > li').mouseenter(function() {
    var dropdown = $('.dropdown', this);
    dropdown.stop().slideDown(300);   // 300ms 동안 아래로 펼쳐짐
    });

    $('.bottom-menu > li').mouseleave(function() {
    var dropdown = $('.dropdown', this);
    dropdown.stop().slideUp(300);     // 300ms 동안 위로 접힘
    });

        const bannerSwiper = new Swiper('.banner.swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 24,
            loop: true,
            speed: 600,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: '.ctrl-prev',
                nextEl: '.ctrl-next'
            },
            on: {
                init: function () { updateProgress(this); },
                slideChange: function () { updateProgress(this); }
            }
        });

        // 진행 라인 채우기
        function updateProgress(sw) {
            var total = $('.banner .swiper-slide').not('.swiper-slide-duplicate').length;
            var percent = ((sw.realIndex + 1) / total) * 100;
            $('.ctrl-progress-fill').css('width', percent + '%');
        }

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

            const subNavSwiper = new Swiper('.sub-nav-swiper.swiper', {
                slidesPerView: 'auto',
                spaceBetween: 50,
                freeMode: true,
                navigation: {
            prevEl: '.sub-nav-prev',
            nextEl: '.sub-nav-next'
        }
    });

    // todaySale Swiper
    $('.todaySale-swiper .product-list > li').addClass('swiper-slide');
    $('.recommended-swiper .product-list > li').addClass('swiper-slide');


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

