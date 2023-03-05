const aminoAcidsTable = {
  A: {
    mass: 15.0234,
    pk1: 2.35,
    pk2: 9.87,
    hydrophobicity: 0.5,
  },

  R: {
    mass: 100.0873,
    pk1: 1.82,
    pk2: 8.99,
    pk3: 12.48,
    hydrophobicity: 1.81,
  },

  N: {
    mass: 58.0292,
    pk1: 2.14,
    pk2: 8.72,
    hydrophobicity: 0.85,
  },

  D: {
    mass: 59.0132,
    pk1: 1.99,
    pk2: 9.9,
    pk3: 3.9,
    hydrophobicity: 3.64,
  },

  C: {
    mass: 46.9955,
    pk1: 1.92,
    pk2: 10.7,
    pk3: 8.3,
    hydrophobicity: -0.02,
    extco: 125,
  },

  Q: {
    mass: 72.0448,
    pk1: 2.17,
    pk2: 9.13,
    hydrophobicity: 0.77,
  },

  E: {
    mass: 73.0288,
    pk1: 2.1,
    pk2: 9.47,
    pk3: 4.07,
    hydrophobicity: 3.63,
  },

  G: {
    mass: 1.0078,
    pk1: 2.35,
    pk2: 9.78,
    hydrophobicity: 1.15,
  },

  H: {
    mass: 81.0452,
    pk1: 1.8,
    pk2: 9.33,
    pk3: 6.04,
    hydrophobicity: 2.33,
  },

  I: {
    mass: 57.0702,
    pk1: 2.32,
    pk2: 9.76,
    hydrophobicity: -1.12,
  },

  L: {
    mass: 57.0702,
    pk1: 2.33,
    pk2: 9.74,
    hydrophobicity: -1.25,
  },

  K: {
    mass: 72.0811,
    pk1: 2.16,
    pk2: 9.06,
    pk3: 10.54,
    hydrophobicity: 2.8,
  },

  M: {
    mass: 75.0267,
    pk1: 2.13,
    pk2: 9.28,
    hydrophobicity: -0.67,
  },

  F: {
    mass: 91.0546,
    pk1: 2.2,
    pk2: 9.31,
    hydrophobicity: -1.71,
  },

  P: {
    mass: 41.039,
    pk1: 1.95,
    pk2: 10.64,
    hydrophobicity: 0.14,
  },

  S: {
    mass: 31.0183,
    pk1: 2.19,
    pk2: 9.21,
    hydrophobicity: 0.46,
  },

  T: {
    mass: 45.0339,
    pk1: 2.09,
    pk2: 9.1,
    hydrophobicity: 0.25,
  },

  W: {
    mass: 130.0655,
    pk1: 2.46,
    pk2: 9.41,
    hydrophobicity: -2.09,
    extco: 5500,
  },

  Y: {
    mass: 107.0495,
    pk1: 2.2,
    pk2: 9.21,
    pk3: 10.07,
    hydrophobicity: -0.71,
    extco: 1490,
  },

  V: {
    mass: 43.0546,
    pk1: 2.39,
    pk2: 9.74,
    hydrophobicity: -0.46,
  },
};

function countLetter(sequence: string) {
  const letterCounts = {};

  const lettersList = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y'];

  for (let i = 0; i < lettersList.length; i++) {
    letterCounts[lettersList[i]] = sequence.split(lettersList[i]).length - 1;
  }

  return letterCounts;
}

function calcMass(counts: any[], seq: string) {
  const alphamass = 56.0136;
  const h2o_mass = 18.0105;
  let mass = alphamass * seq.length + h2o_mass;
  for (const key in counts) {
    mass += counts[key] * aminoAcidsTable[key].mass;
  }
  mass = mass.toFixed(4);

  return mass;
}

function calcExtincionCoefficient(counts) {
  const ec2 = counts.W * aminoAcidsTable.W.extco + counts.Y * aminoAcidsTable.Y.extco;
  const ec1 = ec2 + countCysteines(counts.C) * aminoAcidsTable.C.extco;

  return [ec1, ec2];
}

function countCysteines(cysteines: number) {
  return (cysteines - (cysteines % 2)) / 2;
}

function calcIsoelectricPoint(counts: any[], sequence: string | any[]) {
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

function netCharge(acid, base, pH) {
  let charge = 0;
  for (const key in acid) {
    if (acid[key].count > 0) {
      charge += -acid[key].count / (1 + 10 ** (acid[key].pk - pH));
    }
  }

  for (const key in base) {
    if (base[key].count > 0) {
      charge += base[key].count / (1 + 10 ** (pH - base[key].pk));
    }
  }
  charge = charge.toFixed(3);
  return charge;
}

function calcHydrophobicity(counts: any[]) {
  let hydrophobicity = 7.9;
  for (const key in counts) {
    hydrophobicity += counts[key] * aminoAcidsTable[key].hydrophobicity;
  }
  hydrophobicity = hydrophobicity.toFixed(2);
  hydrophobicity = addSignum(hydrophobicity);

  return hydrophobicity;
}

function addSignum(x: string | number) {
  if (x > 0) return `+${x}`;
  return x;
}

function getProperties(seq: string) {
  const letterCounts = countLetter(seq);
  const mass = calcMass(letterCounts, seq);
  const [Ip, charge] = calcIsoelectricPoint(letterCounts, seq);
  const [ec1, ec2] = calcExtincionCoefficient(letterCounts);
  const hydrophobicity = calcHydrophobicity(letterCounts);

  const properties = [
    { name: 'Mass', value: mass, unit: 'M⁻¹g' },
    { name: 'Isoelectric Point', value: Ip, unit: 'pH' },
    { name: 'Charge', value: charge },
    { name: 'Molar extinction coefficient 1', value: ec1, unit: 'M⁻¹cm⁻¹' },
    { name: 'Molar extinction coefficient 2', value: ec2, unit: 'M⁻¹cm⁻¹' },
    { name: 'Hydrophobicity', value: hydrophobicity, unit: 'Kcal・mol ⁻¹' },
  ];

  return properties;
}

export default getProperties;
