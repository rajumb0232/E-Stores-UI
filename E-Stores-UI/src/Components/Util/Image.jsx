import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import useImage from "../Hooks/useImage";

const Image = ({ path }) => {
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
      <img src={imageUrl} alt="ksdahfka" className="w-full"/>
    </LazyLoad>
  );
};

export default Image;
