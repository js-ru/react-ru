---
id: state-and-lifecycle
title: Состояние и жизненный цикл
permalink: docs/state-and-lifecycle.html
redirect_from: "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

На этой странице представлена концепция состояния и жизненного цикла в компоненте React. [Здесь](/docs/react-component.html) вы можете найти подробный справочник API компонента.

Рассмотрим пример тикающих часов из [одного из предыдущих разделов](/docs/rendering-elements.html#updating-the-rendered-element). В разделе [Отрисовка элементов](/docs/rendering-elements.html#rendering-an-element-into-the-dom) мы изучили только один способ обновления пользовательского интерфейса (UI). Мы вызываем `ReactDOM.render()` для изменения отрисованного вывода:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/gwoJZk?editors=0010)

В этом разделе мы узнаем, как сделать компонент `Clock` действительно повторно используемым и инкапсулированным. Его можно будет настроить и он будет обновлять самого себя каждую секунду.

Мы можем начать с инкапсуляции кода в функциональный компонент часов:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Тем не менее, следующий код упускает ключевое требование: то, что `Clock` — настраиваемый таймер, который обновляет свой интерфейс каждую секунду, должно быть деталью реализации `Clock`.

В идеале мы хотим написать это один раз и иметь само обновление `Clock`:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Для реализации этого, нам нужно добавить «состояние» к компоненту `Clock`.

Состояние похоже на свойство, но оно является закрытым и полностью контролируется компонентом.

Мы [упоминали ранее](/docs/components-and-props.html#functional-and-class-components), что компоненты, определённые как классы, имеют некоторые дополнительные возможности. Локальное состояние — это как раз одно из них: эта возможность доступна только классам.

## Преобразование функции в класс

Преобразовать функциональный компонент, такой как `Clock`, в классовый компонент можно за пять шагов:

1. Создать [ES6-класс](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes) с тем же самым именем, который расширяет `React.Component`.

2. Добавить к нему пустой метод `render()`.

3. Перенести тело функции в метод `render()`.

4. Заменить `props` на `this.props` в теле `render()`.

5. Удалить оставшиеся пустое объявление функции.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` теперь определён как класс, а не функция.

Метод `render` будет вызываться каждый раз, когда происходит обновление, но пока мы отрисовываем `<Clock />` в один и тот же DOM-узел, только один экземпляр класса `Clock` будет использоваться. Это позволяет использовать дополнительные возможности, такие как локальное состояние и хуки жизненного цикла.

## Добавление локального состояния в класс

Мы переместим `date` из свойств в состояние за три шага:

1) Заменить `this.props.date` на `this.state.date` в методе `render()`:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Добавить [конструктор класса](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes#Constructor), который устанавливает начальное состояние в `this.state`:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Обратите внимание, что мы передаём `props` базовому (родительскому) конструктору:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Классовые компоненты всегда должны вызывать базовый конструктор с передачей ему `props`.

3) Удалить свойство `date` из элемента `<Clock />`:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Позже мы добавим код таймера обратно к самому компоненту.

Результат выглядит следующим образом:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Затем мы позволим настроить `Clock` собственным таймером с обновлением каждую секунду.

## Добавление методов жизненного цикла в класс

В приложениях с множеством используемых компонентов очень важно освобождать ресурсы, занятые при их удалении.

Мы хотим [настроить таймер](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) всякий раз, когда `Clock` отрисовывается в DOM в первый раз. Это называется «монтированием» (установкой) в React.

Мы также хотим [сбрасывать этот таймер](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) всякий раз, когда DOM, созданный `Clock`, удаляется. Это называется «размонтированием» в React.

Мы можем объявить специальные методы в классе-компоненте для выполнения кода, когда компонент устанавливается и удаляется:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Эти методы называются "хуками (методами) жизненного цикла".

Хук `componentDidMount()` запускается после того, как вывод компонента отрисован в DOM. Это хорошее место для установки таймера:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Обратите внимание, что мы сохраняем идентификатор таймера в `this`.

Хотя `this.props` настраивается самим React, и у `this.state` есть специальное значение, вы можете добавлять дополнительные поля в класс вручную, если вам нужно сохранить что-то, что не участвует в при выводе данных (например, идентификатор таймера).

Мы удалим таймер в хуке жизненного цикла `componentWillUnmount()`:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Наконец, реализуем метод `tick()`, который компонент `Clock` будет запускать каждую секунду.

Он будет использовать `this.setState()` для планирования обновлений локального состояния компонента:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/amqdNA?editors=0010)

Теперь часы тикают каждую секунду.

Давайте быстро повторим, что происходит, а также перечислим порядок, в котором вызываются методы:

1) Когда `<Clock />` передаётся `ReactDOM.render()`, React вызывает конструктор компонента `Clock`. Так как `Clock` должен отображать текущее время, он инициализирует `this.state` с объектом, включающим текущее время. Позднее мы обновим это состояние.

2) Затем React вызывает метод `render()` компонента `Clock`. Вот как React узнаёт, что должно отображаться на экране. Потом React обновляет DOM, чтобы он соответствовал выводу отрисовки `Clock`.

3) Когда в DOM вставлен вывод `Clock`, React вызывает хук жизненного цикла `componentDidMount()`. Внутри него компонент `Clock` указывает браузеру настроить таймер для вызова метода `tick()` компонента один раз в секунду.

4) Каждую секунду браузер вызывает метод `tick()`. Внутри него компонент `Clock` планирует обновление пользовательского интерфейса, вызывая `setState()` с объектом, содержащим текущее время. Благодаря вызову `setState()` React знает, что состояние изменилось, и снова вызывает метод `render()`, чтобы узнать, что должно отображаться на экране. На этот раз `this.state.date` в методе `render()` будет другим, и поэтому вывод отрисованного компонента будет включать обновлённое время. React обновляет DOM соответствующим образом.

5) Если компонент `Clock` когда-либо удаляется из DOM, React вызывает хук жизненного цикла `componentWillUnmount()`, чтобы оставить таймер.

## Правильное использование состояния

Есть три детали о `setState()`, про которые нужно знать.

### Не изменяйте напрямую состояние

Например, это не приведёт к повторной отрисовке компонента:

```js
// Неправильно
this.state.comment = 'Привет';
```

Вместо этого используйте `setState()`:

```js
// Правильно
this.setState({comment: 'Привет'});
```

Конструктор — единственное место, где вы можете присвоить что-либо `this.state`.

### Обновления состояния могут быть асинхронными

React может выполнять несколько вызовов `setState()` за одно обновление для лучшей производительности.

Поскольку `this.props` и `this.state` могут обновляться асинхронно, вы не должны полагаться на их значения для вычисления следующего состояния.

Например, этот код может не обновить счётчик:

```js
// Неправильно
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Чтобы исправить это, используйте второй вариант вызова `setState()`, который принимает функцию, а не объект. Эта функция получит предыдущее состояние в качестве первого аргумента и свойства во время обновления в качестве второго аргумента:

```js
// Правильно
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

Мы использовали [стрелочную функцию](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions) выше, но это также работает с обычными функциями:

```js
// Правильно
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

### Обновления состояния объединяются

Когда вы вызываете `setState()`, React объединяет объект, который вы предоставляете c текущим состоянием.

Например, ваше состояние может содержать несколько независимых переменных:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Затем вы можете самостоятельно их обновлять с помощью отдельных вызовов `setState()`:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Слияние происходит поверхностное, поэтому вызов `this.setState({comments})` оставляет `this.state.posts` нетронутым, но полностью заменяет `this.state.comments`.

## Однонаправленный поток данных

Ни родительский, ни дочерний компоненты не могут знать, является ли какой-либо компонент с состоянием или без него, и им не важно, определен ли он как функция или класс.

Вот почему состояние часто называют локальным или инкапсулированным. Оно недоступно для любого компонента, за исключением того, который владеет и устанавливает его.

Компонент может передать своё состояние вниз по дереву компонентов в виде свойства его дочерних компонентов:

```js
<h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
```

Это также работает для пользовательских компонентов:

```js
<FormattedDate date={this.state.date} />
```

Компонент `FormattedDate` получил бы `date` в своих свойствах и не знал бы, пришло ли оно из состояния `Clock`, из свойств `Clock` или было передано напрямую:

```js
function FormattedDate(props) {
  return <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Это обычно называют потоком данных «сверху вниз» или «однонаправленным потоком данных». Любое состояние всегда принадлежит определённому компоненту, а любые данные или пользовательский интерфейс, полученные из этого состояния, могут влиять только на компоненты, находящиеся «ниже» в их дереве компонентов.

Если вы представляете дерево компонентов как водопад свойств, состояние каждого компонента похоже на дополнительный источник воды, который соединяется с водопадом в произвольной точке, но также течёт вниз.

Чтобы показать, что все компоненты действительно изолированы, мы можем создать компонент `App`, который отрисовывает три компонента `<Clock>`:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](http://codepen.io/gaearon/pen/vXdGmd?editors=0010)

У каждого компонента `Clock` есть собственное состояние таймера, которое обновляется независимо от других компонентов .

В React-приложениях, независимо от того, является ли компонент, имеющим состояние или нет, — это рассматривается как деталь реализации компонента, которая может измениться со временем. Вы можете использовать компоненты без состояния в компонентах с состоянием, и наоборот.