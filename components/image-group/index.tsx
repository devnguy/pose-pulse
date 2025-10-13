"use client";

import Image from "next/image";
import { H4, Small } from "@/components/ui/typography";
import { Button } from "../ui/button";
import { useState } from "react";
import { fakeBoardsData } from "@/data/fakeBoardsData";

type BoardGroupProps = {
  value: string | undefined;
  onValueChangeAction: (v: string) => void;
};

type ImageGroupCardProps = {
  cover: string;
  thumbnails: Array<string>;
  value: string;
  selected: boolean;
  onClickAction: () => void;
};

export function BoardGroup(props: BoardGroupProps): React.ReactElement {
  const { value, onValueChangeAction } = props;

  // fake data for now
  const boardGroupData = fakeBoardsData;
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {boardGroupData.items.map((ig) => (
          <BoardGroupItem
            key={ig.id}
            cover={ig.media.image_cover_url}
            thumbnails={ig.media.pin_thumbnail_urls}
            value={ig.id}
            selected={currentValue === ig.id}
            onClickAction={() => {
              setCurrentValue(ig.id);
              onValueChangeAction(ig.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BoardGroupItem(props: ImageGroupCardProps) {
  const { onClickAction, cover, thumbnails, selected } = props;

  return (
    <Button
      variant={"ghost"}
      className="h-auto"
      onClick={() => onClickAction()}
      type="button"
    >
      <div
        className={
          selected
            ? "flex flex-col aspect-3/2 w-full "
            : "flex flex-col aspect-3/2 w-full opacity-50"
        }
      >
        <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full h-full">
          <div className="col-span-2 row-span-2 relative">
            <Image
              src={cover}
              alt=""
              fill
              className="object-cover"
              sizes="100vh"
              priority
            />
          </div>

          <div className="col-start-3 relative">
            {thumbnails.length > 0 ? (
              <Image
                src={thumbnails[0]}
                alt=""
                fill
                className="object-cover"
                sizes="100vh"
              />
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}
          </div>
          <div className="col-start-3 row-start-2 relative">
            {thumbnails.length > 1 ? (
              <Image
                src={thumbnails[1]}
                alt=""
                fill
                className="object-cover"
                sizes="100vh"
              />
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}
          </div>
        </div>
        <BoardItemDetails />
      </div>
    </Button>
  );
}

function BoardItemDetails() {
  return (
    <div className="h-[62px] p-2">
      <H4>Title</H4>
      <div>
        <p className="space-x-2">
          <Small>357 Pins</Small>
          <Small className="text-slate-500">2 mo</Small>
        </p>
      </div>
    </div>
  );
}
