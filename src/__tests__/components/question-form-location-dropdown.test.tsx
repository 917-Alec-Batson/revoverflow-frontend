import React from "react";
import { NavbarComponent } from "../../components/navbar.component";
import { mount } from "enzyme";
import {
  Menu,
  IconButton,
  Button,
  MenuList,
  Checkbox,
} from "@material-ui/core";
import { DescriptionTwoTone } from "@material-ui/icons";
import { RichTextEditorComponent } from "../../components/pages/forum-components/rich-text-editor-component/draftjs";
import { getByTestId } from "@testing-library/react";

describe("question-form-location-dropdown", () => {
  it("should render", () => {
    const wrapper = mount(<RichTextEditorComponent />);
    expect(wrapper).toBeDefined();
  });

  // it("Should render the dropdown menu button", () => {
  //   const wrapper = mount(<RichTextEditorComponent />);
  //   const dropDownButton = wrapper
  //     .find("#location-dropdown-button")
  //     .find(Button);

  //   expect(dropDownButton).toBeDefined();
  // });

  // it("Should render the dropdown menu button if locations checkbox is checked", () => {
  //   const wrapper = mount(<RichTextEditorComponent />);

  //   const checkbox = () =>
  //     wrapper.find("#location-based-checkbox").find(Checkbox);

  //   checkbox().simulate("change");

  //   const dropDownButton = wrapper.find("#location-dropdown-button");

  //   expect(dropDownButton).toBeDefined();
  // });

  // it("Shouldn't render the dropdown menu button if locations checkbox is unchecked", () => {
  //   const wrapper = mount(<RichTextEditorComponent />);

  //   const checkbox = () =>
  //     wrapper.find("#location-based-checkbox").find(Checkbox);

  //   checkbox().simulate("change");
  //   wrapper.update();
  //   checkbox().simulate("change", { target: { checked: false } });
  //   wrapper.update();
  //   const dropDownButton = wrapper.find("#location-dropdown-button");

  //   expect(dropDownButton).toBeUndefined();
  // });

  // it("Should render the location dropdown menu when clicked", () => {
  //   const wrapper = mount(<RichTextEditorComponent />);

  //   const checkbox = () =>
  //     wrapper.find("#location-based-checkbox").find(Checkbox);

  //   checkbox().simulate("change");

  //   const dropDownButton = wrapper
  //     .find("#location-dropdown-button")
  //     .find(Button);

  //   dropDownButton.simulate("click");

  //   const dropDownMenu = wrapper.find("#location-dropdown-menu").find(Menu);

  //   expect(dropDownMenu.prop("open")).toBeTruthy();
  // });

  // it("Should show Reston, VA as one of the locations", () => {
  //   const wrapper = mount(<RichTextEditorComponent />);
  //   const checkbox = () =>
  //     wrapper.find("#location-based-checkbox").find(Checkbox);

  //   checkbox().simulate("change", { target: { checked: true } });

  //   wrapper.update();
  //   const dropDownButton = wrapper.find("#location-dropdown-button");

  //   dropDownButton.simulate("click");
  // });
  //     const dropDownMenu = wrapper.find("#location-dropdown-menu").find(Menu)

  //     //TODO mock location data from database and test that the location appears in the dropdown menu

  // })
});
