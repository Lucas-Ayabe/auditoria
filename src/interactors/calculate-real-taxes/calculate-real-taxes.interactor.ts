import { cofins, icms, pis, totalValue } from "../../domain/real";
import { CalculateRealTaxesUseCase as Interactor } from "./index";

export const calculateRealTaxes: Interactor = (credit, debit) => ({
  pis: pis(credit, debit),
  cofins: cofins(credit, debit),
  icms: icms(credit, debit),
  total: totalValue(credit, debit),
});
