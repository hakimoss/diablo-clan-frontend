
export default class AccountServices {

    static createAccount(account) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(account),
        };
        
        return fetch('https://diablo-clan-weedqc.herokuapp.com/api/user', options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }



    static login(account) {

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(account),
        };

        const isAuthenticated =  fetch('https://diablo-clan-weedqc.herokuapp.com/api/connection', options)
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.error(err));
            
        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                resolve(isAuthenticated);
            }, 100);
        });
    }
}