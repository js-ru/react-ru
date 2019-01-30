---
id: conditional-rendering
title: Отрисовка по условию
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

В React вы можете создавать отдельные компоненты, которые инкапсулируют нужное вам поведение. Затем вы можете отрисовать только некоторые из них, в зависимости от состояния вашего приложения.

Условная отрисовка в React работает так же, как условия работы в JavaScript. Используйте JavaScript-операторы, например [`if`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else) или [тернарный оператор](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), чтобы создать элементы, представляющие текущее состояние, и пусть React обновит пользовательский интерфейс для соответствия им.

Рассмотрим эти два компонента:

```js
function UserGreeting(props) {
  return <h1>С возвращением!</h1>;
}

function GuestGreeting(props) {
  return <h1>Пожалуйста, зарегистрируйтесь.</h1>;
}
```

Мы создадим компонент `Greeting`, который отрисовывает любой из этих компонентов в зависимости от того, вошел ли пользователь в систему:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Попробуйте изменить на isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Этот пример отрисовывает другое приветствие в зависимости от значения свойства `isLoggedIn`.

### Переменные элементы

Вы можете использовать переменные для хранения элементов. Это может помочь вам по условию отрисовать часть компонента, в то время как остальная часть вывода не изменится.

Рассмотрим эти два новых компонента, представляющих кнопки для выхода и авторизации:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Авторизация
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Выход
    </button>
  );
}
```

В приведённом ниже примере мы создадим [компонент с состоянием](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) с именем `LoginControl`.

Он будет отрисовывать либо `<LoginButton />` или `<LogoutButton />` в зависимости от текущего состояния. Он также отрисует `<Greeting />` из предыдущего примера:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Хотя объявление переменной и использование оператора `if` — прекрасный способ по условию отрисовать компонент, иногда возможно вы захотите использовать более короткий синтаксис. В JSX существует несколько способов встроенных условий, описанных ниже.

### Встроенный оператор if с логическим оператором &&

Вы можете вставлять любые выражения в JSX, обертывая их фигурными фигурными скобками. Это включает в себя логический JavaScript-оператор `&&`. Это может быть удобно для условного включения элемента:

Вы можете [вставлять любые выражения в JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx), обёртывания их фигурными скобками. Это включает логический JavaScript-оператор `&&`. Это может быть удобно для условной отрисовки элемента:

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Привет!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          У вас {unreadMessages.length} непрочитанных сообщений.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Это работает, потому что в JavaScript `true && expression` всегда вычисляется в `expression`, а `false && expression` всегда вычисляется в `false`.

Поэтому, если условие равно `true`, элемент справа после `&&` появится в выводе. Если оно `false`, React игнорирует и пропускает его.

### Встроенный оператор if-else с тернарным оператором

Другой метод встроенной условной отрисовки элементов — использование условного оператора в JavaScript [`условие ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

В приведённом ниже примере мы используем его для условной отрисовки небольшого блока текста.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      Пользователь <b>{isLoggedIn ? 'в данный момент' : 'не'}</b> авторизован.
    </div>
  );
}
```

Он также может использоваться для больших выражений, хотя из-за этого менее очевидно, что происходит:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

Как и в JavaScript, вы можете выбрать подходящий стиль, основанный на том, что вы и ваша команда считаете более читабельным. Также помните, что всякий раз, когда условия становятся слишком сложными, возможно, самое время [извлечь компонент](/docs/components-and-props.html#extracting-components).

### Предотвращение отрисовки компонента

В редких случаях, возможно, вам потребуется скрыть компонент, даже если он был отрисован другим компонентом. Для этого возвращаем `null` вместо вывода отрисовки.

В приведённом ниже примере `<WarningBanner />` отрисовывается в зависимости от значения свойства с названием `warn`. Если значение этого свойства равно `false`, то компонент не отрисовывается:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Предупреждение!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Скрыть' : 'Показать'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Возврат `null` из метода компонента `render` не влияет на запуск методов жизненного цикла компонента. Например, `componentDidUpdate` по-прежнему будет вызываться.
