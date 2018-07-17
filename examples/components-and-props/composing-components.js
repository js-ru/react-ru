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

ReactDOM.render(<App />, document.getElementById('root'));
