import { CalculatePresumedTaxesUseCase as Interactor } from ".";
import { cofins, csll, irpj, pis, totalValue } from "../../domain/presumed";

export const calculatePresumedTaxes: Interactor = (billing) => ({
  billing,
  pis: pis(billing),
  cofins: cofins(billing),
  irpj: irpj(billing),
  csll: csll(billing),
  total: totalValue(billing),
});
