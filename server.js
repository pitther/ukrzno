'use strict';

let TelegramToken = "";

const TeleBot = require('telebot');
const bot = new TeleBot(TelegramToken);

let app = {
  composition: 'Твір',
  author: 'Автор',
  genre: 'Жанр',
  back: 'Назад',
  menu: 'Меню',
  hide: 'Заховати клавіатуру',
  onhide: 'Клавіатура схована. Напишіть /menu щоб показати.'
};
app.help = '\n\n*' + app.composition + '* - вгадати твір *за автором* \n*' + app.author + '* - вгадати автора *твору* \n*' + app.genre + '* - вгадати жанр *твору*';
app.menu_structure = {
  main: bot.keyboard([
    [app.composition, app.author, app.genre]
  ], {
    resize: true
  })
}

class Author {
  constructor(name, compositions) {
    this.name = name;
    this.compositions = compositions;
  }
}

class Composition {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
}

let authors = [];
/*
,new Composition("","")
authors.push(new Author("", [new Composition("","")] ));
*/
authors.push(new Author("Народ", [new Composition("Ой Морозе, Морозенку", "Історична пісня"), new Composition("Чи не той то хміль", "Історична пісня"), new Composition("Маруся Богуславка", "Дума"), new Composition("Ой летіла стріла", "Балада")]));
authors.push(new Author("Маруся Чурай", [new Composition("Віють вітри", "Пісня"), new Composition("Засвіт встали козаченьки", "Пісня")]));
authors.push(new Author("Анонімний", [new Composition("Слово про похід Ігорів", "Героїчна поема")]));
authors.push(new Author("Нестор Літописець", [new Composition("Повість минулих літ", "Літопис")]));
authors.push(new Author("Г. Сковорода", [new Composition("De libertate", "Ліричний вірш"), new Composition("Всякому місту - звичай і права", "Ліричний вірш"), new Composition("Бджола та Шершень", "Байка")]));
authors.push(new Author("І. Котляревський", [new Composition("Енеїда", "Бурлескно-травестійна поема"), new Composition("Наталка Полтавка", "Соціально-побутова драма")]));
authors.push(new Author("Г. Квітка-Основ'яненко", [new Composition("Маруся", "Соціально-реалістична сентиментальна повість")]));
authors.push(new Author("Т. Шевченко", [new Composition("Катерина", "Поема"), new Composition("Гайдамаки", "Поема"), new Composition("Кавказ", "Поема"), new Composition("Сон", "Поема"), new Composition("І мертвим, і живим..", "Послання"), new Composition("Заповіт", "Вірш")]));
authors.push(new Author("П. Куліш", [new Composition("Чорна рада", "Історичний роман")]));
authors.push(new Author("І. Нечуй-Левицький", [new Composition("Кайдашева сім’я", "Повість")]));
authors.push(new Author("П. Мирний, І. Білик", [new Composition("Хіба ревуть воли, як ясла повні", "Роман")]));
authors.push(new Author("І. Карпенко-Карий", [new Composition("Мартин Боруля", "Комедія")]));
authors.push(new Author("І. Франко", [new Composition("Гімн", "Вірш"), new Composition("Чого являєшся мені у сні", "Вірш"), new Composition("Мойсей", "Поема")]));
authors.push(new Author("М. Коцюбинський", [new Composition("Тіні забутих предків", "Повість"), new Composition("Intermezzo", "Новела")]));
authors.push(new Author("О. Кобилянська", [new Composition("Земля", "Повість")]));
authors.push(new Author("Л. Українка", [new Composition("Contra spem spero!", "Вірш"), new Composition("Лісова пісня", "Драма – феєрія")]));
authors.push(new Author("М. Вороний", [new Composition("Блакитна Панна", "Вірш")]));
authors.push(new Author("О. Олесь", [new Composition("Чари ночі", "Романс"), new Composition("О слово рідне! Орле скутий!..", "Вірш")]));
authors.push(new Author("П. Тичина", [new Composition("О панно Інно", "Вірш"), new Composition("Пам'яті тридцяти", "Вірш"), new Composition("Ви знаєте, як липа шелестить…", "Вірш")]));
authors.push(new Author("М. Рильський", [new Composition("Молюсь і вірю. Вітер грає…", "Вірш")]));
authors.push(new Author("М. Зеров", [new Composition("Київ - традиція", "Вірш")]));
authors.push(new Author("В. Сосюра", [new Composition("Любіть Україну", "Вірш")]));
authors.push(new Author("Б.-І. Антонич", [new Composition("Різдво", "Вірш")]));
authors.push(new Author("М. Хвильовий", [new Composition("Я (Романтика)", "Новела")]));
authors.push(new Author("Ю. Яновський", [new Composition("Дитинство", "Новела")]));
authors.push(new Author("В. Підмогильний", [new Composition("Місто", "Урбаністичний роман")]));
authors.push(new Author("О. Вишня", [new Composition("Моя автобіографія", "Усмішка"), new Composition("Сом", "Усмішка")]));
authors.push(new Author("М. Куліш", [new Composition("Мина Мазайло", "Комедія")]));
authors.push(new Author("О. Довженко", [new Composition("Україна в огні", "Кіноповість"), new Composition("Зачарована Десна", "Кіноповість")]));
authors.push(new Author("А. Малишко", [new Composition("Пісня про рушник", "Пісня")]));
authors.push(new Author("В. Симоненко", [new Composition("Ти знаєш, що ти - людина...", "Вірш"), new Composition("Задивляюсь у твої зіниці...", "Вірш")]));
authors.push(new Author("В. Стус", [new Composition("Як добре те, що смерті не боюсь я", "Вірш"), new Composition("О земле втрачена, явися!..", "Вірш")]));
authors.push(new Author("І. Драч", [new Composition("Балада про соняшник", "Вірш")]));
authors.push(new Author("Є. Маланюк", [new Composition("Стилет чи стилос?", "Вірш")]));
authors.push(new Author("Л. Костенко", [new Composition("Страшні слова, коли вони мовчать", "Вірш"), new Composition("Українське альфреско", "Вірш"), new Composition("Маруся Чурай", "Роман у віршах")]));
authors.push(new Author("О. Гончар", [new Composition("Залізний острів", "Новела")]));
authors.push(new Author("Г. Тютюнник", [new Composition("Три зозулі з поклоном", "Новела")]));
authors.push(new Author("І. Багряний", [new Composition("Тигролови", "Роман")]));

