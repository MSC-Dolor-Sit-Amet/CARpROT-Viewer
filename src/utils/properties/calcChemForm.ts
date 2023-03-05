/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export default function calcChemForm(counts: { [key: string]: string }[]) {
  const aminoAcidsElements = {
    A: {
      C: 3,
      H: 5,
      N: 1,
      O: 1,
      S: 0,
    },

    R: {
      C: 6,
      H: 12,
      N: 4,
      O: 1,
      S: 0,
    },

    N: {
      C: 4,
      H: 6,
      N: 2,
      O: 2,
      S: 0,
    },

    D: {
      C: 4,
      H: 5,
      N: 1,
      O: 3,
      S: 0,
    },

    C: {
      C: 3,
      H: 5,
      N: 1,
      O: 1,
      S: 1,
    },

    Q: {
      C: 5,
      H: 8,
      N: 2,
      O: 2,
      S: 0,
    },

    E: {
      C: 5,
      H: 7,
      N: 1,
      O: 3,
      S: 0,
    },

    G: {
      C: 2,
      H: 3,
      N: 1,
      O: 1,
      S: 0,
    },

    H: {
      C: 6,
      H: 7,
      N: 3,
      O: 1,
      S: 0,
    },

    I: {
      C: 6,
      H: 11,
      N: 1,
      O: 1,
      S: 0,
    },

    L: {
      C: 6,
      H: 11,
      N: 1,
      O: 1,
      S: 0,
    },

    K: {
      C: 6,
      H: 12,
      N: 2,
      O: 1,
      S: 0,
    },

    M: {
      C: 5,
      H: 9,
      N: 1,
      O: 1,
      S: 1,
    },

    F: {
      C: 9,
      H: 9,
      N: 1,
      O: 1,
      S: 0,
    },

    P: {
      C: 5,
      H: 7,
      N: 1,
      O: 1,
      S: 0,
    },

    S: {
      C: 3,
      H: 5,
      N: 1,
      O: 2,
      S: 0,
    },

    T: {
      C: 4,
      H: 7,
      N: 1,
      O: 2,
      S: 0,
    },

    W: {
      C: 11,
      H: 10,
      N: 2,
      O: 1,
      S: 0,
    },

    Y: {
      C: 9,
      H: 9,
      N: 1,
      O: 2,
      S: 0,
    },

    V: {
      C: 5,
      H: 9,
      N: 1,
      O: 1,
      S: 0,
    },
  };
  // H:2 and O:1 account for additional water molecule (H₂O) present in all peptides
  const elementsCounter: object = {
    C: 0,
    H: 2,
    N: 0,
    O: 1,
    S: 0,
  };

  // Function used for final formating of elementsCounter to chemical notation, for example C₇₁₃H₁₀₉₉N₁₉₉O₂₀₇S₁₅
  function formatFormula(formula: object) {
    let outputFormula = '';
    for (const element in elementsCounter) {
      outputFormula += element;
      for (const digit in String(elementsCounter[element])) {
        outputFormula += String.fromCharCode(`0x208${String(elementsCounter[element])[digit]}`);
      }
    }
    return outputFormula;
  }

  for (const key in aminoAcidsElements) {
    for (const element in elementsCounter) {
      elementsCounter[element] += aminoAcidsElements[key][element] * counts[key];
    }
  }

  return formatFormula(elementsCounter);
}
