import { User }  from '../../models/User';

export namespace Auth {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public id, public email: string, public password: string) {}
  }

  export class LocalLogin {
    static readonly type = '[Auth] LocalLogin';
    constructor(public user: User, public clientID: string) {}
  }
  
  export class Logout {
      static readonly type = '[Auth] Logout';
    }

    export class LoginSuccess {
      static readonly type = '[Auth] LoginSuccess';
      constructor(public clientID, public userID: string, public email: string, public password: string) {}
    }

    export class RouteNavigate {
      static readonly type = '[Router] RouteNavigate';
      constructor(public route: string) {}
    }
  }