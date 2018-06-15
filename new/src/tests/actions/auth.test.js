import { login, logout } from '../../actions/auth';

test('should call login action object', ()=> {
  const uid = '123d';
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test('should call logout action object', ()=> {
  const action = logout();
  expect(action).toEqual({
    type:"LOGOUT"
  });
});
