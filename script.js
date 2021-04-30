const FILTERS = document.querySelector('.filters');

function updateElemenentStyleProperty(name, value) {
  document.documentElement.style.setProperty(`--${name}`, value)
}

function handleUpdate(event) {
  if (event.target.matches('input')) {
    event.target.nextElementSibling.value = event.target.value;
    const suffix = event.target.dataset.sizing;
    updateElemenentStyleProperty(event.target.name, event.target.value + suffix)
  }
}

FILTERS.addEventListener('input', handleUpdate)
// ==============================================================

const inputs = document.querySelectorAll('.filters input');
const resetBtn = document.querySelector('.btn-reset');
resetBtn.addEventListener('click', (event) => {
  inputs.forEach(input => {
    input.value = input.defaultValue;
    input.nextElementSibling.value = input.value;
    const suffix = input.dataset.sizing;
    updateElemenentStyleProperty(input.name, input.value + suffix)
  })
})

// ======================================================
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
let btnNext = document.querySelector('.btn-next');
btnNext.addEventListener('click', updateImage);


function updateImage() {
  const mainImg = document.getElementById('main-img');
  const img = new Image();
  img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg";
  img.onload = () => {
    const index = i % images.length;
    mainImg.src = generateSrc() + images[index];
    console.log(mainImg.src)
    i++;
    btnNext.disabled = true;
    setTimeout(function () {
      btnNext.disabled = false
    }, 1000);
  }
}

function generateSrc() {
  let hour = new Date().getHours()
  let actualHour;
  if (hour >= 6 && hour < 12) actualHour = 'morning';
  if (hour >= 12 && hour < 18) actualHour = 'day';
  if (hour >= 18 && hour < 24) actualHour = 'evening';
  if (hour >= 0 && hour < 6) actualHour = 'night';
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${actualHour}/`

}

// ==========================================================================

const fileInput = document.getElementById('btnInput');
const imageContainer = document.getElementById('main-img');

fileInput.addEventListener('change', function (e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    console.log(reader.result)
    img.src = reader.result;
    imageContainer.setAttribute('src', `${img.src}`)
    fileInput.value = '';
  }
  reader.readAsDataURL(file);
});


// ===================================================================================

const btnSave = document.querySelector('.btn-save');
const canvas = document.createElement('canvas');


function generateFilters() {
  return Array.from(document.querySelectorAll('.filters input')).map(input => {
    const name = input.getAttribute('name');
    const dataSizing = input.dataset.sizing;
    const value = input.value;
    return `${name}(${value}${dataSizing})`
  }).join(' ');
}


function saveImage() {
  const canvas = document.createElement('canvas');
  const imgSrc = document.getElementById('main-img').getAttribute('src');
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imgSrc;
  img.onload = function () {
    console.log(generateFilters())
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = generateFilters();
    ctx.drawImage(img, 0, 0);
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
  };

}

btnSave.addEventListener('click', saveImage);

// =====================================================================================
const fullScreen = document.querySelector('.fullscreen')
fullScreen.addEventListener('click', toggleFullScreen)

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}