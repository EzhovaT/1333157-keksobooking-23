const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview-img');
const fileChooserPhoto = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matchesFile = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matchesFile) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});


fileChooserPhoto.addEventListener('change', () => {
  const file = fileChooserPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matchesFile = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matchesFile) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const photo = document.createElement('img');
      photo.className = 'ad-form__photo-img';
      photo.src = reader.result;
      previewPhoto.append(photo);
    });

    reader.readAsDataURL(file);
  }
});
