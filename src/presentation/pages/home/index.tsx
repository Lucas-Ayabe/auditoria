import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Navegar para:</h1>
      <ul>
        <li>
          <Link to="presumed">
            Calculadora de impostos no sistema presumido
          </Link>
        </li>
        <li>
          <Link to="best-system">Calculadora de melhor sistema</Link>
        </li>
      </ul>
    </div>
  );
};
