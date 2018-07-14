---
id: handling-events
title: Обработка событий
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

Обработка событий React-элементов очень похожа на обработку событий на элементах DOM. Существуют синтаксические различия:

* События React именуются в стиле camelCase, а не в нижнем регистре.
* С JSX вы передаёте функцию как обработчик события вместо строки.

Например, HTML:

```html
<button onclick="activateLasers()">
  Активировать лазеры
</button>
```

немного отличается по сравнению с React:

```js{1}
<button onClick={activateLasers}>
  Активировать лазеры
</button>
```

Другое отличие состоит в том, что вы не можете вернуть `false` для предотвращения поведения по умолчанию в React. Вы должны явно вызывать `preventDefault`. Например, с помощью обычного HTML, чтобы предотвратить поведение ссылки по умолчанию, которое состоит в открытии новой страницы, вы можете написать:

```html
<a href="#" onclick="console.log('Была нажата ссылка.'); return false">
  Нажми на меня
</a>
```

В React это могло бы быть так:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('Была нажата ссылка.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Нажми на меня
    </a>
  );
}
```

Здесь `e` — синтетическое событие. React определяет эти синтетические события в соответствии со [спецификацией W3C](https://www.w3.org/TR/DOM-Level-3-Events/), поэтому вам не нужно беспокоиться о совместимости между браузерами. Посмотрите справочное руководство [`SyntheticEvent`](/docs/events.html) для получения дополнительной информации.

При использовании React вам обычно не нужно вызывать `addEventListener`, чтобы добавить обработчиков событий в элемент DOM после его создания. Вместо этого просто предоставьте обработчик, когда элемент изначально отрисовывается.

Когда вы определяете компонент, используя [класс ES6](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes), распространённой практикой является объявлять обработчик события как метод класса. Например, данный компонент `Toggle` отображает кнопку, которая позволяет пользователю переключаться между состояниями «ON» и «OFF»:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    
    // Это привязывание необходимо, чтобы работал объект `this` в колбэке    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Нужно быть аккуратным со значением `this` в колбэках JSX. В JavaScript методы класса не [привязаны](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_objects/Function/bind) по умолчанию. Если вы забудете привязать `this.handleClick` и передать его в атрибут `onClick`, `this` будет` undefined` при фактическом вызове функции.

Это не связано с конкретным поведением React; это часть того, [как работают функции в JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Как правило, если вы ссылаетесь на метод без `()` после него, например `onClick = {this.handleClick}`, вам нужно привязать этот метод.

Если вызов `bind` раздражает вас, есть два способа обойти это. Если вы используете экспериментальный [синтаксис полей общедоступных классов] (https://babeljs.io/docs/plugins/transform-class-properties/), вы можете использовать поля классов для правильной привязки колбэков:

```js{2-6}
class LoggingButton extends React.Component {
  // Данный синтаксис гарантирует, что `this` привязан внутри handleClick.
  // Предупреждение: это *экспериментальный* синтаксис.
  handleClick = () => {
    console.log('this это:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Нажми на меня
      </button>
    );
  }
}
```

Этот синтаксис включён по умолчанию в [Create React App](https://github.com/facebookincubator/create-react-app).

Если вы не используете синтаксис полей, то вместо него можно воспользоваться [стрелочной функцией](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions) в колбэке:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this это:', this);
  }

  render() {
    // Данный синтаксис гарантирует, что `this` привязан внутри handleClick.
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Нажми на меня
      </button>
    );
  }
}
```

Проблема с этим синтаксисом заключается в том, что при каждой отрисовке `LoggingButton` создаётся новый колбэк. В большинстве случаев это не создае проблем. Однако, если этот колбэк передаётся в качестве свойства нижестоящим компонентам, то эти компоненты могут выполнять дополнительную повторную отрисовку. Как правило, мы рекомендуем привязывать обработчики в конструкторе или использовать синтаксис полей классов, чтобы избежать такого рода проблем с производительностью.

## Передача аргментов в обработчики событий

Внутри цикла обычно требуется передать дополнительный параметр обработчику событий. Например, если `id` — это идентификатор строки, рабочим будет один из следующих вариантов:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Удалить строку</button>
<button onClick={this.deleteRow.bind(this, id)}>Удалить строку</button>
```

Вышеуказанные две строки эквикаленты и используют [стрелочные функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions) и [`Function.prototype.bind`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_objects/Function/bind) соответственно.

В обоих случаях аргумент `e`, представляющий событие React, будет передан как второй аргумент после ID. При использовании стрелочной функции нужно передавать её явно, но с помощью `bind` любые дополнительные аргументы передаются в функцию автоматически.
