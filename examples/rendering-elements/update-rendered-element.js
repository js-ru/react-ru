function tick() {
  const element = (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
