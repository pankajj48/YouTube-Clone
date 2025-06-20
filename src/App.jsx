import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import Frontpage from './components/mainpage/main';
import VideoPlayer from './components/player/video-player';
import Searchpage from './components/search page/searchpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <Navbar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/watch" element={<VideoPlayer />} />
        <Route path="/search" element={<Searchpage results={searchResults} />} />
      </Routes>
    </Router>
  );
}

export default App;
