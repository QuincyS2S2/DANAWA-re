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




//하단은 표 만들기 div class="Monthly-Info-Container 파트

    // 캔버스 요소 가져오기
    const ctx = document.getElementById('priceTrendChart').getContext('2d');

    // 차트 생성
    const priceTrendChart = new Chart(ctx, {
        type: 'line', // 꺾은선형 차트
        data: {
            // X축 데이터 (디자인상 숨길 거지만 데이터 갯수를 맞추기 위해 필요함)
            labels: ['26.06.09', '26.06.23', '현재'], 
            datasets: [{
                label: '가격 추이',
                data: [1690000, 1685000, 1710590], // 그래프를 그릴 임의의 가격 데이터
                borderColor: '#007BFF', // 선 색상 (파란색)
                borderWidth: 2, // 선 굵기
                pointBackgroundColor: '#FFFFFF', // 점 내부 색상 (흰색)
                pointBorderColor: '#007BFF', // 점 테두리 색상
                pointBorderWidth: 2, // 점 테두리 굵기
                pointRadius: 4, // 점 크기
                tension: 0.1 // 선의 둥근 정도 (0은 직선, 숫자가 커질수록 곡선)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // 부모 컨테이너 크기에 맞춤
            plugins: {
                legend: { display: false } // 상단 '가격 추이' 라벨 숨기기
            },
            scales: {
                // X축, Y축 디자인에서 선과 글씨를 모두 숨김 (퍼블리싱 UI를 살리기 위해)
                x: { 
                    display: false 
                },
                y: { 
                    display: false,
                    // 데이터의 최소/최대값보다 약간 여유를 둬서 그래프가 잘리지 않게 함
                    suggestedMin: 1680000, 
                    suggestedMax: 1720000 
                }
            },
            // 마우스 올렸을 때 애니메이션 끄기 (선택 사항)
            hover: { mode: null },
            tooltips: { enabled: false }
        }
    });
// ===== 가격 추이 · AI 분석 아코디언 =====
document.querySelectorAll('.Monthly-Change-Container, .Ai-Trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.Accordion-Item').classList.toggle('is-open');
    });
});

// ===== 기간 탭 (1개월 / 3개월 …) =====
document.querySelectorAll('.Period-Tabs li button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.Period-Tabs li.active')?.classList.remove('active');
        btn.closest('li').classList.add('active');
    });
});

document.querySelectorAll('.custom-select').forEach(select => {
    select.querySelector('.select-trigger').addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 다른 거 닫기
        document.querySelectorAll('.custom-select').forEach(el => {
            if (el !== select) el.classList.remove('is-open');
        });
        
        select.classList.toggle('is-open');
    });
});

// 외부 클릭 시 닫기
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(el => el.classList.remove('is-open'));
});

// ===== Sticky Nav: 스크롤 기반 활성 탭 변경 =====
(function () {
    const nav = document.getElementById('sectionNav');
    if (!nav) return;

    const links = nav.querySelectorAll('a[href^="#section-"]');
    const sections = [];
    links.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) sections.push({ el, link });
    });

    // 네비 클릭 시 부드러운 스크롤
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            const navH = nav.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - navH - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // 스크롤 시 현재 섹션 감지
    function onScroll() {
        const navH = nav.offsetHeight;
        let current = sections[0];
        for (let i = sections.length - 1; i >= 0; i--) {
            const rect = sections[i].el.getBoundingClientRect();
            if (rect.top <= navH + 40) {
                current = sections[i];
                break;
            }
        }
        links.forEach(l => l.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== 상세 정보 더보기 버튼 =====
document.querySelectorAll('.ShowMoreButtonContainer').forEach(btn => {
    btn.addEventListener('click', function () {
        const imgWrap = this.closest('.DetailedInformation')?.querySelector('.img-wrap');
        if (!imgWrap) return;
        const isExpanded = imgWrap.style.maxHeight === 'none';
        imgWrap.style.maxHeight = isExpanded ? '740px' : 'none';
        const gradient = imgWrap.querySelector('.gradientBox');
        if (gradient) gradient.style.display = isExpanded ? '' : 'none';
        this.querySelector('span').textContent = isExpanded ? '상세 정보 펼치기' : '상세 정보 접기';
    });
});

// ===== 뉴스/커뮤니티 탭 =====
document.querySelectorAll('.NewsTabs ul li').forEach(tab => {
    tab.addEventListener('click', function () {
        this.closest('ul').querySelector('.active')?.classList.remove('active');
        this.classList.add('active');
    });
});