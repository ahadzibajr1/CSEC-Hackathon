import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/users";


import { useStore } from "./LogIn/StoreContext";
import { logOut } from "../api/users";

const DoctorNav = () => {
  const [state, setState] = useState({ activeItem: "" });
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleItemClick = (e, { name }) => {
    navigate("/test-results/all");
  };

  const handleLogOut = async (e, { name }) => {
    setState({ activeItem: name });
    await logOut();
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const handleChangePassword = (e, { name }) => {
    navigate("/user/change-password");
  };

  const { activeItem } = state;

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="Test Vitals"
        active={activeItem === "testVitals"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Dropdown item text={user.sub}>
          <Dropdown.Menu>
            <Dropdown.Item
              name="account"
              active={activeItem === "acount"}
              onClick={handleChangePassword}
            >
              Change Password
            </Dropdown.Item>

            <Dropdown.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleLogOut}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default DoctorNav;
