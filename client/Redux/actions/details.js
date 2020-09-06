import { SEND_PARTICIPANTS_DETAILS, SEND_EVENT_DETAILS } from "./types";
import { loading } from "./loading";

export const sendToEventCardDetails = (details, navigation) =>{

  navigation.setParams({
    title: details.eventdetails.title
  })
  // console.log(details)s
  // const {teamsize, registeredteaminfo, registeredplayerinfo} = myEvent.eventdetails;
  //   if(teamsize === 1){
  //     console.log(teamsize)
  //   } else{
  //     let teamInfo = registeredteaminfo.map((team, i) => ({teamMember: team.teammembersinfo, index: i}));
  //     // setTeam(teamInfo);
  //     console.log(teamInfo)
  //   }
  return {
    type: SEND_EVENT_DETAILS,
    payload: details,
  };

};
