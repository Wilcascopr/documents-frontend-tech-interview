import store from '../store/index.js';

const loginMiddleware = async (to, from, next) => {
  await store.dispatch('fetchUser');
  if (store.state.user.loggedIn) {
    // User is logged in, proceed to the route
    next('/documentos/todos');
  }
  next()
}      

const protectedRoutesMiddleware = async (to, from, next) => {
  await store.dispatch('fetchUser');
  if (store.state.user.loggedIn) {
    // User is logged in, proceed to the route
    next();
  } else {
    // User is not logged in, redirect to login or another route
    next('/');
  }
}

export { protectedRoutesMiddleware, loginMiddleware }