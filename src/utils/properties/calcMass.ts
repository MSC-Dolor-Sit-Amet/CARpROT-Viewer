import { aminoAcidsTable } from './peptideProperties';

export function calcMass(counts: any[], seq: string) {
  const alphamass = 56.0136;
  const h2o_mass = 18.0105;
  let mass = alphamass * seq.length + h2o_mass;
  for (const key in counts) {
    mass += counts[key] * aminoAcidsTable[key].mass;
  }
  mass = mass.toFixed(4);

  return mass;
}
