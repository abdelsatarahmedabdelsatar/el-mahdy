import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

export default class CustomNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  render() {
    return (
      <Dropdown
        className="d-inline-block p-0 m-0"
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          color=""
          caret={this.props.supTitles?true:false}
          className="px-2 shadow-none border-0"
          style={{ fontSize: "13.5px" }}
        >
          {this.props.title}
        </DropdownToggle>
        {this.props.supTitles && (
          <DropdownMenu>
            {this.props.supTitles.map((t, i) => {
              return (
                <NavLink key={i} to="/cart" className="nav-link">
                  <DropdownItem header>
                    {t}
                  </DropdownItem>
                </NavLink>
              );
            })}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}
