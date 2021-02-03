import React, { Component } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { mount } from 'enzyme';
import {getQueriesForElement, render} from '@testing-library/react'
import renderer from 'react-test-renderer';
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FaqContainerComponent from '../../components/pages/faq-components/faq-container.component';
configure({adapter: new Adapter()})




describe('USER-FAQ component tests', () => {
    

    test("User-FAQ page mounts properly", ()=>{
    
    const wrapper = mount(
        <BrowserRouter>
            <main>
                <Route exact path="/faq">
                    <FaqContainerComponent/>
                </Route>
            </main>
        </BrowserRouter>)

        expect(wrapper).toBeDefined()
    })





    //=====================================================================================================



    test("Snapshot of render:  identifies unexpected interface changes within our application", ()=>{
        const tree = renderer.create(
        <BrowserRouter>
            <main>
                <Route exact path="/faq">
                    <FaqContainerComponent/>
                </Route>
            </main>
        </BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })


    //=====================================================================================================
 

    test("User-FAQ page renders revature tab and locations tab", ()=>{
    
    const wrapper = mount(
        <BrowserRouter>
            <main>
                <Route exact path="/faq">
                    <FaqContainerComponent/>
                </Route>
            </main>
        </BrowserRouter>)
        expect(wrapper.find('revatureTab')).toBeDefined()
        expect(wrapper.find('locationsTab')).toBeDefined()
    })


    //=====================================================================================================
    // test('Does this button get Revature questions', () => {
    //     const wrapper = shallow(<FaqContainerComponent />)
        
    //     wrapper.find("#revatureQ").simulate("click")

    //     expect(wrapper.find('h2').text()).toContain("Revature Questions")
   
    // })


    //=====================================================================================================

    test("location tab on-click displays revature breadcrumbs", ()=>{
    

        const root:any = document.createElement("div")
        ReactDOM.render(
        <BrowserRouter>
            <main>
                <Route exact path="/faq">
                    <FaqContainerComponent/>
                </Route>
            </main>
        </BrowserRouter>
        , root)

        const {getByText, getByLabelText} = getQueriesForElement(root)

        //const tab = simulate click to revature and breadcrumbs should show
    })


    //=====================================================================================================

    // test('Does clicking this breadcrumb show location based questions', () => {

   
    // })


    //=====================================================================================================
    // test('Does Admin button not Render depending on isAdmin State = false', () => {
        
    //     console.log("yup!")
   
    // })


});





