window.onload = () => {
    const formFb = document.getElementById('fireBallExplosion');
    const eventName = document.getElementById('fbName');

    formFb.onsubmit = e => {
        e.preventDefault();
        addEvent(eventName.value);
        formFb.submit();
    };
};

