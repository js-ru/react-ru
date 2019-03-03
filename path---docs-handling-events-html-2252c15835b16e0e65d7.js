webpackJsonp([83560920648576],{930:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Обработка событий React-элементов очень похожа на обработку событий на элементах DOM. Существуют синтаксические различия:</p>\n<ul>\n<li>События React именуются в стиле camelCase, а не в нижнем регистре.</li>\n<li>С JSX вы передаёте функцию как обработчик события вместо строки.</li>\n</ul>\n<p>Например, HTML:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-html"><code class="gatsby-code-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>activateLasers()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  Активировать лазеры\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>немного отличается по сравнению с React:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="gatsby-highlight-code-line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>activateLasers<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n</span>  Активировать лазеры\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Другое отличие состоит в том, что вы не можете вернуть <code class="gatsby-code-text">false</code> для предотвращения поведения по умолчанию в React. Вы должны явно вызывать <code class="gatsby-code-text">preventDefault</code>. Например, с помощью обычного HTML, чтобы предотвратить поведение ссылки по умолчанию, которое состоит в открытии новой страницы, вы можете написать:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-html"><code class="gatsby-code-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span> <span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>console.log(<span class="token punctuation">\'</span>Была нажата ссылка.<span class="token punctuation">\'</span>); return false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  Нажми на меня\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>В React это могло бы быть так:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">function</span> <span class="token function">ActionLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="gatsby-highlight-code-line">  <span class="token keyword">function</span> <span class="token function">handleClick</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n</span><span class="gatsby-highlight-code-line">    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Была нажата ссылка.\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token punctuation">}</span>\n</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n<span class="gatsby-highlight-code-line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n</span>      Нажми на меня\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Здесь <code class="gatsby-code-text">e</code> — синтетическое событие. React определяет эти синтетические события в соответствии со <a href="https://www.w3.org/TR/DOM-Level-3-Events/">спецификацией W3C</a>, поэтому вам не нужно беспокоиться о совместимости между браузерами. Посмотрите справочное руководство <a href="/docs/events.html"><code class="gatsby-code-text">SyntheticEvent</code></a> для получения дополнительной информации.</p>\n<p>При использовании React вам обычно не нужно вызывать <code class="gatsby-code-text">addEventListener</code>, чтобы добавить обработчиков событий в элемент DOM после его создания. Вместо этого просто предоставьте обработчик, когда элемент изначально отрисовывается.</p>\n<p>Когда вы определяете компонент, используя <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes">класс ES6</a>, распространённой практикой является объявлять обработчик события как метод класса. Например, данный компонент <code class="gatsby-code-text">Toggle</code> отображает кнопку, которая позволяет пользователю переключаться между состояниями «ON» и «OFF»:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">class</span> <span class="token class-name">Toggle</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>isToggleOn<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="gatsby-highlight-code-line">    <span class="token comment">// Это привязывание необходимо, чтобы работал объект `this` в колбэке</span>\n</span><span class="gatsby-highlight-code-line">    <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span>  <span class="token punctuation">}</span>\n\n<span class="gatsby-highlight-code-line">  <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n</span><span class="gatsby-highlight-code-line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>prevState <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n</span><span class="gatsby-highlight-code-line">      isToggleOn<span class="token punctuation">:</span> <span class="token operator">!</span>prevState<span class="token punctuation">.</span>isToggleOn\n</span><span class="gatsby-highlight-code-line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token punctuation">}</span>\n</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n<span class="gatsby-highlight-code-line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n</span>        <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>isToggleOn <span class="token operator">?</span> <span class="token string">\'ON\'</span> <span class="token punctuation">:</span> <span class="token string">\'OFF\'</span><span class="token punctuation">}</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Toggle</span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a href="http://codepen.io/gaearon/pen/xEmzGg?editors=0010"><strong>Попробовать на CodePen</strong></a></p>\n<p>Нужно быть аккуратным со значением <code class="gatsby-code-text">this</code> в колбэках JSX. В JavaScript методы класса не <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_objects/Function/bind">привязаны</a> по умолчанию. Если вы забудете привязать <code class="gatsby-code-text">this.handleClick</code> и передать его в атрибут <code class="gatsby-code-text">onClick</code>, <code class="gatsby-code-text">this</code> будет<code class="gatsby-code-text">undefined</code> при фактическом вызове функции.</p>\n<p>Это не связано с конкретным поведением React; это часть того, <a href="https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/">как работают функции в JavaScript</a>. Как правило, если вы ссылаетесь на метод без <code class="gatsby-code-text">()</code> после него, например <code class="gatsby-code-text">onClick = {this.handleClick}</code>, вам нужно привязать этот метод.</p>\n<p>Если вызов <code class="gatsby-code-text">bind</code> раздражает вас, есть два способа обойти это. Если вы используете экспериментальный <a href="https://babeljs.io/docs/plugins/transform-class-properties/">синтаксис полей общедоступных классов</a>, вы можете использовать поля классов для правильной привязки колбэков:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">class</span> <span class="token class-name">LoggingButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n<span class="gatsby-highlight-code-line">  <span class="token comment">// Данный синтаксис гарантирует, что `this` привязан внутри handleClick.</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token comment">// Предупреждение: это *экспериментальный* синтаксис.</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n</span><span class="gatsby-highlight-code-line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'this это:\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token punctuation">}</span>\n</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        Нажми на меня\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Этот синтаксис включён по умолчанию в <a href="https://github.com/facebookincubator/create-react-app">Create React App</a>.</p>\n<p>Если вы не используете синтаксис полей, то вместо него можно воспользоваться <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions">стрелочной функцией</a> в колбэке:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token keyword">class</span> <span class="token class-name">LoggingButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'this это:\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="gatsby-highlight-code-line">    <span class="token comment">// Данный синтаксис гарантирует, что `this` привязан внутри handleClick.</span>\n</span><span class="gatsby-highlight-code-line">    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n</span><span class="gatsby-highlight-code-line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleClick</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n</span>        Нажми на меня\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Проблема с этим синтаксисом заключается в том, что при каждой отрисовке <code class="gatsby-code-text">LoggingButton</code> создаётся новый колбэк. В большинстве случаев это не создае проблем. Однако, если этот колбэк передаётся в качестве свойства нижестоящим компонентам, то эти компоненты могут выполнять дополнительную повторную отрисовку. Как правило, мы рекомендуем привязывать обработчики в конструкторе или использовать синтаксис полей классов, чтобы избежать такого рода проблем с производительностью.</p>\n<h2 id="Передача-аргментов-в-обработчики-событий"><a href="#%D0%9F%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D0%B0-%D0%B0%D1%80%D0%B3%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D0%B2-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B8-%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Передача аргментов в обработчики событий</h2>\n<p>Внутри цикла обычно требуется передать дополнительный параметр обработчику событий. Например, если <code class="gatsby-code-text">id</code> — это идентификатор строки, рабочим будет один из следующих вариантов:</p>\n<div class="gatsby-highlight">\n      <pre class="gatsby-code-jsx"><code class="gatsby-code-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">deleteRow</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Удалить строку<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>deleteRow<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Удалить строку<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Вышеуказанные две строки эквикаленты и используют <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions">стрелочные функции</a> и <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_objects/Function/bind"><code class="gatsby-code-text">Function.prototype.bind</code></a> соответственно.</p>\n<p>В обоих случаях аргумент <code class="gatsby-code-text">e</code>, представляющий событие React, будет передан как второй аргумент после ID. При использовании стрелочной функции нужно передавать её явно, но с помощью <code class="gatsby-code-text">bind</code> любые дополнительные аргументы передаются в функцию автоматически.</p>',frontmatter:{title:"Обработка событий",next:"conditional-rendering.html",prev:"state-and-lifecycle.html"},fields:{path:"docs/handling-events.md",slug:"docs/handling-events.html"}}},pathContext:{slug:"docs/handling-events.html"}}}});
//# sourceMappingURL=path---docs-handling-events-html-2252c15835b16e0e65d7.js.map