import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '../Button';
import Input from '../Input';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface ModalProps {
    open: boolean;
    onClose: React.MouseEventHandler<HTMLElement>;
}

export const SimpleModal: React.FC<ModalProps> = ({open, onClose}) => {
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className="modal-component">
        <form>
            <Input label="Nome" type="text" name="name" required={true}/>
            <Input label="Cargo" type="text" name="name" required={true}/>
            <Button name="Salvar" type="submit"/>
        </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}