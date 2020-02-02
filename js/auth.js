// listener auth state
auth.onAuthStateChanged(user => {
    if (user) {
        M.toast({ html: '¡Bienvenido!', classes: 'rounded' });
        // get data 
        db.collection('Issues').onSnapshot(snapshot => {
            setup(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    } else {
        M.toast({ html: 'Sin sesión', classes: 'rounded' });
        setup([]);
        setupUI(user);
    }
});

// create new issue
const createForm = document.querySelector('#issue-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Issues').add({
        Title: createForm['issue-name'].value,
        Content: createForm['textarea2'].value
    }).then(() => {
        M.toast({ html: 'Agregado', classes: 'rounded' });
        const modal = document.querySelector('#modal-issue');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        M.toast({ html: 'Permisos insuficientes', classes: 'rounded' });
    })
});

//signup 
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // new user with auth
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('Users').doc(cred.user.uid).set({
            Bio: signupForm['textarea3'].value
        });
    }).then(() => {
        M.toast({ html: '¡Usuario creado!', classes: 'rounded' });
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// signout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // signing user with auth
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});