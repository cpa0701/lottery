import {observable, action} from 'mobx'

class LoginModel {

    @observable
    identityCard = '';

    @observable
    username = '';

    @observable
    token = '';

    @observable
    idcard = '';

    @observable
    id = '';

    @action
    login(user) {
        this.identityCard = user.identityCard;
        this.username = user.username;
        this.token = user.token.access_token;
        this.idcard = user.idcard;
        this.id = user.id;
        this.setSession('userId', user.id);
        this.setSession('uc', user.status);
        localStorage.setItem('authToken', user.token.access_token);
    }

    @action
    logout() {
        this.identityCard = '';
        this.username = '';
        this.token = '';
        this.idcard = '';

        this.removeSession('userId');
        this.removeSession('uc');
        localStorage.removeItem('authToken');
    }

    getSessionUser = () => {
        if (!sessionStorage) {
            return '';
        }
        return sessionStorage.getItem('uc');
    }

    setSession = (key, value) => {
        if (!sessionStorage) {
            return;
        }
        sessionStorage.setItem(key, value);
    }

    removeSession = (key) => {
        if (!sessionStorage) {
            return;
        }
        sessionStorage.removeItem(key);
    }
}

const login = new LoginModel();

export default login
