type sequenceType = string;

type directionsType = { forward: boolean; reverse: boolean };
type setDirectionsType = React.Dispatch<React.SetStateAction<directionsType>>;

type resultProteinsType = string[];

type handleSequenceChangeType = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

type handleTranslateType = () => void;

type selectedProteinIndexType = number;
type setSelectedProteinIndexType = React.Dispatch<React.SetStateAction<selectedProteinIndexType>>;

interface InputProps {
  sequence: sequenceType;
  directions: directionsType;
  setDirections: setDirectionsType;
  handleSequenceChange: handleSequenceChangeType;
  handleTranslate: handleTranslateType;
}

interface OutputProps {
  resultProteins: resultProteinsType;
  selectedProteinIndex: selectedProteinIndexType;
  setSelectedProteinIndex: setSelectedProteinIndexType;
}

export type { InputProps, OutputProps, sequenceType, directionsType, resultProteinsType };
