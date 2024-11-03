import React from 'react';
import "./Components.css"


function Footer({ ownerName }) {
  return (
    <footer>
      <div>Owner: {ownerName}</div>
    </footer>
  );
}

export default Footer;
