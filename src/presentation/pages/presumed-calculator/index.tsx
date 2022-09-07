import { usePresumedCalculator } from "./use-presumed-calculator";

const propTitleStyle = { fontSize: "0.85rem", fontWeight: "normal" };

export const PresumedCalculator = () => {
  const { baseValueRef, operationalExpensesRef, calculateExpanses, expanses } =
    usePresumedCalculator();

  return (
    <div className="grid" style={{ alignItems: "flex-start" }}>
      <form>
        <label>
          <span>Faturamento bruto (R$)</span>
          <input ref={baseValueRef} type="number" />
        </label>

        <label>
          <span>Despesas operacionais (R$)</span>
          <input ref={operationalExpensesRef} type="number" />
        </label>

        <button type="button" onClick={calculateExpanses}>
          Calcular
        </button>
      </form>

      <article>
        <header>
          <h2>
            <small style={propTitleStyle}>Faturamento</small>
            <div>{expanses.billing}</div>
          </h2>
        </header>
        <section style={{ marginBottom: 0 }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1em" }}>Impostos</h3>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "1em" }}
          >
            <div className="column">
              <span style={propTitleStyle}>PIS</span>
              <strong>{expanses.pis}</strong>
            </div>
            <div className="column">
              <span style={propTitleStyle}>COFINS</span>
              <strong>{expanses.cofins}</strong>
            </div>
            <div className="column">
              <span style={propTitleStyle}>IRPJ</span>
              <strong>{expanses.irpj}</strong>
            </div>
            <div className="column">
              <span style={propTitleStyle}>CSLL</span>
              <strong>{expanses.csll}</strong>
            </div>
            <div className="column--large" style={{ gridColumn: "span 2" }}>
              <span style={propTitleStyle}>Total</span>
              <strong>{expanses.total}</strong>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
