import { PixelCrop } from "react-image-crop";

export function getCorrectDate(date: string) {
    const correctDate = new Date(date).toDateString().replace((new Date(date).toDateString().split(" ").shift()), "")
    return correctDate;
}

export function getCorrectItemsNumber(page:string,limit:string){
    const correctNumber = (Number(page || 1) * Number(limit || 9) - Number(limit || 9));
    return correctNumber;
}

export const defaultUserImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/UsersImages/rtnfqs2mx3rvvgleayna"

export function setCanvasPreview(image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) {
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("canvas 2d context does not exist");
    }

    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    context.scale(pixelRatio, pixelRatio);
    context.imageSmoothingQuality = "high";
    context.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    context.translate(-cropX, -cropY);
    context.drawImage(
        image,
        0, 0,
        image.naturalWidth,
        image.naturalHeight,
        0, 0,
        image.naturalWidth,
        image.naturalHeight
    )
    context.restore();
}

export function convertBase64ToBlob(imageBase64: string, imageType: string) {
    // removing "data:image/png;base64," from image as atob requires base64 without it
    const byteCharacters = atob(imageBase64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteNumbers.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: imageType });
    
    return blob;
}