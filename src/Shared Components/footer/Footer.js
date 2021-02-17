import React from "react";
import { Link } from "react-router-dom";
import { pageLinks } from "../../helpers/nav-link-list";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  const linksList = pageLinks.map((link, index) => {
    return (
      <li key={index} className="footer-links">
        <Link to={link.link}>{link.page}</Link>
      </li>
    );
  });

  return (
    <div className="footer">
      <div className="footer-background">
        <div className="container">
          <div className="footer-top">
            <div className="footer-left">
              {" "}
              <h5 id="footer-navigation">Navigation</h5>
              <ul>{linksList}</ul>
            </div>
            <div className="footer-right">
              <h6 id="footer-icon">
                Come hang out
                <br /> with us on
                <br /> facebook!
                <br />
                <a
                  href="https://www.facebook.com/groups/714718341874468"
                  target="_blank"
                >
                  {" "}
                  <FaFacebook id="footer-navigation" size="2em" />{" "}
                </a>
               
              </h6> <a style={{color: '#aba5b4'}} href="mailto: cfsracingclub@gmail.com">Send Email: cfsracingclub@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
