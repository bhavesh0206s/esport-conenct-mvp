import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { loading } from './loading';
import { USER_EVENT_INFO } from './types';

export const getUserEventInfo = (username, eventId) => async (dispatch) => {
  
  try{
    dispatch(loading(true))
    
    const res = await axios.get(`http://${ipAddress}/api/event/details/${eventId}`);
    const eventDetail = [res.data];
    // console.log(eventDetail)
    let allEvents =  eventDetail.map(event => ({eventId: event._id, registeredTeamInfo: event.registeredteaminfo}));
    let currentEvent = allEvents.filter((event) => event.eventId === eventId);
    let playersDetails = currentEvent[0].registeredTeamInfo.map(players => {
      let currentPlayer
      for(let player of players.teammembersinfo){
        if(player.username === username){
          currentPlayer = players.teammembersinfo
          break
        }
      }
      return currentPlayer
    }).filter(item => item !== undefined);
    
    let players = playersDetails[0].map((item, i) => ({name: item.name, username: item.username, key: i, teamLeader: item.teamLeader}));
    console.log(players)
    dispatch({
      type: USER_EVENT_INFO,
      payload: players
    });
    
    dispatch(loading(false))
  }catch(e){
    console.log('error from getUserEventInfo: ', e);
    dispatch(loading(true))
  }

};
