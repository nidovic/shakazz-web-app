import React , {useState} from 'react'
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Dot from '../common/dot'

export default function ModalPopup({isActive}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
     <Button color="danger" onClick={toggle}>Label</Button>
     <Modal isOpen={modal} toggle={toggle} className="">
       <ModalHeader toggle={toggle}>Modal title</ModalHeader>
       <ModalBody>
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
         <Button color="secondary" onClick={toggle}>Cancel</Button>
       </ModalFooter>
     </Modal>
   </div>
  )
}
