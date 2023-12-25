import {
BrowserRouter ,
Route,
Routes,

} from "react-router-dom";

import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Profile from "./components/profile/Profile";
import Update from "./components/Update/Update.js"
import Post from "./components/Post/Post.jsx";
import Signup from "./pages/signup/Signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
