export async function uploadFileToFolder(data) {
  try {
    const formData = new FormData();
    formData.append("profile_image", data.profile_image[0]);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file. Status: ${response.status}`);
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw error; // Re-throw the error to let the calling code handle it
  }
}
