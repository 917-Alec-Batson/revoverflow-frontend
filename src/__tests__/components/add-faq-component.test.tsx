import React from 'react'
import {mount, shallow} from 'enzyme';
import Jest from 'jest'
import { AddFAQComponent } from '../../components/pages/faq-components/add-faq-component';
import { Answer } from '../../models/answer';
import { Question } from '../../models/question';
import { Button } from '@material-ui/core';


describe('add.faq.component', () =>{
    let q1:Question = {
        id: 1,
        acceptedId: 1,
        title: 'test question 1',
        content: 'this is a question',
        creationDate: new Date(),
        status: true,
        userID: 1
    }
    let q2:Question = {
        id: 2,
        acceptedId: 2,
        title: 'test question 2',
        content: 'what a great fantanstic question this is',
        creationDate: new Date(),
        status: true,
        userID: 1
    }
    let answerlessQuestion:Question = {
        id: 3,
        acceptedId: -1,
        title: 'answerless question',
        content: 'no one want to answer me :( ',
        creationDate: new Date(),
        status: false,
        userID: 2
    }
    let a1:Answer = {
        id: 1,
        content: 'Test Question 1 answer',
        creationDate: new Date(),
        questionId: 1,
        userId: 3,
    }
    let a2:Answer = {
        id: 6,
        content: 'Test Question 2 answer',
        creationDate: new Date(),
        questionId: 2,
        userId: 3,
    }


    it('should render', () => {
        
        const wrapper = mount(<AddFAQComponent/>);
        expect(wrapper).toBeDefined();
    })

    
    // it('should call submitFAQ with values of q2', ()=>{
    //     const logSpy = jest.spyOn(console, 'log');
    //     const wrapper = mount(<AddFAQComponent/>);
    //     // const wrapper = mount(<AddFAQComponent/>);
    //     // const funcName:any = 'submitFAQ'
    //     // const submitSpy = jest.spyOn(AddFAQComponent.prototype, funcName);
        
    //     const questionTitleInput = wrapper.find('#questionTitleInput')
    //     questionTitleInput.simulate('change', { target: { value: q2.title } })
    //     const questionBodyInput = wrapper.find('#questionBodyInput')
    //     questionBodyInput.simulate('change', { target: { value: q2.content } })
    //     const answerInput = wrapper.find('#answerInput')
    //     answerInput.simulate('change', { target: { value: a2.content } })
    //     //do submit event
    //     wrapper.update()
    //     wrapper.find(Button).simulate('submit')
    //     expect(logSpy).toBeCalledWith("submitting FAQ");

    // })





})