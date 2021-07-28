/* eslint-disable linebreak-style */
export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
    onePost: {},
  },
  users: {
    data: [],
    loggedUser: {},
  },
  user: {
    active: true,
    email: 'barbara.pakula@hotmail.com',
  },
};
