import { sum } from "ramda";
import { percentage } from "../shared/math";
import { uncurriedMapObject as mapObject } from "../shared/utils";
import { Billing } from "./presumed";

export type Credit = number;
export type Debit = Billing;

export const pliers = {
  pis: percentage(1.65),
  cofins: percentage(7.6),
  icms: percentage(18),
};

const tax = (plier: (n: number) => number) => {
  return (credit: Credit, debit: Debit): [number, number] => {
    const [c, d] = [credit, debit].map(plier);
    if (c < d) return [0, d - c];
    return [c - d, 0];
  };
};

const taxes = mapObject(tax, pliers);
export const { pis, cofins, icms } = taxes;
export const totalValue = (credit: Credit, debit: Debit): [number, number] => {
  const [pisExtras, pis] = taxes.pis(credit, debit);
  const [cofinsExtras, cofins] = taxes.cofins(credit, debit);
  const [icmsExtras, icms] = taxes.icms(credit, debit);

  const totalExtras = sum([pisExtras, cofinsExtras, icmsExtras]);
  const totalTaxes = sum([pis, cofins, icms]);
  return [totalExtras, totalTaxes];
};
