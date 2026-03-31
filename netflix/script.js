// Script para alternar entre dark e light mode
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    console.log('Elements found:', themeToggle, themeIcon, body);

    // Verificar se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    }

    // Função para alternar o tema
    function toggleTheme() {
        console.log('Toggle theme clicked');
        body.classList.toggle('light-mode');

        // Verificar se está no modo light
        const isLightMode = body.classList.contains('light-mode');
        console.log('Is light mode:', isLightMode);

        // Atualizar o ícone
        themeIcon.textContent = isLightMode ? '☀️' : '🌙';

        // Salvar a preferência no localStorage
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

        // Animação do ícone
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
    }

    // Adicionar evento de clique ao botão
    themeToggle.addEventListener('click', toggleTheme);

    // Adicionar suporte ao teclado (Enter e Space)
    themeToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleTheme();
        }
    });

    // Salvar perfil ativo no localStorage ao clicar em qualquer perfil
    const profileLinks = document.querySelectorAll('.profiles li.profile a');
    profileLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const profileItem = link.closest('li.profile');
            if (!profileItem) return;

            const profileName = profileItem.querySelector('p')?.textContent?.trim() || '';
            let profileImg = profileItem.querySelector('img')?.getAttribute('src') || '';

            // Normaliza para caminho relativo sem barra inicial para evitar path absolute problemáticos em file://
            profileImg = profileImg.replace(/^\/+/, '');

            localStorage.setItem('activeProfileName', profileName);
            localStorage.setItem('activeProfileImg', profileImg);
        });
    });
});