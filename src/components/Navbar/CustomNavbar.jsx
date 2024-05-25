import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";

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
        className="d-inline-block px-2 m-0 pt-2"
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          color=""
          caret={this.props.supTitles.length > 0 ? true : false}
          className="px-2 shadow-none border-0 mt-0 pt-0 navigte-route"
          style={{ fontSize: "14px" }}
        >
          {this.props.title}
        </DropdownToggle>
        {this.props.supTitles.length > 0 && (
          <DropdownMenu className="rounded-0 p-0">
            {this.props.supTitles.map((t, i) => {
              return (
                <Link key={i} to={"sub-category/" + t._id} className="nav-link">
                  <DropdownItem style={{ fontSize: "12.5px" }} dir="rtl" className="navigte-sub-route d-flex justify-content-start py-2">{t.ArName}</DropdownItem>
                </Link>
              );
            })}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}
