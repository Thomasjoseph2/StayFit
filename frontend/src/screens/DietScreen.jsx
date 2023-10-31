import React,{useState} from 'react'
import AddDiet from '../components/trainerComponent/AddDiet'

const DietScreen = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <>
      <div>
        <AddDiet refreshPosts={() => setRefreshPosts(prev => !prev)} />
      </div>
      <div>
        
      </div>
    </>
  );
}

export default DietScreen


