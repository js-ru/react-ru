---
id: forms
title: Формы
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

Элементы формы HTML работают немного иначе, чем другие элементы DOM в React, потому что элементы формы по своей реализации сохраняют некоторое внутреннее состояние. Например, эта форма в обычном HTML принимает только имя:

```html
<form>
  <label>
    Имя:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Отправить" />
</form>
```

У этой формы есть поведение HTML-формы по умолчанию — переход на новую страницу при отправке пользователем формы. Если вы хотите такое поведение в React, это будет просто работать и так. Но в большинстве случаев удобно создать JavaScript-функцию, которая будет обрабатывать отправку формы и иметь доступ к данным, которые ввёл пользователь в форму. Общепринятый способ достичь этого — использование техники под названием «контролируемые компоненты».

## Контролируемые компоненты

В HTML элементы формы, такие как `<input>`, `<textarea>` и `<select>`, обычно поддерживают собственное состояние и обновляют его в соответствии с пользовательскими входными данными. В React изменяемое состояние обычно хранится в свойстве `state` компонентов и обновляется только с помощью [`setState()`](/docs/react-component.html#setstate).

Мы можем объединить всё это вместе, сделав состояние React «единственным источником данных (истины)». Затем компонент React, который отрисовывает форму, также контролирует, что происходит в этой форме при последующем вводе данных пользователем. Элемент поля ввода формы, значение которого контролируется React подобным образом, называется «контролируемым компонентом».

Например, если мы хотим, чтобы предыдущий пример выводил на консоль имя при отправке формы, мы можем написать её как контролируемый компонент:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Отправленное имя: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Поскольку атрибут `value` установлен в нашем элементе формы, отображаемое значение всегда будет находится в `this.state.value`, что делает состояние React источником данных (истины). Поскольку `handleChange` выполняется при каждом нажатии клавиши, что приводит к обновлению состояния React, то отображаемое значение будет обновляться по мере ввода данных пользователем.

В контролируемом компоненте каждое изменение состояния будет связано с функцией-обработчиком. Это упрощает изменение или проверку входных данных пользователя. Например, если мы хотим, чтобы входные имена записывались заглавными буквами, мы могли бы написать `handleChange` таким образом:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## Тег textarea

В HTML элемент `<textarea>` определяет свой текст по дочерним элементам:

```html
<textarea>
  Привет, это часть текста в многострочном текстовом поле
</textarea>
```

В React `<textarea>` используется атрибут `value` вместо этого. Таким образом, форма, использующая `<textarea>`, может быть написана очень похоже на форму, которая использует обычное однострочное поле ввода:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Пожалуйста, напишите эссе о своём любимом DOM-элементе.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Отправленное эссе: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Эссе:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
```

Обратите внимание, что `this.state.value` создаётся в конструкторе, так что текстовая область начинается с текста, определённого в нём.

## Тег select

В HTML `<select>` создаёт выпадающий список. Например, этот HTML создаёт выпадающий список вкусов:

```html
<select>
  <option value="grapefruit">Грейпфрут</option>
  <option value="lime">Лайм</option>
  <option selected value="coconut">Кокос</option>
  <option value="mango">Манго</option>
</select>
```

Обратите внимание, что изначально выбран пункт списка «Coconut» из-за атрибута `selected`. React вместо атрибута `selected` использует атрибут `value` в корневом теге `select`. Это удобнее в контролируемом компоненте, потому что нужно только обновить его в одном месте. Например:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Ваш любимый вкус: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Выберите ваш любимый вкус:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option>
          </select>
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

В целом, это приводит к тому, что `<input type="text">`, `<textarea>` и `<select>` работают одинаково — все они принимают атрибут `value`, который можно использовать для реализации контролируемого компонента.

> Примечание
>
> Вы можете передать массив в атрибут `value`, что позволяет вам выбрать несколько пунктов в теге `select`:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## Тег поля для загрузки файла

В HTML элемент `<input type="file">` позволяет пользователю выбрать один или несколько файлов из устройства хранения для загрузки на сервер или изменять его с помощью JavaScript через [API File](https://developer.mozilla.org/ru/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

Поскольку его значение доступно только для чтения, это **неконтролируемый** компонент в React. Он обсуждается вместе с другими неконтролируемыми компонентами [позднее в этой документации](/docs/uncontrolled-components.html#the-file-input-tag).

## Обработка нескольких полей ввода

Когда вам нужно обрабатывать несколько контролируемых элементов `input`, вы можете добавить атрибут `name` на каждый элемент и позволить функции-обработчику выбрать, что делать, исходя из значения `event.target.name`

Например:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Я собираюсь пойти:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Количество гостей:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Попробовать на CodePen**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Обратите внимание, что мы использовали синтаксис [вычисляемого имени свойства](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) из ES6 для обновления ключа состояния, соответствующему определённому имени поля ввода:

```js{2}
this.setState({
  [name]: value
});
```

Это эквивалентно этому коду в ES5:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Кроме того, поскольку `setState()` автоматически [объединяет частичное состояние в текущее состояние](/docs/state-and-lifecycle.html#state-updates-are-merged), нам нужно только вызвать его с изменёнными частями.

## Значение null в контролируемом компоненте

Определение свойства `value` в [контролируемом компоненте](/docs/forms.html#controlled-components) предотвращает пользователю изменять значение поля ввода, если вы этого не хотите. Если вы не указали `value`, но поле ввода всё ещё доступно для редактирования, возможно, вы случайно установили атрибуту `value` значение `undefined` или `null`.

Код ниже демонстрирует такой случай. (Сначала поле ввода заблокировано, но становится редактируемым после короткой задержки.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Альтернативы контролируемым компонентам

Иногда бывает сложно использовать контролируемые компоненты, потому что нужно писать обработчик событий для каждого способа, которым ваши данные могут измениться, и передать всё входное состояние через React-компонент. Это может стать особенно раздражающим, когда вы преобразуете ранее существовашую базу кода на React или интегрируете приложение React с библиотекой, отличной от React. В таких ситуациях вы можете рассмотреть использование [неконтролируемых компонентов](/docs/uncontrolled-components.html), альтернативный метод реализации форм с полями ввода.

## Полноценные готовые решения

Если вы ищете готовое решение, включающее валидацию, отслеживание заполненных полей и обработку отправки формы, то [Formik](https://jaredpalmer.com/formik) — один из популярных вариантов. Однако, этот инструмент создан с использованием тех же принципов контролируемых компонентов и управления состоянием, поэтому обязательно изучите их.
