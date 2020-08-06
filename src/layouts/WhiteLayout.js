import React from 'react';

const WhiteLayout = ({ children }) => (
    <>
      {/* <Header navPosition="right" className="reveal-from-bottom" /> */}
      <main className="site-content">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
  
  export default WhiteLayout;  