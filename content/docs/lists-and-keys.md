---
id: lists-and-keys
title: Списки и ключи
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Сначала давайте посмотрим, как можно преобразовывать списки в JavaScript.

В приведённом ниже коде мы используем функцию [`map()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/map), чтобы взять массив `numbers` и удвоить каждое из его значений. WМы присваиваем новый массив, возвращённый `map()`, переменной `doubled` и выводим на консоль на его:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Данный код выводит на консоль `[2, 4, 6, 8, 10]`.

В React преобразование массивов в списки [элементов](/docs/rendering-elements.html) почти идентично.

### Отрисовка несколько компонентов

Вы можете создавать коллекции элементов и [включить его в JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx), используя фигурные скобки `{}`.

Ниже перебираем массив `numbers`, используя JavaScript-функцию [`map()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Мы возвращаем элемент `<li>` для каждого элемента. Наконец, мы присваиваем полученный массив элементов переменной `listItems`:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Мы включаем весь массив `listItems` внутри элемента `<ul>` и [отрисовываем его в DOM](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Этот код отображается маркированный список чисел от 1 до 5.

### Простой компонент списка

Обычно вы будете отрисовывать списки внутри [компонента](/docs/components-and-props.html).

Мы можем переписать предыдущий пример в компонент, принимающий массив чисел (`numbers`) и выводит неупорядоченный список элементов.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

При выполнении данного кода, вы получите предупреждение, что должен предоставлен ключ для элементов списка. «Ключ» — специальный строковый атрибут, который необходимо включать при создании списков элементов. Мы  обсудим, почему это важно в следующем разделе.

Давайте назначим значение для атрибута `key` нашим элементам списка внутри `numbers.map()` для исправления ошибки с отсутствующим ключом.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Ключи

Ключи помогают React идентифицировать, какие элементы были изменены, добавлены или удалены. Ключи должны быть заданы элементам внутри массива, чтобы предоставить элементам постоянный идентификатор:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Лучший способ выбрать ключ — использовать строку, которая однозначно идентифицирует элемент списка среди его соседних элементов. Чаще всего в качестве ключей вы будете использовать идентификаторы из ваших данных:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Если у вас нет постоянных идентификаторов для отрисовываемых элементов, в крайнем случае вы можете использовать индекс элемента в качестве ключа:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Делайте подобное только в случае, если у элементов нет постоянных идентификаторов
  <li key={index}>
    {todo.text}
  </li>
);
```

Мы не рекомендуем использовать индексы для ключей, если порядок элементов может измениться. Это может негативно сказаться на производительности и вызвать проблемы с состоянием компонента. Ознакомтесь со статьёй Робина Покорни (Robin Pokorny) для [подробного объяснения негативных последствий использования индекса в качестве ключа](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). Если вы решите не назначать явный ключ для списка элементов, тогда React по умолчанию будет использовать индексы в качестве ключей.

Также вы можете прочитать [подробное объяснение того, почему ключи необходимы](/docs/reconciliation.html#recursing-on-children), если вам интересно узнать это.

### Выделение компонентов с ключами

Ключи имеют смысл только в контексте окружающего массива.

Например, если вы [выделяете](/docs/components-and-props.html#extracting-components) компонент `ListItem`, вам нужно присваивать ключ элементам `<ListItem />` в массиве, а не элементам `<li>` в самом `ListItem`.

**Пример: неправильное назначение ключа**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Неправильно! Здесь не нужно указывать ключ:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Неправильно! Здесь должен быть указан ключ:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Пример: Корректное использование ключа**

```javascript{2,3,9,10}
function ListItem(props) {
  // Правильно! Здесь не нужно указывать ключ:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Правильно! Ключ должен быть указан внутри массива.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Придерживайтесь хорошему правилу: внутри вызова `map()` обязательно указывать ключи для элементов.

### Ключи должны быть уникальными только в пределах элементов одного уровня

Ключи, используемые в массивах, должны быть уникальными среди их элементов на одном и том же уровне. Поэтому им не обязательно быть глобально уникальными. Мы можем использовать те же самые ключи при создании двух разных массивов:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Привет, мир', content: 'Добро пожаловать в изучение React!'},
  {id: 2, title: 'Установка', content: 'Вы можете установить React из npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Ключи служат подсказкой для React, но они не передаются вашим компонентам. Если вам нужно то же самое значение в вашем компоненте, передайте его явно в виде свойства с другим именем:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

В примере выше компонент `Post` может получить значение `props.id`, но не `props.key`.

### Встраивание map() в JSX

В приведённых выше примерах мы объявили отдельную переменную `listItems` и включили её в JSX:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX позволяет [встраивать любое выражение](/docs/introducing-jsx.html#embedding-expressions-in-jsx) в фигурных скобках, поэтому мы могли встроить результат вызова `map()`:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Иногда это приводит к более чистому коду, но этим стилем не стоит злоупотреблять. Как и в JavaScript, вам решать, стоит ли извлекать переменную для большей читабельности. Имейте в виду, что если у блока кода в `map()`  слишком большой уровень вложенности, возможно, наступило подходящее время для [извлечения компонента](/docs/components-and-props.html#extracting-components).
