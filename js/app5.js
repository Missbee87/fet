const button = document.querySelector('#Btn');
Btn.addEventListener('click', function () {

  Toastify({
      text: "Proximamente",
      duration: 2000,
      gravity: "botton",
      position: "left",  
  }).showToast();
});