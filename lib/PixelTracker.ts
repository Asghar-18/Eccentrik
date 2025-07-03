import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
const PixelTracker = () => {
  useEffect(() => {
    const pixelId = "YOUR_PIXEL_ID";
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, []);
  return null;
};
export default PixelTracker;