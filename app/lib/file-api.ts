import { FILE_API_ENDPOINT } from './constants';

export const uploadFile = (file: File) => {
  const formData = new FormData();

  formData.append('file', file);

  fetch(FILE_API_ENDPOINT, {
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
