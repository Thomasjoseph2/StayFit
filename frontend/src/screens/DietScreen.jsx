import React,{useState} from 'react'
import AddDiet from '../components/trainerComponent/AddDiet'
import ShowDiets from '../components/trainerComponent/ShowDiets';

const DietScreen = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <>
      <div>
        <AddDiet refreshPosts={() => setRefreshPosts(prev => !prev)} />
      </div>
      <div>
        <ShowDiets refreshTrigger={refreshPosts}/>
      </div>
    </>
  );
}

export default DietScreen


