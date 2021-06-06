import React , {useState} from 'react'
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,Alert,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Dot from '../common/dot'

export default function ModalPopup({colorAlert,visibleAlert,responseAlert,onDismiss}) {
  return (
    <div style={{position:"fixed",top:"20px",right:"20px",zIndex:"900"}}>
      <Alert style={{marginLeft:"1em",width:"20em"}} color={colorAlert} isOpen={visibleAlert} toggle={onDismiss} fade={false}>
        {responseAlert}
      </Alert>
    </div>
  )
}