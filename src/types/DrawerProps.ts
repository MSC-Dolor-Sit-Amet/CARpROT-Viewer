type isOpenType = boolean;
type onCloseType = () => void;
type btnRefType = React.RefObject<HTMLButtonElement>;

interface DrawerProps {
  isOpen: isOpenType;
  onClose: onCloseType;
  btnRef: btnRefType;
}

export default DrawerProps;
