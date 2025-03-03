export const uploadToCloudinary = async (file : File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME is not set");
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    console.log("Cloudinary Response:", result);

    if (!response.ok) {
        console.log("Error Cloudinary:", result);
        throw new Error("GAGAL LHO JE PJ");
    }

    return result.secure_url;
}