import { aminoAcidsTable } from './peptideProperties';

export function calcHydrophobicity(counts: any[]) {
  let hydrophobicity = 7.9;
  for (const key in counts) {
    hydrophobicity += counts[key] * aminoAcidsTable[key].hydrophobicity;
  }
  hydrophobicity = hydrophobicity.toFixed(2);
  hydrophobicity = addSignum(hydrophobicity);

  return hydrophobicity;
}

export function addSignum(x: string | number) {
  if (x > 0) return `+${x}`;
  return x;
}
