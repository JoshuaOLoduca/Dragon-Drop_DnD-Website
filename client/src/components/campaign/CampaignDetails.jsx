import { React, useContext, useEffect } from "react";
import CampContext from "../../providers/CampProvider";
import { useParams } from 'react-router-dom';


const CampaignDetails = (props) => {
  const {campaign, setCampaign} = useContext(CampContext)
  const { c_id } = useParams();
  
  useEffect(()=> {
    setCampaign(c_id)
  }, [])

console.log(`campaign`, campaign)

return(
  <div>HALLO</div>
)
}

export default CampaignDetails;