let treshhold = {
  compositions: [],
  authors: [],
  genres: []
};

//["Новела","Оповідання","Повість","Роман","Сонет","Гімн","Послання","Поема","Драма"]

for (let i = 0; i < authors.length; i++) {
  treshhold.authors.push(authors[i].name);
  for (let j = 0; j < authors[i].compositions.length; j++) {
    treshhold.compositions.push(authors[i].compositions[j].name);
    if (!treshhold.genres.includes()) {
      treshhold.genres.push(authors[i].compositions[j].genre);
    }
  }
}

let guessers = new Map();
class Guesser {
  constructor(id, type) {
    this.varcount = 2;
    this.id = id;
    this.type = type;
    this.create_question(type);
  }
  create_question(type) {
    let q;
    if (this.type == app.composition) {
      let v = authors[Math.floor(Math.random() * authors.length)];
      let name = v.name;
      let compos = v.compositions[Math.floor(Math.random() * v.compositions.length)].name;
      this.composition = compos;
      this.name = v.name;
      this.victory = compos;

      let declined = [];
      for (let i = 0; i < v.compositions.length; i++) {
        declined.push(v.compositions[i].name);
      }


      let keybuff = [];
      keybuff.push(this.victory);
      for (let i = 0; i < this.varcount; i++) {
        while (true) {
          let k = treshhold.compositions[Math.floor(Math.random() * treshhold.compositions.length)]
          if (!keybuff.includes(k) && !declined.includes(k)) {
            keybuff.push(k);
            break;
          }
        }
      }
      keybuff = shuffle(keybuff);


      q = '*' + v.name + '* написав(-ла) твір: ';
      var newkeyb = [];
      while (keybuff.length) newkeyb.push(keybuff.splice(0, 3));
      newkeyb.push([app.back]);
      let replyMarkup = bot.keyboard(newkeyb, {
        resize: true
      });
      this.send_question(q, replyMarkup);
    } else if (this.type == app.author) {
      let v = authors[Math.floor(Math.random() * authors.length)];
      let name = v.name;
      let compos = v.compositions[Math.floor(Math.random() * v.compositions.length)].name;
      this.composition = compos;
      this.name = v.name;
      this.victory = v.name;

      let keybuff = [];
      keybuff.push(this.victory);
      for (let i = 0; i < this.varcount; i++) {
        while (true) {
          let k = treshhold.authors[Math.floor(Math.random() * treshhold.authors.length)]
          if (!keybuff.includes(k)) {
            keybuff.push(k);
            break;
          }
        }
      }
      keybuff = shuffle(keybuff);


      q = '*' + this.composition + '* написав(-ла): ';
      var newkeyb = [];
      while (keybuff.length) newkeyb.push(keybuff.splice(0, 3));
      newkeyb.push([app.back]);
      let replyMarkup = bot.keyboard(newkeyb, {
        resize: true
      });
      this.send_question(q, replyMarkup);
    } else if (this.type == app.genre) {
      let v = authors[Math.floor(Math.random() * authors.length)];
      let compos = v.compositions[Math.floor(Math.random() * v.compositions.length)];
      this.composition = compos.name;
      this.genre = compos.genre;
      this.victory = compos.genre;

      let keybuff = [];
      keybuff.push(this.victory);
      for (let i = 0; i < this.varcount; i++) {
        while (true) {
          let k = treshhold.genres[Math.floor(Math.random() * treshhold.genres.length)]
          if (!keybuff.includes(k)) {
            keybuff.push(k);
            break;
          }
        }
      }
      keybuff = shuffle(keybuff);


      q = '*' + this.composition + '* - ';
      var newkeyb = [];
      while (keybuff.length) newkeyb.push(keybuff.splice(0, 3));
      newkeyb.push([app.back]);
      console.log(newkeyb);
      let replyMarkup = bot.keyboard(newkeyb, {
        resize: true
      });
      this.send_question(q, replyMarkup);
    }
  }

