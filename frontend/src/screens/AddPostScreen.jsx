import React,{useState} from "react";
import AddResults from "../components/trainerComponent/AddResults";
import ResultPosts from "../components/trainerComponent/ResultPosts";

const AddPostScreen = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <>
      <div key='addresult'>
        <AddResults refreshPosts={() => setRefreshPosts(prev => !prev)} />
      </div>
      <div key='show'>
        <ResultPosts refreshTrigger={refreshPosts}/>
      </div>
    </>
  );
};

export default AddPostScreen;
