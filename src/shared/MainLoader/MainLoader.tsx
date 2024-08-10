import './MainLoader.css';

export const MainLoader = () => {
  return (
    <section className="loader-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
