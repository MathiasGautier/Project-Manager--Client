import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="text-center footerUp">Created by Mathias Gautier. </p>
      <div className="text-center footerFlex">
        <a href="https://github.com/mathiasgautier" className="mr-2">
          Gitgub
        </a>
        <a href="https://www.linkedin.com/in/mathias-gautier" className="mr-2">
          Linkedin
        </a>
        <a href="mailto: mths.gautier@gmail.com" className="mr-2">
          mths.gautier@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
