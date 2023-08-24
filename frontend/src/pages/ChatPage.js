import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../Components/Authentication/miscellaneous/ChatBox.js";
import MyChats from "../Components/Authentication/miscellaneous/MyChats.js";
import SideDrawer from "../Components/Authentication/miscellaneous/SideDrawer.js";
import { useChatState } from "../context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
