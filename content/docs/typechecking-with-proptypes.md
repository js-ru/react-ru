---
id: typechecking-with-proptypes
title: Проверка типов с помощью PropTypes
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> Примечание:
>
> `React.PropTypes` переместился в другой пакет, начиная с React 15.5. Вместо этого используйте [библиотеку `prop-types`](https://www.npmjs.com/package/prop-types).
>
> Мы предоставляет [скрипт codemod](/blog/2017/04/07/react-v15.5.0.html#migrating-from-reactproptypes для автоматизации преобразования.

По мере того, как ваше приложение растёт, вы можете обнаружить множество ошибок с помощью проверки типов. Для некоторых приложений вы можете использовать расширения JavaScript, такие как [Flow](https://flow.org/) или [TypeScript](https://www.typescriptlang.org/) для проверки типов по всему вашему приложению. Но даже если вы не используете их, React имеет некоторые встроенные возможности проверки типов. Чтобы запустить проверку типов свойствах в компоненте, вы можете присвоить специальное свойство `propTypes`:

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Привет, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

`PropTypes` экспортирует ряд валидаторов, используемые для того, чтобы убедиться, что входные данные, корректные (совпадают типу). В этом примере мы используем `PropTypes.string`. Если для свойства указано некорректное значение, в консоли JavaScript будет показано предупреждение. По соображениям производительности проверка `propTypes` работает только в режиме разработки.

### PropTypes

Ниже приведён пример документирования различных предоставленных валидаторов:

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Вы можете объявить, что свойство — это конкретный тип JS. По умолчанию все
  // они необязательны
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Все, что можно отрисовать: числа, строки, элементы или массив
  // (или фрагмент), содержащий эти типы
  optionalNode: PropTypes.node,

  // React-элемент.
  optionalElement: PropTypes.element,

  // Вы также можете объявить, что свойство — экземпляр класса. Будет
  // использоваться JS-оператор instanceof.
  optionalMessage: PropTypes.instanceOf(Message),

  // Вы можете гарантировать, что ваше свойство была ограничена конкретными значениями,
  // которые рассматриваются в виде перечисления
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Объект, который может быть один из разных типов
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Массив определённого типа
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Объект со значениями свойств определённого типа
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Объект с определённой структорой
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // Вы можете добавить к любому из вышеперечисленных значений `isRequired`
  // чтобы показать предупреждение, если свойство не предоставлено
  requiredFunc: PropTypes.func.isRequired,

  // Значение любого типа данных
  requiredAny: PropTypes.any.isRequired,

  // Также можно указать пользовательский валидатор. Он должен вернуть объект Error
  // при неудачной валидации. Не используйте `console.warn` или throw, поскольку
  // это не будет работать внутри `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Некорректное свойство `' + propName + '` передано в компонент' +
        ' `' + componentName + '`. Валидация прошла неудачно.'
      );
    }
  },

  // Также можно указать пользовательский валидатор для `arrayOf` или `objectOf`.
  // Он должен вернуть объект Error, если валидация потерпела неудачу. Валидатор
  // будет вызван для каждого ключа в массиве или объекте. Первые два аргумента
  // валидатора — сам массив или объект, и
  // текущий ключ элемента.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Некорректное свойство `' + propFullName + '` передано в компонент' +
        ' `' + componentName + '`. Валидация прошла неудачно.'
      );
    }
  })
};
```

### Требование единственного дочернего элемента

С помощью `PropTypes.element` вы можете указать, что только один дочерний элемент может быть передан компоненту в качестве `children`.

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Должен ровно один элемент, иначе — предупреждение.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

### Значения по умолчанию для свойств

Вы можете определить значения по умолчанию для ваших `props`, использов специальное свойство `defaultProps`:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Привет, {this.props.name}</h1>
    );
  }
}

// Указывает значения по умолчанию для свойств:
Greeting.defaultProps = {
  name: 'незнакомец'
};

// Отрисовывает "Привет, незнакомец":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

Если вы используете преобразование Babel, например [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/), вы также можете объявить `defaultProps` как статическое свойство в класс компонента React. Этот синтаксис ещё не готов, и для его работы в браузере требуется выполнить этап компиляции. Для получения дополнительной информации смотрите [предложение полей класса](https://github.com/tc39/proposal-class-fields).

```javascript
class Greeting extends React.Component {
  static defaultProps = {
    name: 'незнакомец'
  }

  render() {
    return (
      <div>Привет, {this.props.name}</div>
    )
  }
}
```

`defaultProps` используется для обеспечения того, что у `this.props.name` будет значение, если оно не было указано родительским компонентом. Проверка типов `propTypes` выполняется после того, как `defaultProps` вычислены, поэтому проверка типов также применяется к `defaultProps`.
