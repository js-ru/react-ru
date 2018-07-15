webpackJsonp([0x81b8806e4260],{972:function(e,t){e.exports={data:{code:{edges:[{node:{id:"a-component-using-external-plugins",internal:{contentDigest:'"class MarkdownEditor extends React.Component {\\n  constructor(props) {\\n    super(props);\\n    this.handleChange = this.handleChange.bind(this);\\n    this.state = { value: \'Привет, **мир**!\' };\\n  }\\n\\n  handleChange(e) {\\n    this.setState({ value: e.target.value });\\n  }\\n\\n  getRawMarkup() {\\n    const md = new Remarkable();\\n    return { __html: md.render(this.state.value) };\\n  }\\n\\n  render() {\\n    return (\\n      <div className=\\"MarkdownEditor\\">\\n        <h3>Входные данные</h3>\\n        <label htmlFor=\\"markdown-content\\">\\n          Введите что-то в формате Markdown\\n        </label>\\n        <textarea\\n          id=\\"markdown-content\\"\\n          onChange={this.handleChange}\\n          defaultValue={this.state.value}\\n        />\\n        <h3>Вывод</h3>\\n        <div\\n          className=\\"content\\"\\n          dangerouslySetInnerHTML={this.getRawMarkup()}\\n        />\\n      </div>\\n    );\\n  }\\n}\\n\\nReactDOM.render(<MarkdownEditor />, mountNode);"'}}},{node:{id:"a-simple-component",internal:{contentDigest:'"class HelloMessage extends React.Component {\\n  render() {\\n    return (\\n      <div>\\n        Привет, {this.props.name}\\n      </div>\\n    );\\n  }\\n}\\n\\nReactDOM.render(\\n  <HelloMessage name=\\"Тейлор\\" />,\\n  mountNode\\n);"'}}},{node:{id:"a-stateful-component",internal:{contentDigest:'"class Timer extends React.Component {\\n  constructor(props) {\\n    super(props);\\n    this.state = { seconds: 0 };\\n  }\\n\\n  tick() {\\n    this.setState(prevState => ({\\n      seconds: prevState.seconds + 1\\n    }));\\n  }\\n\\n  componentDidMount() {\\n    this.interval = setInterval(() => this.tick(), 1000);\\n  }\\n\\n  componentWillUnmount() {\\n    clearInterval(this.interval);\\n  }\\n\\n  render() {\\n    return (\\n      <div>\\n        Секунды: {this.state.seconds}\\n      </div>\\n    );\\n  }\\n}\\n\\nReactDOM.render(<Timer />, mountNode);"'}}},{node:{id:"an-application",internal:{contentDigest:'"class TodoApp extends React.Component {\\n  constructor(props) {\\n    super(props);\\n    this.state = { items: [], text: \'\' };\\n    this.handleChange = this.handleChange.bind(this);\\n    this.handleSubmit = this.handleSubmit.bind(this);\\n  }\\n\\n  render() {\\n    return (\\n      <div>\\n        <h3>Список дел</h3>\\n        <TodoList items={this.state.items} />\\n        <form onSubmit={this.handleSubmit}>\\n          <label htmlFor=\\"new-todo\\">\\n            Что нужно сделать?\\n          </label>\\n          <input\\n            id=\\"new-todo\\"\\n            onChange={this.handleChange}\\n            value={this.state.text}\\n          />\\n          <button>\\n            Добавить #{this.state.items.length + 1}\\n          </button>\\n        </form>\\n      </div>\\n    );\\n  }\\n\\n  handleChange(e) {\\n    this.setState({ text: e.target.value });\\n  }\\n\\n  handleSubmit(e) {\\n    e.preventDefault();\\n    if (!this.state.text.length) {\\n      return;\\n    }\\n    const newItem = {\\n      text: this.state.text,\\n      id: Date.now()\\n    };\\n    this.setState(prevState => ({\\n      items: prevState.items.concat(newItem),\\n      text: \'\'\\n    }));\\n  }\\n}\\n\\nclass TodoList extends React.Component {\\n  render() {\\n    return (\\n      <ul>\\n        {this.props.items.map(item => (\\n          <li key={item.id}>{item.text}</li>\\n        ))}\\n      </ul>\\n    );\\n  }\\n}\\n\\nReactDOM.render(<TodoApp />, mountNode);\\n"'}}}]},examples:{edges:[{node:{fields:{slug:"/home/examples/a-simple-component.html"},frontmatter:{title:"Простой компонент"},html:'<p>Компоненты React реализуют метод <code class="gatsby-code-text">render()</code>, который принимает входные данные и возвращает данные для отображения. В этом примере используется XML-подобный синтаксис JSX. Входные данные, которые передаются в компонент, могут быть доступны в <code class="gatsby-code-text">render()</code> через <code class="gatsby-code-text">this.props</code>.</p>\n<p><strong>JSX необязателен и не его требуется использовать в React.</strong> Попробуйте <a href="https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA" target="_blank" rel="noreferrer">REPL Babel</a>, чтобы увидеть необработанный код JavaScript, созданный на этапе компиляции JSX.</p>'}},{node:{fields:{slug:"/home/examples/a-stateful-component.html"},frontmatter:{title:"Компоненты с состоянием"},html:'<p>Помимо ввода входных данных (доступных через <code class="gatsby-code-text">this.props</code>), компонент может поддерживать внутренние данные состояния (доступные через <code class="gatsby-code-text">this.state</code>). Когда данные состояния компонента изменяются, отрисованная разметка будет обновляться путём повторного вызова <code class="gatsby-code-text">render()</code>.</p>'}},{node:{fields:{slug:"/home/examples/an-application.html"},frontmatter:{title:"Приложение"},html:'<p>Используя <code class="gatsby-code-text">props</code> и<code class="gatsby-code-text">state</code>, мы можем создать небольшое приложение со списком дел. В этом примере используется <code class="gatsby-code-text">state</code> для отслеживания текущего списка элементов, а также текста, введённого пользователем. Хотя обработчики событий, по всей видимости, встроенные в разметку, они собираются и реализуются с помощью делегирования событий.</p>'}},{node:{fields:{slug:"/home/examples/a-component-using-external-plugins.html"},frontmatter:{title:"Компонент, использующий внешние плагины"},html:'<p>React — гибкий и предоставляет хуки, позволяющие вам взаимодействовать с другими библиотеками и фреймворками. В этом примере используется <strong>remarkable</strong>, внешняя библиотека для работы с Markdown, чтобы преобразовать значение <code class="gatsby-code-text">&lt;textarea&gt;</code> в режиме реального времени.</p>'}}]},marketing:{edges:[{node:{frontmatter:{title:"Декларативный"},html:"<p>React делает безболезным создание интерактивных пользовательских интерфейсов. Создавайте простые представления для каждого состояния вашего приложения, и React будет эффективно обновлять и отрисовать только нужные компоненты при изменении ваших данных.</p>\n<p>Декларативные представления делают ваш код более предсказуемым и легче для отладки.</p>"}},{node:{frontmatter:{title:"Основан на компонентах"},html:"<p>Создавайте инкапсулированные компоненты, которые управляют своим состоянием, а затем компонуйте их для создания сложных пользовательских интерфейсов.</p>\n<p>Поскольку логика компонента написана на JavaScript вместо использования шаблонов, вы можете легко передавать различного типа данных через своё приложение и сохранять состояние вне DOM.</p>"}},{node:{frontmatter:{title:"Учитесь один раз — пишите где угодно"},html:'<p>Мы не строим предположений относительно остальной части вашего технологического стека, поэтому вы можете разрабатывать новые возможности в React без перезаписи существующего кода.</p>\n<p>React также может работать на сервере с помощью Node и может быть задействован на мобильных приложениях с использованием <a href="https://facebook.github.io/react-native/">React Native</a>.</p>'}}]}},pathContext:{}}}});
//# sourceMappingURL=path---index-f57ffb8b0569919f32d6.js.map