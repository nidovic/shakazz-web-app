import React, {useState, useEffect} from 'react'
import { Row , Col, Container, Form, Button} from 'reactstrap';
import Portal from "../../layouts/Portal.js";
import Sinput from "../../components/forms/Sinput"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { legacySchema } from "../../validations";
import LinearProgress from "../../components/common/linearProgress"
import Image from 'next/image'
import Line from '../../components/common/line'

function Legacy() {
   const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(legacySchema),
  });
  const [legacies, setLegacies] = useState([]);
  const [percentage, setPercentage] = useState();

   const onSubmit = (data) =>{
     if(legacies.length >= 1){
        let sumper = legacies.reduce( function(a, b){
        return a + b['pourcentageHeritage'];
    }, 0);
        if(sumper === 100){
          alert("la somme doit etre egal a cent ")
        }
        console.log("sumper ", sumper);
        return;
     }
     let ldata = [...legacies,data]
      setLegacies(ldata);
      
  };
  const onPercentageInputChange = (event)=> {
    console.log("input data", event.target.value);
     let x = parseInt(event.target.value);
     console.log("dfffff", x);
     if(x==="NaN"){
       setPercentage(0);
     } else {
       setPercentage(x);
     }
}
const handleEdition = (event) => {
    console.log(" event", event);
}
const handleDelete = (name) => {
  const newList = legacies.filter((item) => item.name !== name);
  setLegacies(newList);
  console.log("del event", event);
}
useEffect((data)=>{
  if(legacies.length <= 1){
    setPercentage(100);
  } 
console.log("use effect", legacies.length);
},[legacies])
  return (
    <Container className="mb-4" fluid>
      <div className="d-flex justify-content-center text-center" style={{flexDirection:'column'}}>
        <p style={{ font: "normal normal normal 20px/25px Ubuntu", color: "#444", opacity: 1}}> 
        Cet espace est dédié à vos bénéficiaires <br/> en cas d'inactivité, de décès ou autres.
        </p> 
        <div>
          <a style={{ font: "normal normal bold 14px/15px Ubuntu", color: "#333"}}> En savoir plus</a>
        </div>
      </div>
      <div>
      <Row> <h1 style={{font: 'normal normal italic 30px/35px Ubuntu', color: "#444"}}> Ajouter</h1></Row>
      <Row className="mt-4 justify-content-between">
        <Form   className="col-xl-7" role="form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Sinput
                name="name"
                placeholder="Entrer le nom complet"
                type="text"
                register={register}
                inputBg="#F0F0F0"
                label="Nom complet"
                required
                
              />
              {errors.name && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.name.message}</span>
               
              </div> }
              <Sinput
                name="dateDeNaissance"
                placeholder="Entrer la date de naissance"
                type="text"
                register={register}
                inputBg="#F0F0F0"
                label="Date de naissance"
                required
                
              />
              {errors.dateDeNaissance && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.dateDeNaissance.message}</span>
               
              </div> }
               <Sinput
                name="nationnalite"
                placeholder="Entrer la nationnalité"
                type="text"
                register={register}
                inputBg="#F0F0F0"
                label="Pays"
                required  
              />
              {errors.nationnalite && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.nationnalite.message}</span>
               
              </div> }
              <Sinput
                name="pourcentageHeritage"
                placeholder="pourcentage d'heritage"
                type="number"
                register={register}
                inputBg="#F0F0F0"
                // disabled={legacies.length <= 1?true:false}
                label="Pourcentage d'heritage"
                required  
                handleOnchange={onPercentageInputChange}
                inputvalue={percentage}
              />
              {errors.pourcentageHeritage && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.pourcentageHeritage.message}</span>
               
              </div> }
            </Col>
            <Col>
              <Sinput
                name="adresse"
                placeholder="Entrer l'adresse"
                type="text"
                register={register}
                inputBg="#F0F0F0"
                label="Adresse"
              />
              {errors.adresse && <div className="text-muted font-italic">
                  <span className="text-danger font-weight-700">{errors.adresse.message}</span>  
              </div>}
              <Sinput
                name="telephone"
                placeholder="Entrer le numero de telephone"
                type="text"
                register={register}
                inputBg="#F0F0F0"
                label="Numéro de téléphone"
              />
              {errors.nationnalite && <div className="text-muted font-italic">
                
                  <span className="text-danger font-weight-700">{errors.nationnalite.message}</span>
               
              </div> }
              <Sinput
                name="parente"
                placeholder="Quel est votre lien de parentee ?"
                type="text"
                register={register}
                inputBg="#F0F0F0"
                label="Lien de parenté"
                info={true}
                required
              />
            </Col>
          </Row>
       <Button className="mt-3 mb-1"   type="submit" style={{ backgroundColor:'#CC9933', borderColor:'#CC9933', borderRadius:'40px', width:'200px'}} >
           Valider
        </Button>
        </Form>
        <Col xl="5">
          <Row>
           <Col xl="5">
              <LinearProgress label="Pourcentage héritage" val={percentage} pColor="#CC9933"/>
           </Col>
           <Col xl="7" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              
                  <div className="rounded-circle " style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:'200px', width:'200px', backgroundColor:'#b7b7b7'}}>
                  <a href="#itguymax">
                    <img
                      alt="..."
                  
                      src="https://accounts.google.com/SignOutOptions?hl=en&continue=https://www.google.com/search%3Fq%3Dadd%2Bcountry%2Bflag%2Bin%2Bnext%2Bjs%26oq%3Dadd%2Bcontry%2Bflag%2Bin%2Bnext%26aqs%3Dchrome.1.69i57j33i10i160l3.12407j0j4%26sourceid%3Dchrome%26ie%3DUTF-8"
                    ></img>
                  </a>
                </div>
                <Button className="mt-3 mb-1"   type="submit" style={{ backgroundColor:'#679966', borderColor:'#679966', borderRadius:'40px', }} >
                  Ajouter une image
                </Button>
              
           </Col>
         </Row> 
        </Col>
      </Row>
      {
        legacies.length >0 ? <>
        <Line bgc='#b7b7b7' height="1px"/>
         { legacies.map((item, key)=> <> <Container style={{ width:"70%"}} className="mb-3"> 
         <Row key={key} style={{backgroundColor:"#F0F0F0",height: '50px', borderRadius:"40px",overflow:'hidden'}} >
        <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between", width:"100%", paddingTop:"10px" }}>
           <Image 
            src="https://accounts.google.com/SignOutOptions?hl=en&continue=https://www.google.com/search%3Fq%3Dadd%2Bcountry%2Bflag%2Bin%2Bnext%2Bjs%26oq%3Dadd%2Bcontry%2Bflag%2Bin%2Bnext%26aqs%3Dchrome.1.69i57j33i10i160l3.12407j0j4%26sourceid%3Dchrome%26ie%3DUTF-8"
            alt="..." 
            className="rounded-circle" 
            height={45} width={45}
            style={{backgroundColor:"#000"}}  
            />
            <p>{item.name}</p>
            <p>{item.telephone}</p>
            <p>{item.adresse}</p>
            <div className="rounded-circle" style={{backgroundColor: "#CC9933", marginTop:"-8px",marginRight:"2px", height: "45px",display:"flex", justifyContent:'center', alignItems:'center', width:"45px", fontSize:"12px", color:'#fff'}}>
              <span>{`${item.pourcentageHeritage}`+"%"}</span>
            </div>
        </div>

         </Row>
         <div className="text-right">
           <Button className="mt-3 mb-1"  onClick={ () => handleEdition(item.name) }  type="submit" style={{ backgroundColor:'#679966', borderColor:'#679966', borderRadius:'40px', }} >
              Modifier
            </Button>
            <Button className="mt-3 mb-1" onClick={ () => handleDelete(item.name)}   type="submit" style={{ backgroundColor:'#D20000', borderColor:'#D20000', borderRadius:'40px', }} >
              Supprimer
            </Button>
         </div>
         </Container>
        
         
         </> )}
        </>: null
      }
      </div>
    </Container>
  )
}


Legacy.layout = Portal;
export default Legacy;