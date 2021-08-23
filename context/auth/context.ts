import React from 'react';

type AuthContext = {
    Token: string;
    User: any;

    register: (param: any) => void;
    login: (param: any) => void;
    logout: (params: any) => void;
}

export default React.createContext<AuthContext>({
  Token: "",
  User: null,

  register: async () => {},
  login: async () => {},
  logout: async () => {},
});
