// load issues
const issues = document.querySelector('.issues');
const outLinks = document.querySelectorAll('.logged-out');
const inLinks = document.querySelectorAll('.logged-in');
const member = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
        db.collection('Users').doc(user.uid).get().then(doc => {

            // setup account info
            const template = `
                <div>Logged in as ${user.email}</div>
                <div>Biografía</div>
                <div>${doc.data().Bio}</div>
            `;
            member.innerHTML = template;
        });
        // toggle ui 
        inLinks.forEach(item => item.style.display = 'block');
        outLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide account info
        member.innerHTML = '';

        inLinks.forEach(item => item.style.display = 'none');
        outLinks.forEach(item => item.style.display = 'block');
    }
}

const setup = (data) => {
    if (data.length) {
        let template = '';
        data.forEach(doc => {
            const issue = doc.data();
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${issue.Title}</div>
            <div class="collapsible-body white">${issue.Content}</div>
        </li>
        `;
            template += li
        });
        issues.innerHTML = template;
    } else {
        issues.innerHTML = `<h5>Inicia sesión para poder interactuar con la página</5>`;
    }
}

// load materialize
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    $('input#input_text, textarea#textarea2').characterCounter();
    $('input#input_text, textarea#textarea3').characterCounter();
});