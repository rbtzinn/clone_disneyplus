document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('[data-tab-button]');
    const questions = document.querySelectorAll('[data-faq-question]');
    const heroSection = document.querySelector('.hero');
    const alturaHero = heroSection.clientHeight;
    const header = document.querySelector('.header');

    // Função para verificar o scroll e ocultar/exibir o header
    function verificaScroll() {
        const posicaoAtual = window.scrollY;

        if (posicaoAtual > alturaHero) {
            header.classList.remove('header--is-hidden'); // Exibe o header
        } else {
            header.classList.add('header--is-hidden'); // Oculta o header
        }
    }

    // Debounce para melhorar o desempenho no mobile
    let esperando = false;
    window.addEventListener('scroll', function () {
        if (!esperando) {
            window.requestAnimationFrame(function () {
                verificaScroll();
                esperando = false;
            });
            esperando = true;
        }
    });

    // Seção de atrações, programação das abas
    buttons.forEach((button) => {
        button.addEventListener('click', function (botao) {
            const abaAlvo = botao.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`);
            escondeTodasAbas();
            aba.classList.add('shows__list--is--active');
            removeBotaoAtivo();
            botao.target.classList.add('shows__tabs__button--is--active');
        });
    });

    // Seção FAQ, accordion
    questions.forEach((question) => {
        question.addEventListener('click', abreOuFechaResposta);
    });

    // Função para abrir ou fechar a resposta no FAQ
    function abreOuFechaResposta(elemento) {
        const classe = 'faq-div__questions--is-open';
        const elementoPai = elemento.target.parentNode;
        elementoPai.classList.toggle(classe);
    }

    // Função para remover a classe ativa dos botões
    function removeBotaoAtivo() {
        buttons.forEach((button) => {
            button.classList.remove('shows__tabs__button--is--active');
        });
    }

    // Função para esconder todas as abas
    function escondeTodasAbas() {
        const tabsContainer = document.querySelectorAll('[data-tab-id]');
        tabsContainer.forEach((tab) => {
            tab.classList.remove('shows__list--is--active');
        });
    }
});