import React,{useState} from 'react'
import AddDiet from '../components/trainerComponent/AddDiet'
import ViewTrainerDiets from '../components/trainerComponent/ViewTrainerDiets';

const DietScreen = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <>
      <div>
        <AddDiet  refreshPosts={() => setRefreshPosts(prev => !prev)} />
      </div>
      <div>
        <ViewTrainerDiets refreshTrigger={refreshPosts}  />
      </div>
    </>
  );
}

export default DietScreen


