import { Answer } from '../models/answer';
import { Faq } from '../models/faquestion';
import { Location } from '../models/location';
import { Question } from '../models/question';
import { authAxios } from './internal.axios'

//Adding FAQs to database.
export const addToFAQ = async (question: Question, answer: Answer) => {

  let addFAQ ={
        question,
        answer,
    }

    const response = await authAxios.post<Faq>(`/faq`, addFAQ);
    console.log(response.data);
    return response.data;
}

//Get all FAQs
export const getAllFAQ = async () => {

    const response = await authAxios.get<any>(`/faq`);
    console.log(response.data);
    return response.data;
}

//Get FAQs by location
export const getFAQByLocation = async (location: string) =>{

    const response = await authAxios.get<Faq[]>(`/faq/location/${location}`);
    console.log(response.data);
    return response.data;


}

//Get Revature based FAQs
export const getRevatureBasedFAQ = async() =>{

    const response = await authAxios.get<Faq[]>(`/faq/revature`);
    console.log(response.data);
    return response.data;


}


//Get Revature based FAQs
export const deleteFAQuestion = async(id: number) =>{

    const response = await authAxios.delete<Faq[]>(`/faq/${id}`);
    console.log(response.data);
    return response.data;


}

//Get Revature based FAQs
export const updateFAQuestion = async (question: Question, answer: Answer, id:number) => {

    let addFAQ ={
            id,
          question,
          answer,
      }
    const response = await authAxios.put<Faq>(`/faq`, addFAQ);
    console.log(response.data);
    return response.data;


}