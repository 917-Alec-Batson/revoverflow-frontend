import React from 'react';
import { NavbarComponent } from '../../components/navbar.component';
import { mount } from 'enzyme';
import {Menu, IconButton, ListItem} from '@material-ui/core'


describe('navbar.component', () => {

    it('should render', () => {
        
        const wrapper = mount(<NavbarComponent  />);
        expect(wrapper).toBeDefined();
    })


    it('should render the logout menu when the profile icon is clicked', () => {
        //render the base component for testing
        const wrapper = mount(<NavbarComponent  />);
        //find a node
        const iconButton = wrapper.find("#profile-icon-button").find(IconButton)
        //simulate event
        iconButton.simulate('click')
        //update all refs because we triggered a render
        wrapper.update()
        //find where the change should have happened
        const logoutMenu = wrapper.find("#primary-search-account-menu").find(Menu)
        //test a value on the node
        expect(logoutMenu.prop('open')).toBeTruthy()
        expect(logoutMenu.prop('anchorEl')).toBeDefined()
    })

});
