import { map } from "ramda";
import { useRef, useState } from "react";
import { cofins, csll, irpj, pis, totalValue } from "../../../domain/presumed";
import { mapObject } from "../../../shared/utils";

const toBrl = (x: number) => {
  return x.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
};

export const usePresumedCalculator = () => {
  const baseValueRef = useRef<HTMLInputElement>(null);
  const operationalExpensesRef = useRef<HTMLInputElement>(null);

  const [expanses, setExpanses] = useState({
    billing: 0,
    pis: 0,
    cofins: 0,
    irpj: 0,
    csll: 0,
    total: 0,
  });

  const formattedExpanses = mapObject<typeof expanses, string>(toBrl)(expanses);

  const calculateExpanses = () => {
    const baseValue = baseValueRef.current?.valueAsNumber;
    const operationalExpenses = operationalExpensesRef.current?.valueAsNumber;

    if (baseValue && operationalExpenses) {
      const sixtyPercentOfTheBilling = baseValue + operationalExpenses;
      const billing = (100 * sixtyPercentOfTheBilling) / 60;

      setExpanses({
        billing,
        pis: pis(billing),
        cofins: cofins(billing),
        irpj: irpj(billing),
        csll: csll(billing),
        total: totalValue(billing),
      });
    }
  };

  return {
    expanses: formattedExpanses,
    calculateExpanses,
    baseValueRef,
    operationalExpensesRef,
  };
};
