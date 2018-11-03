/*
window.onload = () => {
    const formT = document.getElementById('tntexplosion');
    const eventName = document.getElementById('eventName');

    formT.onsubmit = e => {
        e.preventDefault();
        let inputs = e.target;
        let obj = {};
        for(let i = 0; i < inputs.length; i++) {
            obj[inputs[i].name] = inputs[i].value;
        }

        addEvent(eventName.value);
    };
};
*/

