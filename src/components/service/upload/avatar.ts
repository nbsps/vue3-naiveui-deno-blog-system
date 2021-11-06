import store from '@/store';

const avatar = document.querySelector('.n-avatar') as HTMLImageElement;
const img = avatar.children[0] as HTMLImageElement;
avatar?.addEventListener('mouseover', () => {
  if (!img) return;
  img.style.transform = 'scale(.5)';
  img.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACY0lEQVRYR8WXvW5UQQyFPyf8CBAdUBIKKngChIRooUYUFIgHgKchD4AoKBA1tAgJ8QRQUQAl0EUBBZIYnZVH8p1M7uzdDdmRVtq7M9c+PrbPeI0VL+v5d/ezvTNj+2b2a3S/tenuZmYezr8C54FdoAs47DlwAtgCNgSi2Kz9yUvLqADsu/s54DsgFmR0CgCdVfSXzGzb3dfCxgBD02DFgAAIyH4A6IEQUH3kcDsAjDLQyrGciHJRrxTkM6M5bZzdiFQoJQI2ZMDdhXJs1c5bBhcGPKu0DoAupcukTACU27xaOS4FeFhRTSnaQcAtBlo5PtBWQlw6SC0bz0pXr20HNVcA5AjHikbnduRMbZppizbTT6cb7dqqkZnPFoCLY8KR8q02kzOtndCNmYDVNVXVyI+sKy0AhwnHmpntubta8yFwH7gWzj4BL4HnZrbl7uuhGwXLoTUyFwMpgivAC+BGpYwlhR+AB2b2JUvvVAYGKUgvK/I3wE3gbyidItXai4hPAu+BO8FEuVPy3dJNQQ1gPah/DDwF/gCnwrG+a+VnfX9iZptKRby7OIDUbm+BWyHRktXXgEBpbQJ309474HZqz8UARLtJLM8A34ALKfLrZvY5AF4FPiYmfgKXzex31oq43udPwcoBZAqB409BTEWrLcKVt2HpgmDjWIRoHil+BNyrpPgV8Oy/SHF9uSRtkB5o7bYuofLeVCkeneFCgsv1Wm4+PZeZrx5wZt3cmDEH13EOsjd0tgiZ8tuBgWSekWyKg97Z7kjWM3Ck+5oHemP5kTqsjQnAUn8+l0XX+5u1rP3u+/8Abxx+1foGIXgAAAAASUVORK5CYII=';
});
avatar?.addEventListener('mouseout', () => {
  if (!img) return;
  avatar.style.backgroundColor = '#000';
  img.src = process.env.VUE_APP_IMAGE_LOAD_BASE + store.state.avatar;
  img.style.display = 'none';
  img.style.transform = '';
  img.onload = () => {
    img.style.display = '';
  };
});
