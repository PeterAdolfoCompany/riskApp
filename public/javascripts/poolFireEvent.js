window.onload = () => {
    const formPoolFire = document.getElementById('poolFireExplosion');
    const eventName = document.getElementById('pfName');

    formPoolFire.onsubmit = e => {
        e.preventDefault();
        addEvent(eventName.value);
        formPoolFire.submit();
    };
};

