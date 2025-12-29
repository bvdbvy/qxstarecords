if (newImage) {
  if (cover?.deleteToken) {
    await deleteImage(cover.deleteToken);
  }

  const uploaded = await uploadImage(newImage);
  updatedCover = uploaded;
}
