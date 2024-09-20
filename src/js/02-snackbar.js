import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = Number(event.currentTarget.delay.value);
    const state = event.currentTarget.state.value; 

    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => { 
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then((delay) => {
        iziToast.success({
            title: "Success", 
            position: 'topRight',
            message: `✅ Fulfilled promise in ${delay}ms`,
        });
    })
    .catch((delay) => {
        iziToast.error({
            title: "Error",
            position: 'topRight',
            message: `❌ Rejected promise in ${delay}ms`,
        });
    });
});
