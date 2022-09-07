import { Credit, Debit } from "../../domain/real";

type ExtraValue = number;
type TaxValue = number;

export type CalculateRealTaxesUseCase = (
  credit: Credit,
  debit: Debit
) => {
  pis: [ExtraValue, TaxValue];
  cofins: [ExtraValue, TaxValue];
  icms: [ExtraValue, TaxValue];
  total: [ExtraValue, TaxValue];
};

export * from "./calculate-real-taxes.interactor";
