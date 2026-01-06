import { ImageSourceResponse, MediaImagePin, Pin } from "@/app/types";

function isMediaImagePin(item: Pin): item is MediaImagePin {
  return item.media.media_type === "image";
}

export function getImagesFromResponse(
  response: ImageSourceResponse<Pin>,
): Array<string> {
  const images = response.items?.filter(isMediaImagePin).map((item) => {
    const vals = Object.values(item.media.images);
    return vals[vals.length - 1].url;
  });

  return images;
}
