---
id: introducing-jsx
title: Введение в JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Рассмотрим это объявление переменной:

```js
const element = <h1>Привет, мир!</h1>;
```

Синтаксис этого странного тега не является ни строкой, ни HTML.

Он называется JSX, и это расширение синтаксиса JavaScript. Мы рекомендуем использовать его с React для описания того, как должен выглядеть пользовательский интерфейс. JSX может напомнить вам о языке шаблонов, но со всей полной мощью JavaScript.

JSX создаёт «элементы» React. Мы рассмотрим их отрисовку в DOM в [следующем разделе](/docs/rendering-elements.html). Ниже вы можете найти основы JSX, необходимые для начала работы.

### Почему JSX?

React принимает тот факт, что логика отрисовки по сути связана с другой логикой пользовательского интерфейса: как обрабатываются события, как изменяется состояние со временем и как данные подготовлены для отображения.

Вместо искусственного разделения *технологий*, помещая разметку и логику в отдельные файлы, React [разделяет *ответственности*] (https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8) с слабо связанными модулями, называемыми «компонентами», которые содержат вместе разметку и логику. Мы вернёмся к компонентам в [следующем разделе](/docs/components-and-props.html), но если вы ещё не очень хорошо умеет размещать разметку в JS, [этот доклад](https://www.youtube.com/watch?v=x7cQ3mrcKaY) может убедить вас в другом.

React [не требует](/docs/response-without-jsx.html) использование JSX, но большинство людей находят его полезным в качестве визуальной демонстрации при работе с пользовательским интерфейсом внутри кода JavaScript. Он также позволяет React показывать более полезные сообщения об ошибках и предупреждения.

Теперь, когда с этим разобрались, давайте начнём!

### Встраивание выражений в JSX

В приведённом ниже примере мы объявляем переменную с именем `name`, а затем используем ее внутри JSX, обернув ее в фигурные скобки:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Привет, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

В фигурных скобках JSX вы можете поместить любое корректное [выражение JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions). Например, `2 + 2`, `user.firstName`, или `formatName(user)` — всё это допустимые выражения в JavaScript.

В приведённом ниже примере мы вставляем результат вызова функции JavaScript, `formatName(user)`, в элемент `<h1>`.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

Мы разделяем JSX на несколько строк для удобства чтения. Хотя это не требуется, при этом мы также рекомендуем обёртывать его в круглых скобках, чтобы избежать ошибок, связанных с [автоматической вставкой точки с запятой](http://stackoverflow.com/q/2846283).

### JSX — это выражение тоже

После компиляции выражения JSX становятся обычными вызовами функций JavaScript и вычисляются в объекты JavaScript.

Это означает, что вы можете использовать JSX внутри операторов `if` и` for`, присваивать его переменным, принимать его в качесиве аргументов и возвращать из функций:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Привет, {formatName(user)}!</h1>;
  }
  return <h1>Привет, незнакомец.</h1>;
}
```

### Установка атрибутов с помощью JSX

Вы можете использовать кавычки для указания строковых литералов в качестве атрибутов:

```js
const element = <div tabIndex="0"></div>;
```

Вы также можете использовать фигурные скобки для вставки JavaScript-выражения в атрибут:

```js
const element = <img src={user.avatarUrl}></img>;
```

Не используйте кавычки вокруг фигурных скобок при вставке выражения JavaScript в атрибут. Нужно использовать либо кавычки (для строковых значений), либо фигурные скобки (для выражений), но не оба в одном и том же атрибуте.

> ** Внимание: **
>
> Поскольку JSX ближе к JavaScript, чем к HTML, React DOM использует соглашение об именах свойств `camelCase` вместо имён атрибутов HTML.
>
> Например, `class` становится [`className`](https://developer.mozilla.org/ru/docs/Web/API/Element/className) в JSX, а `tabindex` становится [`tabIndex`] (https://developer.mozilla.org/ru/docs/Web/API/HTMLElement/tabIndex).

### Установка детей с помощью JSX

Если тег пуст, вы можете немедленно его закрыть с помощью `/>`, точно так же, как в XML:

```js
const element = <img src={user.avatarUrl} />;
```

Теги JSX могут содержать дочерние элементы:

```js
const element = (
  <div>
    <h1>Привет!</h1>
    <h2>Рад тебя видеть.</h2>
  </div>
);
```

### JSX предотвращает атаки-инъекции

Безопасно встраивать пользовательские данные в JSX:

```js
const title = response.potentiallyMaliciousInput;
// Это безопасно:
const element = <h1>{title}</h1>;
```

By default, React DOM [escapes](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

По умолчанию DOM React [экранирует](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) любые значения, встроенные в JSX, перед их отрисовкой. Таким образом, гарантируется, что вы никогда не сможете внедрить то, чего явно нет в вашем приложении. Перед отрисовкой все преобразуется в строку. Это помогает предотвратить атаки [межсайтовый скриптинг (cross-site-scripting, XSS)](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3).

### JSX представляет из себя объекты

Babel компилирует JSX в вызовы `React.createElement()`.

Ниже два примера идентичны:

```js
const element = (
  <h1 className="greeting">
    Привет, мир!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Привет, мир!'
);
```

`React.createElement ()` выполняет несколько проверок для помощи вам написать код без ошибок, но по сути он создает такой объект:

```js
// Примечание: эта структура упрощена
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Привет, мир!'
  }
};
```

Эти объекты называются элементами «React-элементами». Можно думать о них как о том, что вы хотите видеть на экране. React считывает эти объекты и использует их для построения DOM и его обновления.

Мы рассмотрим отрисовку элементов React в DOM в следующем разделе.

> ** Совет: **
>
> Мы рекомендуем использовать [определение языка «Babel»](http://babeljs.io/docs/editors) в вашем редакторе, чтобы как код ES6, так и JSX были правильно подсвечены. Этот сайт использует цветовую схему[Oceanic Next] (https://labs.voronianski.com/oceanic-next-color-scheme/), которая совместима с этим определением.
