export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "QXSTAREALS");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dyykj8mnr/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return {
    url: data.secure_url,
    name: file.name,
    type: file.type,
  };
}
