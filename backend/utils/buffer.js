import sharp from "sharp";

export const resize = async (image) => {
  const buffer = await (async (img) => {
    const resizedImg = await sharp(img)
      .resize({ height: 1500, width: 1400, fit: "contain" })
      .toBuffer();

    return resizedImg;
  })(image);

  return buffer; 
};
export const goodSizeResize = async (image) => {
    const buffer = await (async (img) => {
      const resizedImg = await sharp(img)
        .resize({ height: 1500, width: 1080, fit: "contain" })
        .toBuffer();
  
      return resizedImg;
    })(image);
  
    return buffer; 
  };


