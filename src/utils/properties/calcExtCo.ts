import { aminoAcidsTable } from './peptideProperties';

export function calcExtCo(counts) {
  const ec2 = counts.W * aminoAcidsTable.W.extco + counts.Y * aminoAcidsTable.Y.extco;
  const ec1 = ec2 + countCysteines(counts.C) * aminoAcidsTable.C.extco;

  return [ec1, ec2];
}

export function countCysteines(cysteines: number) {
  return (cysteines - (cysteines % 2)) / 2;
}
