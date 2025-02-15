import React, {useState} from 'react'
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,Button,Spinner,
  Row, Form, Label,FormText,Alert
} from "reactstrap";
import Sinput from "./Sinput";
import Toast from "./Toast";
import Dot from '../common/dot'
import { useConverter } from '../../../src/hooks'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import CommonRetraitForm from "./CommonRetraitForm";
import { useDeposit} from '../../../src/hooks';
import { useAppContext } from '../../../src/context';

export default function MtnMoneyForm({}) {
  const context = useAppContext();
  const {mutateAsync, isLoading, isError, isSuccess}  = useDeposit();
  const [usdVal, setUSDVal] = useState(0);
  const {data:dtc} = useConverter("BTC","USD");
  const [visibleAlert, setAlertVisible] = useState(false);
  const [responseAlert, setResponseAlert] = useState({});
  const onDismiss = () => setAlertVisible(false);
  const changeUSDtoBTC = (data) => {
     setUSDVal(data.target.value);
  }
  return (
    <>
        <CommonRetraitForm moyen="Numéro de téléphone MTN Money" labelRib="Numéro de téléphone MTN Money pour le retrait"/>
    </>
  )
}
