import authReducer from '../../reducers/auth';

test('should give uid with login', () => {
  const uid = '93ifkfj30if3j';
  const action = {
    type: "LOGIN",
    uid
  };

  const state = authReducer({}, action);
  expect(state.uid).toBe('93ifkfj30if3j');
});

test('should clear uid with logout', () => {
  const action = {
    type: "LOGOUT",
  };

  const state = authReducer({uid: 'anything'}, action);
  expect(state).toEqual({});
});
