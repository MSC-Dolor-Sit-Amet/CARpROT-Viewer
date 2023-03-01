type sequenceType = string;

type directionsType = { forward: boolean; reverse: boolean };
type setDirectionsType = React.Dispatch<React.SetStateAction<directionsType>>;

type resultProteinsType = string[];

type handleSequenceChangeType = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

type handleTranslateType = () => void;

type pdbIdType = string | null;
type setPdbIdType = React.Dispatch<React.SetStateAction<pdbIdType>>;

interface InputProps {
  sequence: sequenceType;
  directions: directionsType;
  setDirections: setDirectionsType;
  handleSequenceChange: handleSequenceChangeType;
  handleTranslate: handleTranslateType;
}

interface OutputProps {
  resultProteins: resultProteinsType;
  setPdbId: setPdbIdType;
}

export type { InputProps, OutputProps, sequenceType, directionsType, resultProteinsType, pdbIdType, setPdbIdType };
