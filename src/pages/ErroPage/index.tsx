import "./styles.scss";

export function Erro() {
  return (
    <div className="over404">
      <div className="darkOverlay"></div>
      <header>
        <h1 className="glitch" data-text="404">
          404
        </h1>
      </header>
    </div>
  );
}
