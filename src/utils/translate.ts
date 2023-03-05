import * as codonsDict from './codons.json';
import { DirectionsType } from '../types/InputOutputProps';
import getProteinName from './api';
import getPeptideImage from './images';

interface CodonsDictType {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const DNAToAminoAcids = (newSequence: string) => {
  // join every 3 codon positions for 3 variants
  const codons: { [key: string]: string[][] } = {};
  for (let i = 0; i < 3; i += 1) {
    codons[String(i)] = [];
    const splitSequence = newSequence.split('').splice(i);
    for (let j = 0; j < splitSequence.length; j += 3) {
      const three = [splitSequence[j], splitSequence[j + 1], splitSequence[j + 2]];
      codons[String(i)].push(three);
    }
  }

  // translate codons to amino acids
  const aminoAcids: string[] = [];

  Object.values(codons).forEach(codon =>
    aminoAcids.push(codon.map(value => (codonsDict as CodonsDictType)?.[value[0]]?.[value[1]]?.[value[2]]).join('')),
  );

  return aminoAcids;
};

const aminoAcidsToPeptides = (aminoAcids: string[]) => {
  const peptides: string[] = [];

  aminoAcids.forEach(i => {
    const peptide = i.match(/M.*?(?=-)/g); // regex match sequences between 'M' (including) and '-' (excluding)
    if (peptide) {
      // add to peptides array
      peptides.push(...peptide);
    }
  });

  return peptides;
};

const translate = (sequence: string, direction: DirectionsType) => {
  const newSequence = sequence
    // remove line breaks
    .replace(/(\r\n|\n|\r)/gm, '')
    // split into array
    .split('')
    // convert to uppercase
    .map(char => char.toUpperCase())
    // replace thymine with uracil
    .map(val => (val === 'T' ? 'U' : val))
    // join back into string
    .join('');

  const aminoAcids: string[] = [];

  if (direction.forward) {
    aminoAcids.push(...DNAToAminoAcids(newSequence));
  }
  if (direction.reverse) {
    // run translation on reversed sequence
    aminoAcids.push(
      ...DNAToAminoAcids(
        newSequence
          .split('')
          .reverse()
          .join('')
          // some stackoverflow magic to switch A-U and C-G
          // https://stackoverflow.com/questions/10726638/how-do-you-map-replace-characters-in-javascript-similar-to-the-tr-function-in
          .replace(/[AUCG]/g, m => {
            return {
              A: 'U',
              U: 'A',
              C: 'G',
              G: 'C',
            }[m];
          }),
      ),
    );
  }

  const peptides = aminoAcidsToPeptides(aminoAcids);

  const proteins: Promise<string>[] = peptides.map(peptide => {
    return getProteinName(peptide); // substitute peptides for proteins
  });

  const images = peptides.map(peptide => getPeptideImage(peptide));

  return [peptides, proteins, images];
};

export default translate;
