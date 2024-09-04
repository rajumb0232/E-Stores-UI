import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import useImage from "../../Hooks/useImage";

const Image = ({ path, defaultUrl }) => {
  const { getImageURL } = useImage();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (path) {
      const get = async () => {
        setImageUrl(await getImageURL(path));
      };
      get();
    }
  }, [path]);

  return (
    <LazyLoad className="w-full">
      <img src={imageUrl ? imageUrl : defaultUrl} alt="image" className="w-full text-center"/>
    </LazyLoad>
  );
};

export default Image;
