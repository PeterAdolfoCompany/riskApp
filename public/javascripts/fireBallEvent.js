window.onload = () => {
    const formFb = document.getElementById('fireBallExplosion');
    const eventName = document.getElementById('fbName');

    if (typeof(formFb) !== 'undefined' && formFb != null) {
        formFb.onsubmit = e => {
            e.preventDefault();
            addEvent(eventName.value);
            formFb.submit();
        };
    }
};

