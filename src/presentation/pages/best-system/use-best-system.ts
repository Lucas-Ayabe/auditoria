import React, { useRef, useState } from "react";
import {
  calculateRealTaxes,
  calculatePresumedTaxes,
} from "../../../interactors";
import {
  formatToBrl,
  uncurriedMapObject as mapObject,
} from "../../../shared/utils";

export const useBestSystem = () => {
  const creditRef = useRef<HTMLInputElement>(null);
  const debitRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState({
    presumed: {
      pis: { formated: "", value: 0 },
      cofins: { formated: "", value: 0 },
      icms: { formated: "", value: 0 },
      total: { formated: "", value: 0 },
    },
    real: {
      pis: { formated: "", value: 0 },
      cofins: { formated: "", value: 0 },
      icms: { formated: "", value: 0 },
      total: { formated: "", value: 0 },
    },
    show: false,
  });

  const calculate = (event: React.FormEvent) => {
    event.preventDefault();

    const credit = creditRef.current?.valueAsNumber ?? 0;
    const debit = debitRef.current?.valueAsNumber ?? 0;

    const { pis, cofins } = mapObject((value) => {
      return {
        value,
        formated: formatToBrl(value),
      };
    }, calculatePresumedTaxes(debit));

    const realResults = mapObject(([extras, taxes]) => {
      if (taxes !== 0)
        return {
          value: taxes,
          formated: formatToBrl(taxes),
        };

      return {
        value: 0,
        formated: `${formatToBrl(0)} (A recolher: ${formatToBrl(extras)})`,
      };
    }, calculateRealTaxes(credit, debit));

    setResults({
      presumed: {
        pis,
        cofins,
        icms: {
          value: realResults.icms.value,
          formated: formatToBrl(realResults.icms.value),
        },
        total: {
          value: pis.value + cofins.value + realResults.icms.value,
          formated: formatToBrl(
            pis.value + cofins.value + realResults.icms.value
          ),
        },
      },
      real: realResults,
      show: true,
    });
  };

  console.log(
    results.presumed.total.value,
    results.real.total.value,
    results.presumed.total.value < results.real.total.value
  );

  return {
    creditRef,
    debitRef,
    calculate,
    results,
    bestSystem:
      results.presumed.total.value < results.real.total.value
        ? "Presumido"
        : "Real",
  };
};
