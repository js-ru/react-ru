---
title: Компоненты с состоянием
order: 1
domid: timer-example
---

Помимо ввода входных данных (доступных через `this.props`), компонент может поддерживать внутренние данные состояния (доступные через `this.state`). Когда данные состояния компонента изменяются, отрисованная разметка будет обновляться путём повторного вызова `render()`.