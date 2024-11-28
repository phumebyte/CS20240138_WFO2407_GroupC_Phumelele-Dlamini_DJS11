import PropTypes from "prop-types"; 
import Sidebar from "./static/Sidebar";
import Header from "./static/Header";
import AudioPlayer from "./static/AudioPlayer";
import "../assets/styles/layout.css"; 

function Layout({ children }) {
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar className="sidebar" />
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header className="header" />
        
        {/* Main Content Area */}
        <main className="main">{children}</main>
      </div>
      
      {/* Audio Player */}
      <AudioPlayer className="audio-player" />
    </div>
  );
}

// Validate the 'children' prop
Layout.propTypes = {
    children: PropTypes.node.isRequired, // Ensures that children is a valid React node
  };

export default Layout;

