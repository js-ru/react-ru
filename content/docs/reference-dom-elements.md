---
id: dom-elements
title: DOM-элементы
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

React реализует независимую от браузера DOM-систему для повышения производительности и кроссбраузерной совместимости. Мы воспользовались возможностью, чтобы очистить несколько острых углов в реализациях DOM браузера.

В React все свойства и атрибуты DOM (включая обработчики событий) должны быть в стиле camelCase. Например, HTML-атрибут tabindex соответствует атрибуту `tabIndex` в React. Исключение составляют атрибуты `aria- *` и `data- *`, которые должны быть написаны в нижнем регистре. Например, вы можете оставить `aria-label` как `aria-label`.

## Различия в атрибутах

Существует ряд атрибутов, которые работают по-разному в React и HTML:

### checked

Атрибут `checked` поддерживается компонентами `<input>` типа `checkbox` или `radio`. Вы можете использовать его, чтобы установить, отмечен ли компонент. Это полезно для создания контролируемых компонентов. `defaultChecked` — это неконтролируемый эквивалент, который устанавливает, отмечен ли компонент, когда он впервые примонтирован.

### className

Чтобы указать класс CSS, используйте атрибут `className`. Это относится ко всем обычным элементам DOM и SVG, таким как `<div>`, `<a>` и др.

Если вы используете React с веб-компонентами (Web Components), что редко встречается, используйте вместо этого атрибут `class`.

### dangerouslySetInnerHTML

`dangerouslySetInnerHTML` — это замена React для использования `innerHTML` в браузере DOM. В целом, установка HTML из кода является рискованным, потому что легко непреднамеренно подвергнуть ваших пользователей атаке [«межсайтовый скриптинг» (cross-site scripting, XSS)](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3). Таким образом, вы можете задать HTML напрямую из React, использовав `dangerouslySetInnerHTML` и передать объект с помощью ключа `__html` для напоминая самому себя, что это опасно. Например:

```js
function createMarkup() {
  return {__html: 'Первый &middot; Второй'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor

Поскольку `for` является зарезервированным словом в JavaScript, элементы React вместо этого используют `htmlFor`.

### onChange

Событие `onChange` ведёт себя так, как вы ожидали: каждый раз, когда изменяется поле формы, вызывается данное событие. Мы специально не используем существующее поведение браузера, потому что `onChange` является ошибочным для его поведения, и React полагается на это событие для обработки ввода пользователем в режиме реального времени.

### selected

Атрибут `selected` поддерживается компонентами `<option>`. Вы можете использовать его, чтобы указать, выбран ли компонент. Это полезно для создания контролируемых компонентов.

### style

> Примечание
>
> Некоторые примеры в документации используют `style` для удобства, но **использование атрибута `style` в качестве основного способа для стилизации элементов, как правило, не рекомендуется.** В большинстве случаев [`className`](#classname) следует используется для указания классов, определённых во внешней таблице стилей CSS. `style` чаще всего используется в приложениях React для добавления динамических стилей, применяемых во время отрисовки. См. также [FAQ: Стилизация и CSS](/docs/faq-styling.html).

Атрибут `style` принимает объект JavaScript со свойствами в стиле написания camelCase, а строку с CSS. Это соответствует свойству JavaScript DOM `style`, что более эффективно и предотвращает дыры в безопасности при атак типа XSS. Например:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Привет, мир!</div>;
}
```

Обратите внимание, что к стилям не добавляются браузерные префиксы. Чтобы поддерживать старые браузеры, вам необходимо задать соответствующие свойства для стиля:

```js
const divStyle = {
  WebkitTransition: 'all', // обратите внимание на прописную букву 'W' здесь
  msTransition: 'all' // 'ms' — единственный браузерный префикс в нижнем регистре
};

function ComponentWithTransition() {
  return <div style={divStyle}>Это должно работать во всех браузерах</div>;
}
```

Ключи стилей пишутся в стиле camelCase для совместимости с доступом к свойствам на DOM-узлах с JS-кода (например, `node.style.backgroundImage`). Префиксы браузеров [кроме `ms`](http://www.andismith.com/blog/2012/02/modernizr-prefixed/) начинаются с прописной буквы. Вот почему у `WebkitTransition` заглавная буква «W».

React автоматически добавит суффикс «px» к определённым числовым встроенным свойствам стиля. Если вы хотите использовать единицы, отличные от «px», укажите значение в виде строки с нужным единицей измерения. Например:

```js
// Результат стиля: '10px'
<div style={{ height: 10 }}>
  Привет, мир
</div>

// Результат стиля: '10%'
<div style={{ height: '10%' }}>
  Привет, мир
</div>
```

Однако не все свойства стиля преобразуются в строки с уже заданными пикселями. Некоторые из них остаются без каких-либо единиц (например, `zoom`,` order`, `flex`). Полный список свойств, не имеющих единиц, можно посмотреть [здесь](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

### suppressContentEditableWarning

Как правило, появляется предупреждение, когда элемент с дочерними элементами также помечен как `contentEditable`, поскольку он не будет работать. Этот атрибут скрывает это предупреждение. Не используйте его, если вы не создаёте такую ​​библиотеку, как [Draft.js](https://facebook.github.io/draft-js/), которая управляет `contentEditable` вручную.

### suppressHydrationWarning

Если вы используете отрисовку React на стороне сервера, обычно появляется предупреждение, когда сервер и клиент отрисовывают разное содержимое. Однако в некоторых редких случаях очень сложно или невозможно гарантировать точное соответствие. Например, ожидается, что метки времени будут отличаться на сервере и на клиенте.

Если вы установите `suppressHydrationWarning` на значение` true`, React не будет предупреждать вас о несоответствиях в атрибутах и о содержимом этого элемента. Он работает только на один уровень вложенности и предназначен для использования в качестве запасного варианта. Не злоупотребляйте им. Вы можете больше узнать о гидратации в [документации к `ReactDOM.hydrate()`](/docs/react-dom.html#hydrate).

### value

Атрибут `value` поддерживается компонентами `<input> `и `<textarea>`. Вы можете использовать его для установки значения компонента. Это полезно для создания контролируемых компонентов. `defaultValue` — это неконтролируемый эквивалент, который устанавливает значение компонента при его первом монтировании.

## Все поддерживаемые HTML-атрибуты

Начиная с React 16, все стандартные [или пользовательские](/blog/2017/09/08/dom-attributes-in-react-16.html) DOM-атрибуты полностью поддерживаются.

React всегда предоставлял JavaScript-ориентированный API для DOM. Поскольку компоненты React часто используют как пользовательские, так и связанные c DOM свойства, React следует соглашению по именованию `camelCase` так же, как API DOM:

```js
<div tabIndex="-1" />      // Так же, как и node.tabIndex в API DOM
<div className="Button" /> // Так же, как и node.className в API DOM
<input readOnly={true} />  // Так же, как и node.readOnly в API DOM
```

Эти свойства работают аналогично соответствующим HTML-атрибутам, за исключением особых случаев, описанных выше.

Некоторые из атрибутов DOM, поддерживаемые React, включают:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Аналогично, все SVG-атрибуты полностью поддерживаются:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

Вы также можете использовать пользовательские атрибуты, если они полностью написаны в нижнем регистре.
