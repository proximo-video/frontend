import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="#0">About Us</Link>
        </li>
        <li>
        <a target='_blank' rel="noopener noreferrer" href="https://status.proximo.pw">API Status</a>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;