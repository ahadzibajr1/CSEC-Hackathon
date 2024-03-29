import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/users";

import { useStore } from "./LogIn/StoreContext";

const LabTechnicianNav = () => {
  const [state, setState] = useState({ activeItem: "" });
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleItemClick = (e, { name }) => {
    navigate("/test-results/all");
  };

  const handleCreate = (e, { name }) => {
    navigate("/test-results/create");
  };

  const handleChangePassword = (e, { name }) => {
    navigate("/user/change-password");
  };

  const handleLogOut = async (e, { name }) => {
    setState({ activeItem: name });
    await logOut();
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const { activeItem } = state;

  return (
    <Menu pointing secondary>
      <Menu.Item name="Test Vitals" onClick={handleItemClick} />
      <Menu.Item name="Create Test Vitals" onClick={handleCreate} />
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

export default LabTechnicianNav;
