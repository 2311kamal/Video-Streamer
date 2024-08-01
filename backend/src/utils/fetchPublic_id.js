export const public_id = (fileUrl) => {
  const withoutExtension = fileUrl.substring(0, fileUrl.lastIndexOf("."));

  const extractedPart = withoutExtension.substring(
    withoutExtension.lastIndexOf("/") + 1
  );
  return extractedPart;
  //   console.log(extractedPart);
};

// public_id("http://res.cloudinary.com/do0yiqaoh/image/upload/v1722021687/tp6zngdb4n0xv2jsbtu5.png");
