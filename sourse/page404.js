document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const backBtn = document.getElementById('backBtn');
    const container = document.getElementById('errorContainer');

    // 1. Анимация плавного входа страницы при загрузке
    requestAnimationFrame(() => {
        body.classList.add('page-loaded');
    });

    // 2. Плавный выход карточки при клике на кнопку возврата
    if (backBtn && container) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            // Запускаем анимацию ухода карточки вниз
            container.style.opacity = "0";
            container.style.transform = "translateY(30px)";
            container.style.transition = "all 0.4s ease-in";

            // Выполняем переход на main_page.html ровно через 400мс
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        });
    }
});
