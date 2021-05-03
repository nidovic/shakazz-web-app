import React from 'react'
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";
import Dot from '../common/dot'
export default function Sinput({mgl, rows, inputvalue,handleOnchange, disabled,iStyle, info, required, label,btc, usd, inline, inputBg, autoComplete, prepend,append,name, placeholder,type, register, registerOptions,icon,handleToggleshow }) {
  const ibg = inputBg || '#f5f5f5'
  const style = inline? {display: 'flex', flexDirection: 'row'}:null
  return (
    <>
        <FormGroup  >
             {inline? ( 
            <Row className="mt-3">
               <Col xl="3">
                 <div>
                   {label?  <label style={{font: 'normal normal italic 20px/25px Ubuntu', color:"#fff"}}>{label}{":"}</label>:null}
                  {required && <Dot info={ info?true:false}/>}
                 </div>
               </Col>
                <Col xl="6" >
                   <div className=" d-flex justify-content-center">
                     <InputGroup  className="input-group-alternative  mb-1" style={{overflow: 'hidden'}}>
                   {prepend && icon && (
                     <InputGroupAddon addonType="append">
                    <InputGroupText onClick={handleToggleshow } style={{backgroundColor: ibg }}>
                    <i className={icon}  aria-hidden="true" />
                    </InputGroupText>
                  </InputGroupAddon>
                   )}
                  <Input rows={rows} onChange={handleOnchange}  value={inputvalue} disabled={disabled?true:false} autoComplete={autoComplete} className=" font-italic" innerRef={register()} name={name} placeholder={placeholder} type={type}  style={{backgroundColor: ibg, color: '#FFF', borderRadius:'15px'}}/>
                  
                   {append && icon && (
                     <InputGroupAddon addonType="append">
                    <InputGroupText onClick={handleToggleshow } style={{backgroundColor: ibg}}>
                    <i className={icon}  aria-hidden="true"/>
                    </InputGroupText>
                  </InputGroupAddon>
                   )}
                </InputGroup>  
                 {usd&& <span className="ml-2" style={{font: 'normal normal bold 30px/37px Ubuntu', color: "#fff"}}>$</span>}
                  {btc && <span className="ml-2" style={{font: 'normal normal bold 30px/37px Ubuntu', color: "#fff"}}>₿</span>}
                   </div>
                </Col>
              </Row>
             ):( 
               <>
               <div className="mt-3">
               {mgl && label ? <label  className="ml-3" style={{font: "normal normal bold 18px/19px Ubuntu", fontWeight:mgl?"":"300"}}>{label+":"}</label>:null}
                 {!mgl && label ? <label  style={{font: "normal normal bold 18px/19px Ubuntu", fontWeight:mgl?"":"300"}}>{label+":"}</label>:null}
               {/* {mgl && label  ? <label  className="ml-3" style={{font: "normal normal bold 18px/19px Ubuntu", fontWeight:mgl?"":"300"}}>{label+":"}</label>:null} */}
               {/* {label && !mgl ? <label  style={{font: "normal normal bold 18px/19px Ubuntu", fontWeight:mgl?"":"300"}}>{label+":"}</label>:null} */}
                {required && <Dot info={ info?true:false} />}
               </div>
                 <InputGroup className="input-group-alternative  mb-1" style={iStyle}>
                   {prepend && icon && (
                     <InputGroupAddon addonType="append">
                    <InputGroupText onClick={handleToggleshow } style={{backgroundColor: ibg }}>
                    <i className={icon}  aria-hidden="true"/>
                    </InputGroupText>
                  </InputGroupAddon>
                   )}
                  <Input rows={rows} onChange={handleOnchange} disabled={disabled?true:false} value={inputvalue} autoComplete={autoComplete} className="text-muted font-italic" innerRef={register()} name={name} placeholder={placeholder} type={type}  style={{backgroundColor: ibg, borderRadius:"15px"}}/>
                  
                   {append && icon && (
                     <InputGroupAddon addonType="append">
                    <InputGroupText onClick={handleToggleshow } style={{backgroundColor: ibg}}>
                    <i className={icon}  aria-hidden="true"/>
                    </InputGroupText>
                  </InputGroupAddon>
                   )}
                </InputGroup>  
               </>
             )}
                  
        </FormGroup>
    </>
  )
}
