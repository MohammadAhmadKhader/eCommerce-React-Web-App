import { useSearchParams } from "react-router-dom"
import CheckboxInput from "./CheckboxInput"


const DiscountFilter = () => {
  const [searchParams,setSearchParams] = useSearchParams()

  const handleCheckBox = (event,text)=>{
    const offer = searchParams.get("offer");
    if(!offer || offer == "false"){
      searchParams.set("offer","true");
      setSearchParams(searchParams);
    }else{
      searchParams.set("offer","false");
      setSearchParams(searchParams);
    }
  }
  const checkStateController = (text)=>{
    const doesNameExistInUrl = searchParams.get("offer") && searchParams.get("offer") == "true" ? true : false
    return doesNameExistInUrl
  }
  return (
    <CheckboxInput id="onDiscount" text="Only products with offer?" handleCheckBox={handleCheckBox}
     stateController={checkStateController}/>
  )
}
/*register={register}*/

export default DiscountFilter