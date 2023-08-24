import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import ChatPage from "./pages/ChatPage.js";
import ChatProvider from "./context/ChatProvider";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ChatProvider>
          <Routes>
            <Route path='/' element={<Homepage />} excat />
            <Route path='/chats' element={<ChatPage />} />
          </Routes>
        </ChatProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
