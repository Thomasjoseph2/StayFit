import crypto from "crypto";

export const randomImageName = (bytes = 32) => {
    const randomBytes = crypto.randomBytes(bytes);

    return randomBytes.toString("hex");
  };