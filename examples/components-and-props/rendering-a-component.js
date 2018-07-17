function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

const element = <Welcome name="Сара" />;
ReactDOM.render(element, document.getElementById('root'));
