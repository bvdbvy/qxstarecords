export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "QXSTAREALS");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dyykj8mnr/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return {
    url: data.secure_url,
    deleteToken: data.delete_token,
  };
}
