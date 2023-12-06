import { useContext } from "react";

import RageList from '../components/UI/RageList'
import { RageContext } from "../store/rage-context";

function Measurements(){
  const rageCtx = useContext(RageContext);

  return <RageList rageQuakes={rageCtx.rageQuakes} />
}

export default Measurements