---
id: components-and-props
title: Компоненты и свойства
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

Компоненты позволяют разделить пользовательский интерфейс на независимые, повторно используемые части и работать с каждой из частей отдельно. На этой странице представлено введение в идею компонентов. [Здесь](/docs/react-component.html) вы можете найти подробный справочник API по компоненту.

Концептуально компоненты похожи на функции JavaScript. Они принимают произвольные входные данные (называемые «props» или свойствами) и возвращают React-элементы, описывающие, что должно появиться на экране.

## Функциональные и классовые компоненты

Самый простой способ определить компонент — написать JavaScript-функцию:

```js
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}
```

Данная функция — корректный компонент React, потому что он принимает один аргумент-объект «props» (который обозначает свойства) с данными и возвращает элемент React. Такие компоненты мы называем «функциональными», потому что они являются буквально функциями JavaScript.

Вы также можете использовать [класс из ES6](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes) для определения компонента:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

Два вышеуказанных компонента эквивалентны с точки зрения React.

У классов есть дополнительные возможности, которые мы обсудим в [следующих разделах](/docs/state-and-lifecycle.html). До этого момента мы будем использовать функциональные компоненты из-за их краткости.

## Отрисовка компонента

Раньше мы сталкивались только с элементами React, представляющие DOM-теги:

```js
const element = <div />;
```

Однако элементы также могут быть пользовательскими компонентами:

```js
const element = <Welcome name="Сара" />;
```

Когда React видит элемент, представляющий пользовательский компонент, он передаёт JSX-атрибуты этому компоненту в виде единственного объекта. Мы называем этот объект «props».

Например, этот код отображает «Привет, Сара» на странице:

```js{1,5}
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

Давайте посмотрим, что происходит в этом примере:

1. Мы вызываем `ReactDOM.render()` с элементом `<Welcome name="Сара" />`.
2. React вызывает компонент `Welcome` с объектом `{name: 'Sara'}` как `props`.
3. Наш компонент `Welcome` возвращает элемент `<h1>Hello, Sara</h1>` в качестве результата.
4. React DOM эффективно обновляет DOM, чтобы соответствовать `<h1>Hello, Sara</h1>`.

> **Примечание:** Всегда именуйте компоненты с заглавной буквы.
>
> React обрабатывает компоненты, начинающиеся со строчных букв, как DOM-теги. Например, `<div />` представляет HTML-тег div, но `<Welcome />` представляет компонент и требует, чтобы `Welcome` был в области видимости.
>
> Вы можете больше узнать о причинах, лежащих в основе этого соглашения [здесь](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Композиция компонентов

Компоненты могут ссылаться на другие компоненты в своём выводе. Это позволяет использовать одну и ту же абстракцию компонента для любого уровня детализации. Кнопка, форма, диалоговое окно, экран: в приложениях React все они обычно являются компонентами.

Например, мы можем создать компонент `App`, который многократно отрисовывает `Welcome`:

```js{8-10}
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Сара" />
      <Welcome name="Кахаль" />
      <Welcome name="Эдит" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Как правило, в новых приложениях React есть один компонент `App`, который находится в самом верху иерархии компонентов. Однако, если вы интегрируете React в существующее приложение, вы можете начать снизу вверх с небольшого компонента, такого как `Button`, и постепенно идти вверх по иерархии представлений.

## Извлечение компонентов

Не бойтесь разделять компоненты на более мелкие компоненты.

Например, рассмотрим этот компонент `Comment`:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

Он принимает `author` (объект), `text` (строка) и `date` (дата) в качестве свойств и описывает комментарий на сайте социальных сетей.

Этот компонент может быть сложно изменить из-за вложенности, а также трудно повторно использовать отдельные его части. Давайте извлечём из него несколько компонентов.

Сначала мы извлечём `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Компонент `Avatar` не должен знать, что он отрисовывается внутри `Comment`. Вот почему мы присвоили свойству объекта `props` более общее имя: `user`, а не `author`.

Мы рекомендуем называть свойства объекта `props` с точки зрения самого компонента, а не контекста, в котором он используется.

Теперь мы можем чуть-чуть упростить `Comment`:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Затем мы извлечём компонент `UserInfo`, который отобразит `Avatar` рядом с именем пользователя:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Это позволяет нам упростить `Comment` ещё больше:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

Извлечение компонентов сначала может показаться монотонной работой, но наличие палитры повторно используемых компонентов окупается в больших приложениях. Хорошее правило на этот счёт можно сформировать так — если часть пользовательского интерфейса используется несколько раз (`Button`,` Panel`, `Avatar`) или достаточно сложна сама по себе (`App`, `FeedStory`,` Comment`), то это хороший кандидат на извлечение компонента, чтобы он стал повторно используемым компонентом.

## Свойства объекта props доступны только для чтения

Независимо от того, объявляете ли компонент [как функцию или класс](#functional-and-class-components), он не должен изменять свои свойства. Рассмотрим эту функцию `sum`:

```js
function sum(a, b) {
  return a + b;
}
```

Такие функции называются [«чистыми»](https://ru.wikipedia.org/wiki/%D0%A7%D0%B8%D1%81%D1%82%D0%BE%D1%82%D0%B0_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8), потому что они не пытаются изменить свои аргументы и всегда возвращают один и тот же результат для одних и тех же входных данных.

Напротив, функция ниже — не чистая, потому что она изменяет свои входные данные:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React довольно гибкий, но имеет одно строгое правило:

**Все React-компоненты должны вести себя как чистые функции в плане своих свойств.**

Конечно, пользовательские интерфейсы приложений динамичны и меняются со временем. В [следующем разделе](/docs/state-and-lifecycle.html) мы представим новую концепцию «состояние». Состояние позволяет компонентам React изменять свой вывод с течением времени в ответ на действия пользователя, сетевые ответы и что-либо ещё без нарушения правила выше.
