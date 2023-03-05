import { calcHydrophobicity } from './calcHydrophobicity';
import { calcIsoelectricPoint } from './calcIsoelectricPoint';
import { calcMass } from './calcMass';
import { calcExtCo } from './calcExtCo';

export const aminoAcidsTable = {
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

function getProperties(seq: string) {
  const letterCounts = countLetter(seq);
  const mass = calcMass(letterCounts, seq);
  const [Ip, charge] = calcIsoelectricPoint(letterCounts, seq);
  const [ec1, ec2] = calcExtCo(letterCounts);
  const hydrophobicity = calcHydrophobicity(letterCounts);
  const lengthCount = seq.length

  const properties = [
    { name: 'Chain length', value: lengthCount},
    { name: 'Mass', value: mass, unit: 'M⁻¹・g' },
    { name: 'Isoelectric Point', value: Ip, unit: 'pH' },
    { name: 'Charge', value: charge },
    { name: 'Molar extinction coefficient 1', value: ec1, unit: 'M⁻¹・cm⁻¹' },
    { name: 'Molar extinction coefficient 2', value: ec2, unit: 'M⁻¹・cm⁻¹' },
    { name: 'Hydrophobicity', value: hydrophobicity, unit: 'Kcal・mol ⁻¹' },
  ];

  return properties;
}

export default getProperties;
