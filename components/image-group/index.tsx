"use client";

import Image from "next/image";
import { H4, ExtraSmall } from "@/components/ui/typography";
import { Button } from "../ui/button";
import { use, useState } from "react";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { formatDistanceToNowShort } from "@/lib/utils";

type BoardGroupProps = {
  value: string | undefined;
  onValueChangeAction: (v: string) => void;
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
  // boardsData: ImageSourceResponse<BoardItem>;
};

type BoardCardProps = {
  board: BoardItem;
  value: string;
  selected: boolean;
  onClickAction: () => void;
};

export function BoardGroup(props: BoardGroupProps): React.ReactElement {
  const { value, onValueChangeAction, boardsPromise } = props;
  const boards = use(boardsPromise);

  console.log({ boards });

  const [currentValue, setCurrentValue] = useState<string | undefined>(value);

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {boards.items.map((board) => (
          <BoardGroupItem
            key={board.id}
            value={board.id}
            board={board}
            selected={currentValue === board.id}
            onClickAction={() => {
              setCurrentValue(board.id);
              onValueChangeAction(board.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BoardGroupItem(props: BoardCardProps) {
  const { onClickAction, board, selected } = props;
  const cover = board.media.image_cover_url;
  const thumbnails = board.media.pin_thumbnail_urls;

  return (
    cover !== null && (
      <Button
        variant={"ghost"}
        className="h-auto p-0 overflow-hidden"
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
              {board.media.pin_thumbnail_urls.length > 0 ? (
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
          <div className="h-[62px] p-2 text-left">
            <H4>{board.name}</H4>
            <div>
              <p className="space-x-2">
                <ExtraSmall>{board.pin_count} Pins</ExtraSmall>
                <ExtraSmall className="text-slate-500">
                  {formatDistanceToNowShort(board.board_pins_modified_at)}
                </ExtraSmall>
              </p>
            </div>
          </div>
        </div>
      </Button>
    )
  );
}
