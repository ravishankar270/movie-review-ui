import React from "react";

const NotFound = () => {
  return (
      <iframe
        src="https://giphy.com/embed/BweKhXaocjST6cnWMH"
        width="480"
        height="480"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
        style={{
          pointerEvents:"none",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width:"100%",
          height:"85vh",
          margin:"20px 0"
        }}
      ></iframe>
  );
};

export default NotFound;
