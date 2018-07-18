---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Это справочное руководство документирует обёртку `SyntheticEvent`, часть системы событий React. Смотрите руководство по [обработке событий](/docs/handling-events.html), чтобы узнать больше.

## Обзор

Вашим обработчикам событий будут переданы экземпляры `SyntheticEvent`, кроссбраузерная оболочка вокруг нативного события браузера. Она имеет тот же интерфейс, что и нативное событие браузера, включая `stopPropagation()` и `preventDefault()`, за исключением того, что события работают одинаково во всех браузерах.

Если по какой-то причине вам нужно исходное событие браузера, просто используйте атрибут `nativeEvent` для его получения. У каждого объекта `SyntheticEvent` есть следующие атрибуты:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> Примечание:
>
> Начиная с версии 0.14, возврат `false` из обработчика события больше не будет останавливать всплытие события. Вместо этого `e.stopPropagation ()` или `e.preventDefault ()` следует запускать вручную, если это необходимо.

### Объединение событий в пул

`SyntheticEvent` помещается в пул. Это означает, что объект `SyntheticEvent` будет повторно использован, и все свойства будут иметь значение `null` после того, как колбэк будет вызван.
Это сделано по соображениям производительности.
Таким образом, вы не можете получить доступ к событию асинхронным способом.

```javascript
function onClick(event) {
  console.log(event); // => обнуляемый объект.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Не будет работать. this.state.clickEvent будет содержать только значения null.
  this.setState({clickEvent: event});

  // Вы всё равно можете экспортировать свойства события.
  this.setState({eventType: event.type});
}
```

> Примечание:
>
> Если вы хотите получить доступ к свойствам событий асинхронным способом, вам следует вызвать `event.persist()` на событии, что удалит синтетическое событие из пула и позволит ссылаться на событие, которое будет сохранено кодом пользователя.

## Поддерживаемые события

React нормализует события для того, чтобы они имели одинаковые свойства в разных браузерах.

Обработчики событий, перечисленные ниже, вызываются событием в стадии всплытия. Чтобы зарегистрировать обработчик событий для стадии перехвата, добавьте `Capture` в имя события; например, вместо использования `onClick`, вам следует использовать `onClickCapture` для обработки события `click` в фазе перехвата.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)

* * *

## Справочник

### События буфера обмена

Имена событий:

```
onCopy onCut onPaste
```

Свойства:

```javascript
DOMDataTransfer clipboardData
```

* * *

### События композиции

Имена событий:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Свойства:

```javascript
string data

```

* * *

### События клавиатуры

Имена событий:

```
onKeyDown onKeyPress onKeyUp
```

Свойства:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

Свойство `key` может принимать любые значения, задокументированные в [спецификации событий DOM третьего уровня](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### События фокуса

Имена событий:

```
onFocus onBlur
```

Эти события фокуса работают на всех элементах DOM React, а не только на элементах формы.

Свойства:

```javascript
DOMEventTarget relatedTarget
```

* * *

### События формы

Имена событий:

```
onChange onInput onInvalid onSubmit
```

Дополнительную информацию о событии `onChange` можно получить в разделе [Формы](/docs/forms.html).

* * *

### События мыши

Имена событий:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

События `onMouseEnter` и` onMouseLeave` распространяются от элемента, с которого мышь ушла к элементу над которым она появилась, вместо обычного всплытия и не имеют фазы перехвата.

Свойства:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### События указателя

Имена событий:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

События `onPointerEnter` и` onPointerLeave` распространяются с элемента, от которого ушла мышь до элемента, над которым она находится теперь, вместо обычного всплытия и не имеют фазы перехвата.

Свойства:

Как определено в [спецификации W3](https://www.w3.org/TR/pointerevents/), события указателя расширяют [события мыши](#mouse-events) со следующими свойствами:

```javascript
number pointerId
number width
number height
number pressure
number tiltX
number tiltY
string pointerType
boolean isPrimary
```

Заметка про поддержку кроссбраузерности:

События указателей пока не поддерживаются в каждом браузере (во время написания этой статьи к поддерживаемым браузерам относятся: Chrome, Firefox, Edge и Internet Explorer). React преднамеренно не поддерживает полифилы для других браузеров, потому что отвечающий стандартам полифил значительно увеличивает размер пакета `react-dom`.

Если вашему приложению требуются события указателя, мы рекомендуем добавить сторонний полифил для событий указателей.

* * *

### События выделения

Имена событий:

```
onSelect
```

* * *

### События прикосновения

Имена событий:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Свойства:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### События пользовательского интерфейса (UI)

Имена событий:

```
onScroll
```

Свойства:

```javascript
number detail
DOMAbstractView view
```

* * *

### События колеса мыши

Имена событий:

```
onWheel
```

Свойства:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### События медиаресурсов

Имена событий:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### События изображений

Имена событий:

```
onLoad onError
```

* * *

### События анимаций

Имена событий:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Свойства:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### События CSS-свойства transition

Имена событий:

```
onTransitionEnd
```

Свойства:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Другие события

Имена событий:

```
onToggle
```
