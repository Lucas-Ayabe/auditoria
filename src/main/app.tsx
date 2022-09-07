import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../presentation/components";
import * as Pages from "../presentation/pages";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Home />} />
          <Route path="presumed" element={<Pages.PresumedCalculator />} />
          <Route path="best-system" element={<Pages.BestSystem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