  send_question(q, replyMarkup) {
    bot.sendMessage(this.id, q, {
      parseMode: 'markdown',
      replyMarkup
    });
  }

  check(r) {
    if (r == this.victory) {
      if (this.type == app.composition) {
        bot.sendMessage(this.id, '✅Правильно \n*' + this.name + '* написав(-ла) *' + this.composition + '*', {
          parseMode: 'markdown'
        });
      } else if (this.type == app.author) {
        bot.sendMessage(this.id, '✅Правильно \n*' + this.composition + '* написав(-ла) *' + this.name + '*', {
          parseMode: 'markdown'
        });
      } else if (this.type == app.genre) {
        bot.sendMessage(this.id, '✅Правильно \n*' + this.composition + '* - *' + this.genre + '*', {
          parseMode: 'markdown'
        });
      }

      setTimeout(function() {
        this.create_question(this.type);
      }.bind(this), 200);
    } else {
      if (this.type == app.composition) {
        bot.sendMessage(this.id, '❌Неправильно \n*' + this.name + '* написав(-ла) *' + this.composition + '*', {
          parseMode: 'markdown'
        });
      } else if (this.type == app.author) {
        bot.sendMessage(this.id, '❌Неправильно \n*' + this.composition + '* написав(-ла) *' + this.name + '*', {
          parseMode: 'markdown'
        });
      } else if (this.type == app.genre) {
        bot.sendMessage(this.id, '❌Неправильно \n*' + this.composition + '* - *' + this.genre + '*', {
          parseMode: 'markdown'
        });
      }

      setTimeout(function() {
        this.create_question(this.type);
      }.bind(this), 200);
    }
  }
}

bot.on('text', (msg) => {
  if (msg.text == app.composition || msg.text == app.author || msg.text == app.genre) {
    guessers.set(msg.chat.id, new Guesser(msg.chat.id, msg.text));
  } else if (msg.text == app.menu) {
    let replyMarkup = app.menu_structure.main;
    bot.sendMessage(msg.chat.id, 'Привіт, *' + msg.from.first_name + '*!' + app.help, {
      parseMode: 'markdown',
      replyMarkup
    });
  } else if (msg.text == app.hide) {
    bot.sendMessage(msg.chat.id, app.onhide + app.help, {
      parseMode: 'markdown',
      replyMarkup: 'hide'
    });
  } else if (msg.text == app.back) {
    let replyMarkup = app.menu_structure.main;
    guessers.delete(msg.chat.id);
    bot.sendMessage(msg.chat.id, 'Привіт, *' + msg.from.first_name + '*!' + app.help, {
      parseMode: 'markdown',
      replyMarkup
    });
  } else if (guessers.has(msg.chat.id)) {
    guessers.get(msg.chat.id).check(msg.text);
  }
});

bot.on([app.hide, '/hide'], (msg) => {
  guessers.delete(msg.chat.id);
  bot.sendMessage(msg.chat.id, app.onhide + app.help, {
    parseMode: 'markdown',
    replyMarkup: 'hide'
  });
});

bot.on([app.menu, '/start', '/menu'], (msg) => {
  let replyMarkup = app.menu_structure.main;
  guessers.delete(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Привіт, *' + msg.from.first_name + '*!' + app.help, {
    parseMode: 'markdown',
    replyMarkup
  });
});

bot.on([app.back, '/back'], (msg) => {
  let replyMarkup = app.menu_structure.main;
  guessers.delete(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Привіт, *' + msg.from.first_name + '*!' + app.help, {
    parseMode: 'markdown',
    replyMarkup
  });
});

bot.start();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(10)
      .substring(1);
  }
  return s4();
}

function count(array, s_) {
  var count = 0;
  for (var i = 0; i < array.length; ++i) {
    if (array[i] == s_)
      count++;
  }
  return count;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
