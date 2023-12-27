import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../../firebase-config";

import { useDispatch, useSelector } from 'react-redux';
import { signOutUserFailure, signOutUserSuccess } from '../../redux/user/userSlice';


import "./style.scss";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };


  //check login
  const [authUser, setAuthUser] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const currentUser = user.currentUser;

  console.log("sign out successfullllll", currentUser);
  

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);

      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUserSuccess());
        
        console.log("sign out successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        dispatch(signOutUserFailure(error));
      } );
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/manager-user" className="header__content__logo">
        Icon home
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <li>
              <Link to="/help">Help</Link>
            </li>
            {authUser ? (
              <>
                {currentUser && currentUser.role === "admin" && (
                  <li>
                    <Link to="admin/manager-energy">Energy</Link>
                  </li>
                )}
                {currentUser && currentUser.role === "user" && (
                  <li>
                    <Link to="/user-dashboard-detail">Energy</Link>
                  </li>
                )}
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button className="btn" onClick={userSignOut}>Logout</button>
                </li>
              </>
              ) : (
                <Link to="/login">
                  <button className="btn">Login</button>
                </Link>
              )}
            
          </ul>
        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;