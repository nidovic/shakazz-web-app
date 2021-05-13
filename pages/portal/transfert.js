import React, {useState} from 'react';
import AdminBleu from '../../src/layouts/AdminBleu';
import {
  Row,
  Col,
  Button,
  Form,
  Spinner,
} from "reactstrap"
import Sinput from "../../src/components/forms/Sinput";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import  LightBoxContainer from '../../src/components/common/lightBoxContainer';
import withAuth from '../../src/hoc/withAuth';
import { useAppContext } from '../../src/context';
import { useTransfertExterne, useTransfertInterne ,useWallets} from '../../src/hooks';
import { CheckUser } from '../../src/services';
import {constantes} from '../../src/config';




function Transfert() {
const INTERNE = "Interne";
const EXTERNE = "Externe";
const NETWORKING = "Wallet Networking";
const VAULT = "Wallet Vault";
const TRANSFERT= "Wallet Transfert";
const PRINCIPAL = "Wallet Principal";
const optionstype = [INTERNE,EXTERNE];

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver({}),
  });
  const context = useAppContext();
  const [show, setShow] = useState(false);
  const [token,setToken] = useState(context.appState.accessToken)
  const [selectedType, setType] = useState("")
  const [destinationOption, setDestinationOption] = useState([PRINCIPAL]);
  const [montant, setMontant]= useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserID] = useState("");
  const [isAuser, setIsAUser] = useState(false);
  const [sourceOption, setSourceOption] = useState([NETWORKING, VAULT]);
  const [selectedSource, setSelectedSource]= useState("")
  const [dOp, setD] = useState("");
  const [sOP, setS] = useState("");
  const [submitting , setSubmitting ] = useState(false);
  const { mutateAsync:em, isLoading:eml } = useTransfertExterne();
  const {mutateAsync:im, isLoading:iml } = useTransfertInterne();
  const {data:dw, isLoading:idw} = useWallets(context.appState.accessToken);
  const onSubmit = async (data) => {
     setSubmitting(true)
    if(selectedType === INTERNE){
      if(!selectedSource && !sOP && !dOp){
        setSubmitting(false);
        alert("Champs invalides");
      }
      const body = {
      data: {
        wr : {

            amount: parseInt(montant),
            type: selectedSource,
        }
      }
    };
     const res = await im({accessToken: token ,data:body});
      if(res.error && !res.success){
        setSubmitting(false)
        alert(`${res.message}`);
        return;
      }
        console.log("im res",res, body);
      setSubmitting(false)
      alert(`${res.message}`);
      return;
    } else if(selectedType === EXTERNE){
       if(!userId && !montant){
         setSubmitting(false);
        alert("Champs invalides");
      }
      const body = {
      data: {
        user : {
            id : userId,
        },
        wr: {
          amount: parseInt(montant),
        }
      }
    };
    const res = await em({accessToken: token ,data:body});
    if(res.error && !res.success){
        setSubmitting(false)
        alert(`${res.message}`);
        return;
      }
     console.log("em res",res, body);
      setSubmitting(false)
      alert(`${res.message}`);
        return;

    }
    console.log("transfer", data);
  };
   const handleToggleshow = () => setShow(!show);
   const handleOnSelectTypeTransfer = (type) => {
      console.log("type transfert", type)
      if(type.value === INTERNE){
          let s = [NETWORKING, VAULT];
          let d = [PRINCIPAL];
           setType(INTERNE)
           setSourceOption(s);
           setDestinationOption(d);
      } else if(type.value === EXTERNE){
             let s = [PRINCIPAL];
             let d = [TRANSFERT];
             setType(EXTERNE);
             setSourceOption(s);
             setDestinationOption(d);

      }
   }
    const handleOnSelectWalletRetrait = (option) =>{
       setSelectedSource(option.value.split(" ")[1].toLowerCase());
     setS(option.value)
   }
    const handleOnSelectWalletReception = (option) =>{

      setD(option.value)

   }
   const changeMontant = (event) => {
     console.log("montant", event.target.value);
       setMontant(event.target.value)
   }
   const pseudoChange = async (event) => {
     console.log("check user 1", event.target.value);
     setUsername(event.target.value);
     const res = await CheckUser(token, event.target.value);
     console.log("check user", res, event.target.value);
     const { data } = res;
     if(data.used && data.userId){
        setUserID(data.userId);
     } else {
       setUserID('');
     }

   }
   const defaultOption = selectedType;
   const defautOptionS = sOP;
   const defautOptionD = dOp;
   const wp = dw?.data.wallets.filter((item)=> item.type === constantes.wallets.p) ;
   const wv = dw?.data.wallets.filter((item)=> item.type === constantes.wallets.v) ;
   const wn = dw?.data.wallets.filter((item)=> item.type === constantes.wallets.n) ;
  return (
    <AdminBleu>
    <div>
      <h1 style={{font: 'normal normal italic 30px/35px Ubuntu', color: "#fff"}}> Effectuer un transfére</h1>
      <Row className="mt-4 justify-content-between">
        <Col xl="9">
           <Form role="form" >
              <Sinput
                label="Type de transfert"
                name="typeTransfert"
                inline
                options={optionstype}
                defaultOption={defaultOption}
                placeholder="Choisir le type de tranfert"
                dd
                register={register}
                onSelect={handleOnSelectTypeTransfer}
              />
            { (selectedType === INTERNE || selectedType === "") ? (
                <>

              <Sinput
                label="Choisir le wallet de retrait"
                name="wallet"
                inline
                options={sourceOption}
                defaultOption={defautOptionS}
                placeholder="Choix du Wallet"
                dd
                register={register}
                onSelect={handleOnSelectWalletRetrait}
              />
                <Sinput
                label="Montant"
                name="montant"
                placeholder="Entrez le montant"
                type="text"
                register={register}
                inputBg="#679966"
                inline
                handleOnchange={changeMontant}
                inputvalue={montant}
                usd
              />
               <Sinput
                label="Choisir le wallet de reception"
                name="wallet"
                inline
                options={destinationOption}
                defaultOption={defautOptionD}
                placeholder="Choix du Wallet"
                dd
                register={register}
                onSelect={handleOnSelectWalletReception}
              />
                </>
            ): (
              <>
              <Sinput
                label="pseudo du destinataire"
                name="user"
                placeholder="username"
                type="text"
                register={register}
                inputBg="#679966"
                inputvalue={username}
                handleOnchange={pseudoChange}
                inline

              />
               { userId ? ( <div className="text-muted font-italic">

                  <span className="text-success font-weight-700">L'utilisateur Existe</span>

              </div>) : ( <div className="text-muted font-italic">

                  <span className="text-danger font-weight-700">Utilisateur Inconnu</span>

              </div>) }

                <Sinput
                label="Montant"
                name="montant"
                placeholder="Entrez le montant"
                type="text"
                register={register}
                inputBg="#679966"
                inline
                handleOnchange={changeMontant}
                inputvalue={montant}
                usd
              />
              </>
            )}

              <Row>
                 <Col xl="3"></Col>
                 <Col xl="6">
                   <Button disabled={submitting} className="mt-3 mb-1" onClick={onSubmit} style={{ backgroundColor:'#CC9933', borderColor:'#CC9933'}} >
                  {submitting ? <Spinner size="sm" color="#cc993a" />: "Confirmer"}
                </Button>
                 </Col>
              </Row>
           </Form>
        </Col>
        <Col className="d-flex  align-items-center" xl="3" style={{flexDirection: 'column'}}>
         <h4 className="pb-3 "  style={{font: 'normal normal italic 18px/19px Ubuntu', color: "#fff"}}>Montant disponible</h4>
         <LightBoxContainer borderR="20px" width="180px">
          <div className="d-flex justify-content-center align-items-center pt-2 pb-2" style={{flexDirection: 'column'}}>
             <h2 style={{font: 'normal normal italic 16px/18px Ubuntu', color: '#444'}} >Wallet principal</h2>
              {idw?"...":(<h1 className="" style={{font: 'normal normal normal 20px/25px Ubuntu',display: 'block',color: '#679966',  lineHeight: '1.2'}}> {(wp[0]?.montantUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD',})}</h1>)}
          </div>
         </LightBoxContainer>
         <LightBoxContainer borderR="20px" width="180px">
          <div className="d-flex justify-content-center align-items-center pt-2 pb-2" style={{flexDirection: 'column'}}>
             <h2 style={{font: 'normal normal italic 16px/18px Ubuntu', color: '#444'}} >Wallet vault</h2>
              {idw?"...":(<h1 className="" style={{font: 'normal normal normal 20px/25px Ubuntu',display: 'block',color: '#679966',  lineHeight: '1.2'}}> {(wv[0]?.montantUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD',})}</h1>)}
          </div>
         </LightBoxContainer>
          <LightBoxContainer borderR="20px" width="180px">
          <div className="d-flex justify-content-center align-items-center pt-2 pb-2" style={{flexDirection: 'column'}}>
             <h2 style={{font: 'normal normal italic 16px/18px Ubuntu', color: '#444'}} >Wallet networking</h2>
              {idw?"...":(<h1 className="" style={{font: 'normal normal normal 20px/25px Ubuntu',display: 'block',color: '#679966',  lineHeight: '1.2'}}> {(wn[0]?.montantUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD',})}</h1>)}
          </div>
         </LightBoxContainer>

        </Col>
      </Row>
    </div>
    </AdminBleu>
  )
}



export default withAuth(Transfert);
