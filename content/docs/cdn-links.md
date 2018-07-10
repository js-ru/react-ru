---
id: cdn-links
title: Ссылки CDN
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: hello-world.html
---

Оба React и ReactDOM доступны через CDN.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

Вышеперечисленные версии предназначены только для разработки и не подходят для продакшена. Минимизированные и оптимизированные продакшен-версии React доступны по следующим адресам:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

Для загрузки определённых версий `react` и `react-dom`, замените `16` на требуемый номер версии.

### Зачем используется атрибут `crossorigin`?

Если вы подключаете React через CDN, мы рекомендуем сохранить атрибут [`crossorigin`](https://developer.mozilla.org/ru/docs/Web/HTML/CORS_settings_attributes):

```html
<script crossorigin src="..."></script>
```

Мы также рекомендуем проверить, что используемый вами CDN устанавливает HTTP-заголовок `Access-Control-Allow-Origin: *`:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Это позволяет [улушчить обработку ошибок](/blog/2017/07/26/error-handling-in-react-16.html) в React 16 и более новых версиях.
