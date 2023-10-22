import React,{useState} from "react";
import AddResults from "../components/trainerComponent/AddResults";
import ResultPosts from "../components/trainerComponent/ResultPosts";

const AddPostScreen = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <>
      <div>
        <AddResults refreshPosts={() => setRefreshPosts(prev => !prev)} />
      </div>
      <div>
        <ResultPosts refreshTrigger={refreshPosts}/>
      </div>
    </>
  );
};

export default AddPostScreen;
