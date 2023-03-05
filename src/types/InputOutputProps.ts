type SequenceType = string;

type DirectionsType = { forward: boolean; reverse: boolean };
type SetDirectionsType = React.Dispatch<React.SetStateAction<DirectionsType>>;

type ResultProteinType = {
  index: number;
  protein: string;
  sequence: string;
  pdbId: string | false;
};

type HandleTranslateType = () => void;

type PdbIdType = string | null;
type SetPdbIdType = React.Dispatch<React.SetStateAction<PdbIdType>>;

type SetSequenceType = React.Dispatch<React.SetStateAction<SequenceType>>;

interface InputProps {
  sequence: SequenceType;
  directions: DirectionsType;
  setDirections: SetDirectionsType;
  setSequence: SetSequenceType;
  handleTranslate: HandleTranslateType;
}

interface OutputProps {
  resultProteins: ResultProteinType;
  setPdbId: SetPdbIdType;
}

export type { InputProps, OutputProps, SequenceType, DirectionsType, ResultProteinType, PdbIdType, SetPdbIdType, SetSequenceType };
