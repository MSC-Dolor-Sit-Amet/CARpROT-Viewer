import * as codonsDict from './codons.json';
import InputOutputProps from '../types/InputOutputProps';

interface CodonsDictType {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const convertToAminoAcids = newSequence => {
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

const translate = (sequence: string, direction: InputOutputProps['directions'], method: InputOutputProps['method']) => {
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

  let aminoAcids: string[] = [];

  if (direction.forward) {
    aminoAcids = aminoAcids.concat(convertToAminoAcids(newSequence));
  }
  if (direction.reverse) {
    // run translation on reversed sequence
    aminoAcids = aminoAcids.concat(convertToAminoAcids(newSequence.split('').reverse().join('')));
  }

  return aminoAcids;
};

export default translate;
