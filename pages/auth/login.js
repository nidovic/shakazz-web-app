import React, {useRef, useState} from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../services/auth.service'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
} from "reactstrap";
// layout for this page
import Auth from "../../layouts/Auth.js";
import Sinput from "../../components/forms/Sinput";
import Captcha from "../../components/Captcha";
import { loginSchema } from "../../validations";


function Login() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const recaptchaRef = useRef();
  const [show, setShow] = useState(false);
  const [verified, setVerified]= useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errormsg, setErrormsg]= useState(null);
  const [successmsg, setSuccessmsg]= useState(null);
  const handleToggleshow = () => setShow(!show);
  const executeCaptcha = () => setVerified(!verified);
  const onSubmit = async (data)  => {
    console.log("submit");
     let userdata;
    if(verified){
      setSubmitting(true);
    const { password, userName } = data;
    userdata = {password, userName }
   try{
       let datares = await login(userdata);
       console.log('login data',datares);
       const { data, error, success, message } = datares;
       if(error && !success){
        setSuccessmsg(null);
        setErrormsg(message);
       
       } else {
         setErrormsg(null);
         setSuccessmsg(message);
         router.push('/portal/dashboard');
       }
       
       console.log("data", data);  

   }catch(err){
        console.log("error", err);
   }
   } else {
     alert("Vous  n'êtes pas humain")
   }
  };
  return (
    <>
      <Row>
        <Card className="bg-white container border-0" style={{minWidth:'100%'}}>
          <CardHeader className="bg-transparent px-lg-5 ">
        
            <div className="text-muted mt-2 mb-1">
              <h2 style={{marginBottom:'0px'}} className="text-md-right mb-md-4">Inscription</h2>
              
              <a style={{font: 'normal normal bold 42px/48px Ubuntu', color: '#121212'}} onClick={(e) => e.preventDefault()}>
                  Hi, welcome back
                </a>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-2">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form" onSubmit={handleSubmit(onSubmit)} >
            <Sinput
              label="Nom d'utilisateur"
              icon="far fa-user"
              placeholder="Nom d'utilisateur"
              type="text"
              register={register}
              name="userName"
              append
            />
             {errors.userName && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.userName.message}</span>
               
              </div> }
            <Sinput
              label="Mot de passe"
              icon="fa fa-user"
              placeholder="Entrer votre mot de passe"
              type={show?"text":"password"}
              register={register}
              name="password"
              icon={show ? "fa fa-eye":"fa fa-eye-slash"}
              handleToggleshow={handleToggleshow }
              append
            />
               {errors.password && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.password.message}</span>
               
              </div> }
              <div className="text-right ">
               <a
                    href="/auth/forgotPassword"
                    onClick={(e) => router.prefetch('/auth/forgotPassword')
                    }
                  >
                  <span className="text-muted">Mot de passe oublié?</span>
                </a>
              </div>
              
             <Captcha recaptchaRef={recaptchaRef} onChange={executeCaptcha}/>
             
              <div className="text-center" >
                  {errormsg && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errormsg}</span>
               
              </div> }
              {successmsg && <div className="text-muted font-italic">
                
                  <span className="text-success font-weight-700">{successmsg}</span>
               
              </div> }
                <Button className="mt-3 mb-1"  type="submit" style={{width:'50%', backgroundColor:'#679966', borderColor:'#679966'}} >
                  S'identifier
                </Button>
                <div>
                  <a
                    href="/auth/register"
                    onClick={(e) => e.preventDefault()}
                  >
                    <small>Vous n'avez pas encore de compte?</small>
                  </a>{" "}
                  <a
                    href="/auth/register" 
                  >
                    <small className="text-bold font-weight-bold ml-1" >S'inscrire</small>
                  </a>
                
             </div>
              </div>
              
            </Form>
          </CardBody>
        </Card>
        
      </Row>
    </>
  );
}

Login.layout = Auth;

export default Login;
