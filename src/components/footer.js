import React from 'react';
import FacebookIcon from '../assets/IMG/FacebookIcon.png';
import InstagramIcon from '../assets/IMG/InstagramIcon.png';
import TwitterIcon from '../assets/IMG/twitter.png';



export default function Footer() {


  return (
    <footer className="mastfoot mt-auto text-center">
      <div className="inner">
        <p> Software <a href="../Pages/Home.jsx">Agora</a>, by <a href="https://twitter.com/mdo">Marketing Agency</a>.</p>
        <p>
          <a className="py-2" href="https://www.facebook.com/friendsmkt" aria-label="Product">
            <img className="mr-5" src={FacebookIcon} width="40" height="36" alt="" />
          </a>
          <a className="py-2" href="https://www.instagram.com/friendsmkt/" aria-label="Product">
            <img className="mr-5" src={InstagramIcon} width="40" height="40" alt="" />
          </a>
          <a className="py-2" href="https://www.instagram.com/friendsmkt/" aria-label="Product">
            <img className="" src={TwitterIcon} width="40" height="40" alt="" />
          </a>
        </p>
        <p>
        </p>
      </div>
    </footer>
  );
}

