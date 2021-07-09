//https://codepen.io/Quper/pen/zYGxbJm

const arr = ['год', 'года', 'лет'];

{
  // 1 пример склонение слова
  const onlyWord = document.querySelectorAll('.only_word');

  // возвращает только слово
  const declOfNum = (n, titles) => {
    return titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
    ];
  };

  onlyWord[0].textContent = declOfNum(1, arr);
  onlyWord[1].textContent = declOfNum(33, arr);
  onlyWord[2].textContent = declOfNum(49, arr);
}

{
  // 2 пример склонение слова + число
  const numAndWord = document.querySelectorAll('.num_and_word');

  // возвращает число и слово
  const declOfNum = (n, titles) => {
    return (
      n +
      ' ' +
      titles[
        n % 10 === 1 && n % 100 !== 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
      ]
    );
  };

  numAndWord[0].textContent = declOfNum(49, ['год', 'года', 'лет']);
  numAndWord[1].textContent = declOfNum(53, ['год', 'года', 'лет']);
  numAndWord[2].textContent = declOfNum(71, ['год', 'года', 'лет']);
}

{
  // 3 пример возвращает число и слово в родительном падеже если передать true
  const numAndWordFrom = document.querySelectorAll('.num_and_word-from');

  const declOfNum = (n, titles, from) => {
    return (
      n +
      ' ' +
      titles[
        from
          ? n % 10 === 1 && n % 100 !== 11
            ? 1
            : 2
          : n % 10 === 1 && n % 100 !== 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
      ]
    );
  };

  numAndWordFrom[0].textContent =
    'От ' + declOfNum(49, ['год', 'года', 'лет'], true);
  numAndWordFrom[1].textContent =
    'От ' + declOfNum(53, ['год', 'года', 'лет'], true);
  numAndWordFrom[2].textContent =
    'От ' + declOfNum(71, ['год', 'года', 'лет'], true);
}
