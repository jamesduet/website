document.getElementById('playButton').addEventListener('click', function() {
  let livechat = document.getElementById('chat-widget-container');
  let videoOverlay = document.getElementById('videoOverlay');
  let video = document.getElementById('youtubeVideo');
  video.src = 'https://www.youtube.com/embed/y6oMutwJQCw?rel=0&autoplay=1';
  videoOverlay.style.display = 'flex';
  livechat.style.zIndex = 9990;
});

document
  .getElementById('videoOverlay')
  .addEventListener('click', function(event) {
    let livechat = document.getElementById('chat-widget-container');
    let video = document.getElementById('youtubeVideo');

    if (event.target === this) {
      this.style.display = 'none';
      video.src = '';
      livechat.style.zIndex = 2147483639;
    }
  });

function debounce(func, delay) {
  let timer;

  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const handleResize = debounce(() => {
  const videoWrapper = document.getElementsByClassName('video-wrapper').item(0);

  if (window.innerWidth >= 576) {
    videoWrapper.style.paddingBottom = '';
    return;
  }

  const promoOverlay = document.getElementsByClassName('promo-overlay').item(0);
  const promoOverlayWidth = promoOverlay.offsetWidth;
  const promoOverlayHeight = promoOverlay.offsetHeight;
  // const aspectRatio = 9 / 16;
  // const expectedVideoHeight = promoOverlayWidth / aspectRatio;

  videoWrapper.style.paddingBottom = `${((promoOverlayHeight - 64) /
    promoOverlayWidth) *
    100}%`;
}, 200);

window.addEventListener('resize', handleResize);
handleResize();
