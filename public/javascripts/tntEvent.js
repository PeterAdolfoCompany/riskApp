window.onload = () => {
    const formT = document.getElementById('tntexplosion');
    const eventName = document.getElementById('eventName');

    formT.onsubmit = e => {
        e.preventDefault();
        addEvent(eventName.value);
        formT.submit();
    };
};

