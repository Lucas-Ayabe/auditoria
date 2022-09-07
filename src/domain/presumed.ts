import { compose } from "ramda";
import { percentage } from "../shared/math";

export type Billing = number;

const eightPercent = percentage(8);
const ninePercent = percentage(9);
const tenPercent = percentage(10);
const twelvePercent = percentage(12);
const fifteenPercent = percentage(15);

export const pis = percentage(0.65);
export const cofins = percentage(3);
export const irpj = (invoicing: Billing) => {
  const base = eightPercent(invoicing);
  const additional = base > 20000 ? tenPercent(base - 20000) : 0;
  return fifteenPercent(base) + additional;
};
export const csll = compose(ninePercent, twelvePercent);

export const totalValue = (invoicing: Billing) => {
  return [pis, cofins, irpj, csll]
    .map((calculate) => calculate(invoicing))
    .reduce((x, y) => x + y, 0);
};
