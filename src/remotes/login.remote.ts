/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { authAxios } from './internal.axios';

export const getUserById = async (email: string | null) => {
    const response = await authAxios.get(`/user/${email}/points`);
    return response;
}