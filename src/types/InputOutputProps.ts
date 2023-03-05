type sequenceType = string;

type directionsType = { forward: boolean; reverse: boolean };
type setDirectionsType = React.Dispatch<React.SetStateAction<directionsType>>;

type resultProteinType = {
  index: number;
  protein: string;
  sequence: string;
  pdbId: string | false;
};

type handleTranslateType = () => void;

type pdbIdType = string | null;
type setPdbIdType = React.Dispatch<React.SetStateAction<pdbIdType>>;

type setSequenceType = React.Dispatch<React.SetStateAction<sequenceType>>;

interface InputProps {
  sequence: sequenceType;
  directions: directionsType;
  setDirections: setDirectionsType;
  setSequence: setSequenceType;
  handleTranslate: handleTranslateType;
}

interface OutputProps {
  resultProteins: resultProteinsType;
  setPdbId: setPdbIdType;
}

export type { InputProps, OutputProps, sequenceType, directionsType, resultProteinType, pdbIdType, setPdbIdType, setSequenceType };
