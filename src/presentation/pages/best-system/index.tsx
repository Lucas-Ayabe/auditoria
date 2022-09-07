import { Show } from "../../components";
import "./styles.css";
import { useBestSystem } from "./use-best-system";

export const BestSystem = () => {
  const viewModel = useBestSystem();

  return (
    <div className="grid">
      <form onSubmit={viewModel.calculate}>
        <label htmlFor="credit">
          <span>Crédito (R$)</span>
          <input step={0.1} ref={viewModel.creditRef} type="number" />
        </label>

        <label htmlFor="credit">
          <span>Débito (R$)</span>
          <input step={0.1} ref={viewModel.debitRef} type="number" />
        </label>

        <button>Calcular</button>
      </form>
      <article className="results">
        <Show on={!viewModel.results.show}>
          <div className="fade-in">
            <h2 className="info-title">Instruções</h2>
            <p>
              Para calcular qual o melhor sistema tributário preencha os campos
              do formulário e depois clique no botão calcular.
            </p>
          </div>
        </Show>
        <Show on={viewModel.results.show}>
          <div className="fade-in">
            <h2 className="winner-title">
              O melhor sistema é o <br />
              <strong>{viewModel.bestSystem}</strong>
            </h2>

            <figure>
              <table className="comparative-table">
                <caption className="detail-section-title">Detalhes</caption>

                <thead>
                  <tr>
                    <th scope="">#</th>
                    <th scope="col">Presumido</th>
                    <th scope="col">Real</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row">PIS</th>
                    <td>{viewModel.results.presumed.pis.formated}</td>
                    <td>{viewModel.results.real.pis.formated}</td>
                  </tr>
                  <tr>
                    <th scope="row">COFINS</th>
                    <td>{viewModel.results.presumed.cofins.formated}</td>
                    <td>{viewModel.results.real.cofins.formated}</td>
                  </tr>
                  <tr>
                    <th scope="row">ICMS</th>
                    <td>{viewModel.results.presumed.icms.formated}</td>
                    <td>{viewModel.results.real.icms.formated}</td>
                  </tr>
                  <tr>
                    <th scope="row">TOTAL</th>
                    <td>{viewModel.results.presumed.total.formated}</td>
                    <td>{viewModel.results.real.total.formated}</td>
                  </tr>
                </tbody>
              </table>
            </figure>
          </div>
        </Show>
      </article>
    </div>
  );
};
