import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class CustomDropdown extends React.Component {
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
        className="d-inline-block m-0"
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          color=""
          caret={this.props.supTitles.length > 0 ? true : false}
          className=" shadow-none border-0 navigte-route p-1"
          style={{ fontSize: "14.4px" }}
        >
          <span className="ps-1">{this.props.title}</span>
        </DropdownToggle>
        {this.props.supTitles.length > 0 && (
          <DropdownMenu className="p-0 m-0 rounded-0 ">
            {this.props.supTitles.map((t, i) => {
              return (
                <div key={i} className="">
                  <DropdownItem style={{ fontSize: "12.5px" }} onClick={()=>this.props.setLang(t)} dir="rtl" className="navigte-sub-route d-flex justify-content-end py-2">{t}</DropdownItem>
                </div>
              );
            })}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}
