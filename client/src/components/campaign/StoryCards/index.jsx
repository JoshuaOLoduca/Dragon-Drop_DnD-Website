
import React, {useState, useEffect, useContext} from 'react';
import Form from "./Form";
import StoryCardContainer from './StoryCardContainer';
import {DndStoryCardContainer} from './DndStoryCardContainer';
import axios from '../../../api/axios';
import dataHelper from '../../../hooks/dataHelpers';
import AuthContext from '../../../providers/AuthProvider';
import CampContext from '../../../providers/CampProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const viewObj = {
  CREATE: 'CREATE',
  EDIT: 'EDIT'
}

export default function StoryCards() {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id

  const address = `/users/${u_id}/campaigns/${campaign()}`

  const [allStories, setStories] = useState('');
  console.log("ALL STORIES", allStories)
  const [view, setView] = useState(viewObj.CREATE);
  const [currentStory, setCurrentStory] = useState({});
  const [dndStory, setDndStory] = useState('');

  
  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      const storyCardsObject = dataHelper().convertArrayToObject(res.data, 'id')
      setStories(storyCardsObject)
      setDndStory(res.data)
    })
  }, [])

  // console.log("DND STORY STATE", dndStory)
  
  const onEdit = (story) => {
    setCurrentStory(story)
    setView(viewObj.EDIT)
    console.log("VIEW", view)
  }

  console.log("CURRENT STORY", currentStory)
  
  return(
    <div className="grid-cols-3 flex">
    { view === viewObj.CREATE ? <Form css='card' setStories={setStories}/> :
    <Form text={currentStory.story_card_text}
    id={currentStory.id} 
    npc={currentStory.npcs_id} 
    map={currentStory.maps_id} 
    setStories={setStories}
    view={view}
    viewObj={viewObj}
    setView={setView}
    css='card_edit'/>}
    <StoryCardContainer
    allStories={allStories} 
    setStories={setStories} 
    onEdit={onEdit} 
    />
<DndProvider backend={HTML5Backend}>
    {dndStory.length && <DndStoryCardContainer
    allStories={allStories} 
    setStories={setStories}
    dndStory={dndStory}
    setDndStory={setDndStory}
    onEdit={onEdit} 
    />}
</DndProvider>
    </div>
  );
}
    //state.maps: id, name, campaign_id, background
    //state.npc: id, bio, details(mapname) img, campaign_id, name, alive
    //state.story: campaigns_id, completed, created_on, id, maps_id, npc_id, order_num, story_card_text
  
    // const [state, setState] = useState({
    //   npcs: [],
    //   maps: []
    // })
  
  
    // useEffect(() => {
    //   Promise.all([
    //     axios.get(`${address}/npcs`),
    //     axios.get(`${address}/maps`),
    //   ]).then((all) => {
    //     setState((prev) => ({
    //       ...prev,
    //       npcs: all[0].data,
    //       maps: all[1].data,
    //     }));
    //   });
    // }, []);