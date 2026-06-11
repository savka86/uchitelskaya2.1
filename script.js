const menuBtn = document.querySelector('#menuBtn');
const searchInput = document.querySelector('#boardSearch');
const clearSearch = document.querySelector('#clearSearch');
const cards = Array.from(document.querySelectorAll('.card'));
const infoBox = document.querySelector('#infoBox');
const diagnosticBtn = document.querySelector('#diagnosticBtn');
const quizModal = document.querySelector('#quizModal');
const quizForm = document.querySelector('#quizForm');
const quizSelect = document.querySelector('#quizSelect');
const quizResult = document.querySelector('#quizResult');

const recommendations = {
  design: 'Лучший маршрут: дизайнер образовательных продуктов → шаблон презентации → стенд как у профи.',
  ai: 'Лучший маршрут: интегратор ИИ → 10 промптов для учителя → ИИ-помощник класса.',
  olymp: 'Лучший маршрут: наставник одарённых → чек-лист для НПК → олимпиадный разбор.',
  research: 'Лучший маршрут: методист проектов → как написать цель и задачи → проект под ключ.',
  producer: 'Лучший маршрут: учитель-продюсер → сценарий события → ученик — продюсер фестиваля.',
  team: 'Лучший маршрут: фасилитатор → распределение ролей → командная работа без хаоса.'
};

function showInfo(title, text, icon = '💡') {
  infoBox.innerHTML = `
    <span class="info-box__icon">${icon}</span>
    <div>
      <h2>${title}</h2>
      <p>${text}</p>
    </div>
  `;
}

function setActiveCard(card) {
  cards.forEach(item => item.classList.remove('is-active'));
  card.classList.add('is-active');
}

cards.forEach(card => {
  card.addEventListener('click', event => {
    if (card.tagName === 'A') {
      event.preventDefault();
    }

    const title = card.innerText.trim();
    const icon = card.querySelector('.card__icon')?.textContent || '💡';
    const text = card.dataset.info || 'Описание карточки можно добавить в HTML через атрибут data-info.';

    setActiveCard(card);
    showInfo(title, text, icon);

    const role = card.dataset.role;
    if (role && recommendations[role]) {
      showInfo(title, recommendations[role], icon);
      highlightByRole(role);
    }
  });
});

function highlightByRole(role) {
  cards.forEach(card => {
    if (card.dataset.tags === role || card.dataset.role === role) {
      card.classList.add('is-active');
    }
  });
}

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.classList.toggle('is-hidden', query && !text.includes(query));
  });
});

clearSearch?.addEventListener('click', () => {
  searchInput.value = '';
  cards.forEach(card => card.classList.remove('is-hidden'));
  searchInput.focus();
});

menuBtn?.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

diagnosticBtn?.addEventListener('click', () => {
  if (typeof quizModal.showModal === 'function') {
    quizModal.showModal();
  } else {
    quizModal.setAttribute('open', '');
  }
});

quizForm?.addEventListener('submit', event => {
  event.preventDefault();
  const value = quizSelect.value;
  quizResult.textContent = value ? recommendations[value] : 'Сначала выберите задачу.';
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.body.classList.remove('nav-open');
  }
});
