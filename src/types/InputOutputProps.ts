interface InputOutputProps {
  sequence: string;
  setSequence: React.Dispatch<React.SetStateAction<string>>;
  directions: { forward: boolean; reverse: boolean };
  setDirections: React.Dispatch<React.SetStateAction<{ forward: boolean; reverse: boolean }>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  resultSequences: string[];
  setResultSequences: React.Dispatch<React.SetStateAction<string[]>>;
  handleSequenceChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTranslate: () => void;
}

export default InputOutputProps;
