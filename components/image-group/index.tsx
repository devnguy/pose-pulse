"use client";

import Image from "next/image";
import { ExtraSmall, SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { formatDistanceToNowShort } from "@/lib/utils";

type BoardGroupProps = {
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
  onValueChangeAction: (v: BoardItem) => void;
  defaultValue?: BoardItem;
  value?: BoardItem;
};

type BoardCardProps = {
  board: BoardItem;
  onClickAction: () => void;
  isSelected: boolean;
};

export function BoardGroup(props: BoardGroupProps): React.ReactElement {
  const { boardsPromise, onValueChangeAction, defaultValue, value } = props;
  const boards = use(boardsPromise);

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {boards.items.map((board) => (
          <BoardGroupItem
            key={board.id}
            board={board}
            onClickAction={() => {
              onValueChangeAction(board);
            }}
            isSelected={
              value
                ? value.id === board.id
                  ? true
                  : false
                : defaultValue?.id === board.id
                  ? true
                  : false
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function BoardGroupItem(props: BoardCardProps) {
  const { onClickAction, board, isSelected } = props;

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
            isSelected
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
          <div className="h-[48px] p-1 text-left overflow-ellipsis">
            <SectionHeading>{board.name}</SectionHeading>
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
