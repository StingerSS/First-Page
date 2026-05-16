document.addEventListener("DOMContentLoaded", () => {
    // 1. ПЛАВНЫЙ ВХОД ВСЕЙ СТРАНИЦЫ ПРИ ЗАГРУЗКЕ
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧКИ РЕГИСТРАЦИИ
    const card = document.querySelector('.regCard');
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const statusMsg = document.getElementById('statusMsg');
    const inputs = document.querySelectorAll('.inp');

    requestAnimationFrame(() => {
        if (card) card.classList.add('visible');
    });

    // 3. ПАДАЮЩИЕ ЛИСТЬЯ
    function createLeaf() {
        const container = document.getElementById('leaf-container');
        if (!container) return;
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        const size = Math.random() * 12 + 6 + 'px';
        leaf.style.width = size;
        leaf.style.height = size;
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 3 + 4 + 's';
        leaf.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(leaf);
        setTimeout(() => leaf.remove(), 7000);
    }

    if (document.getElementById('leaf-container')) {
        setInterval(createLeaf, 450);
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            if (statusMsg) statusMsg.textContent = "";
        });
    });

    // 4. ОБРАБОТКА НАЖАТИЯ НА КНОПКУ (КРУЖОЧЕК И ПЕРЕХОД)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let hasError = false;

            if (email && !isValidEmail(email.value)) { email.classList.add('error'); hasError = true; }
            if (password && password.value.length < 1) { password.classList.add('error'); hasError = true; }

            if (hasError) {
                if (statusMsg) {
                    statusMsg.style.color = "#ff4d4d";
                    statusMsg.textContent = "Please check the fields.";
                }
                return;
            }

            if (loginBtn) {
                // АКТИВАЦИЯ КРУЖОЧКА: добавляем класс loading к кнопке
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;

                // Кружочек крутится ровно 2 секунды
                setTimeout(() => {
                    if (statusMsg) {
                        statusMsg.style.color = "#ffffff";
                        statusMsg.textContent = "Success! Welcome back.";
                    }
                    
                    // Выключаем крутящийся спиннер на кнопке
                    loginBtn.classList.remove('loading');
                    loginBtn.disabled = false;

                    // Запускаем плавное исчезновение всей карточки перед уходом
                    if (card) {
                        card.classList.remove('visible');
                        card.style.opacity = "0";
                        card.style.transform = "translateY(30px)";
                        card.style.transition = "0.4s ease-in";
                    }

                    // Переходим на main_page.html строго после исчезновения карточки (400мс)
                    setTimeout(() => {
                        window.location.href = "main_page.html"; 
                    }, 400);

                }, 2000); 
            }
        });
    }

    // 5. КЛИК ПО ССЫЛКЕ "ВОЙТИ" С ЭФФЕКТОМ УХОДА КАРТОЧКИ
    document.querySelectorAll('.report a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            if (card) {
                card.classList.remove('visible');
                card.style.opacity = "0";
                card.style.transform = "translateY(30px)";
                card.style.transition = "0.4s ease-in";
            }

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        });
    });
});
