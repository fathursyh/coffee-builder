import { ActionError, defineAction } from "astro:actions";
import UserModel from "../database/userModel";

const User = new UserModel();
export const user = {
    getAllUser: defineAction({
        handler: async(_, context) => {
            if (context.request.method !== 'GET') {
                throw new ActionError({code: 'FORBIDDEN', message: 'Request forbidden.'});
            }
            return User.getAllUser();
        }
    }),
}
