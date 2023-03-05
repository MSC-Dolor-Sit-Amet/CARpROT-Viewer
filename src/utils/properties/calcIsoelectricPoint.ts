import { addSignum } from './calcHydrophobicity';
import { netCharge } from './netCharge';
import { aminoAcidsTable } from './peptideProperties';

export function calcIsoelectricPoint(counts: any[], sequence: string | any[]) {
  const first_res = sequence[0];
  const last_res = sequence[sequence.length - 1];
  const acids = {
    'C-term': { count: 1, pk: aminoAcidsTable[first_res].pk1 },
    D: { count: counts.D, pk: aminoAcidsTable.D.pk3 },
    E: { count: counts.E, pk: aminoAcidsTable.E.pk3 },
    C: { count: counts.C, pk: aminoAcidsTable.C.pk3 },
    Y: { count: counts.Y, pk: aminoAcidsTable.Y.pk3 },
  };

  const bases = {
    'N-term': { count: 1, pk: aminoAcidsTable[last_res].pk2 },
    K: { count: counts.K, pk: aminoAcidsTable.K.pk3 },
    R: { count: counts.R, pk: aminoAcidsTable.R.pk3 },
    H: { count: counts.H, pk: aminoAcidsTable.H.pk3 },
  };

  for (var pH = 0; pH < 13.99; pH += 0.01) {
    const charge = netCharge(acids, bases, pH);
    if (charge <= 0) break;
  }

  const Ip = pH.toFixed(2);
  let charge = Math.round(netCharge(acids, bases, 7));
  charge = addSignum(charge);

  return [Ip, charge];
}
