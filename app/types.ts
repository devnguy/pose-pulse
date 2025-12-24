export type ImageSourceResponse<T> = {
  bookmark: string;
  items: Array<T>;
};

export type BoardItem = {
  id: string;
  board_pins_modified_at: string;
  name: string;
  media: {
    image_cover_url: string | null;
    pin_thumbnail_urls: Array<string>;
  };
  pin_count: number;
};

export type PinterestImage = {
  [key: string]: {
    width?: number;
    height?: number;
    url: string;
  };
};

export type MediaMultipleImages = {
  items: Array<{ images: PinterestImage }>;
  media_type: "multiple_images";
};

export type MediaImage = {
  images: PinterestImage;
  media_type: "image";
};

export type Pin = MediaMultipleImagesPin | MediaImagePin;

export type MediaMultipleImagesPin = {
  id: string;
  media: MediaMultipleImages;
};

export type MediaImagePin = {
  id: string;
  media: MediaImage;
};
