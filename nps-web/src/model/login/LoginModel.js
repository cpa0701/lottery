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

    @action
    login(user) {
        this.identityCard = user.identityCard;
        this.username = user.username;
        this.token = user.token;
        this.idcard = user.idcard;
        this.uid = user.uid;

        this.setSession('uc', user.status)
    }

    @action
    logout() {
        this.identityCard = '';
        this.username = '';
        this.token = '';
        this.idcard = '';

        this.removeSession('uc');
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
