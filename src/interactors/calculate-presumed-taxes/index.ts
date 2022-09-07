import { Billing } from "../../domain/presumed";

export type CalculatePresumedTaxesUseCase = (billing: Billing) => {
  billing: number;
  pis: number;
  cofins: number;
  irpj: number;
  csll: number;
  total: number;
};

export * from "./calculate-presumed-taxes.interactor";
