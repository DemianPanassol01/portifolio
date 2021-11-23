if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', (e) => {
        const is = document.querySelectorAll('input'),
            t = document.querySelector('textarea'),
            c = document.querySelector('#alert-info'),
            m = document.querySelector('#alert-msg');
        for (let i = 0; i < is.length; i++) {
            if (is[i].value === '') {
                c.style.display = 'block';

                setInterval(() => {
                    c.style.display = 'none';
                }, 8000);
                e.preventDefault();
            }
        }
        if (t.value === '') {
            m.style.display = 'block';

            setInterval(() => {
                m.style.display = 'none';
            }, 8000);
            e.preventDefault();
        }
    });
}

if (document.querySelector('.msg-conf')) {
    const d = document.querySelector('.msg-conf');
    if (d.textContent !== "") {
        setTimeout(() => {
            d.style.display = "none";
        }, 5000);
    } else { d.style.display = 'none'; };
};

if (document.querySelector('.btn-up')) {
    const p = document.querySelector('.btn-up');
    const h = window.screen.height + 80;
    document.addEventListener('scroll', () => {
        if (window.scrollY > h) {
            p.classList.add('btn-up-show');
        } else {
            p.classList.remove('btn-up-show');
        };
    });
};