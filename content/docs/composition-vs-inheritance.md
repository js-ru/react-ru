---
id: composition-vs-inheritance
title: Композиция в сравнении с наследованием
permalink: docs/composition-vs-inheritance.html
redirect_from: "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

У React мощная модель композиции, и мы рекомендуем использовать композицию вместо наследования для повторного использования кода между компонентами.

В этом разделе мы рассмотрим несколько проблем, которые новые разработчики в React, решают с помощью наследования, и покажем, как мы можем решить их с использованием композиции.

## Меры предосторожности

Некоторые компоненты не знают заранее о своих дочерних элементах. Это особенно характерно для таких компонентов, как `Sidebar` или `Dialog`, которые представляют собой общие «ящики» (либо контейнеры).

Мы рекомендуем для таких компонентов использовать специальное свойство `children` для передачи дочерних элементов непосредственно в их вывод:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Это позволяет другим компонентам передавать им произвольные дочерние элементы, путём вложения в JSX:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Добро пожаловать!
      </h1>
      <p className="Dialog-message">
        Спасибо, что посетили наш космический корабль!
      </p>
    </FancyBorder>
  );
}
```

**[Попробовать на CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

Все, что находится внутри JSX-тега `<FancyBorder>`, передаётся в компонент `FancyBorder` в виде свойства `children`. Поскольку `FancyBorder` отрисовывает `{props.children}` внутри `<div>`, все переданные элементы отображаются в окончательном выводе.

Хотя это менее распространено, иногда вам может понадобиться несколько «каналов вставки» в компоненте. В таких случаях вы можете придумать собственное соглашение вместо использования `children`:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

React-элементы, такие как `<Contacts />` и `<Chat />`, — это просто объекты, поэтому вы можете передавать их как свойства, как любые другие данные. Этот подход может напомнить вам о «слотах» в других библиотеках (например, во Vue.js — прим. пер.), но нет никаких ограничений на то, что вы можете передавать в качестве свойства в React.

## Специализация

Иногда мы рассматриваем компоненты как «частные случаи» других компонентов. Например, мы можем полагать, что `WelcomeDialog` является частным случаем `Dialog`.

В React это также достигается путём композиции, где более «конкретный» компонент отрисовывает более «общий» и настраивает его с помощью свойств:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Добро пожаловать"
      message="Спасибо, что посетили наш космический корабль!" />
  );
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Композиция работает одинаково хорошо для компонентов, определённых в виде классов:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Программа исследования Марса"
              message="Как мы должны обращаться к вам?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Зарегистрируй меня!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Добро пожаловать на борт, ${this.state.login}!`);
  }
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## А что насчёт наследования?

В Facebook мы используем React в тысячах компонентов, и мы не обнаружили каких-либо случаев использования, где мы бы порекомендовали создавать иерархии наследования компонентов.

Свойства и композиция дают вам всю гибкость, необходимую вам для установки пользовательского внешнего вида и поведения компонента явным и безопасным образом. Помните, что компоненты могут принимать произвольные типы свойств, включая примитивные значения, React-элементы или функции.

Если вы хотите повторно использовать функциональность, отличную от пользовательского интерфейса, между компонентами, мы предлагаем извлечь её в отдельный модуль JavaScript. Компоненты могут импортировать его и использовать эту функцию, объект или класс, без расширения (наследования).
