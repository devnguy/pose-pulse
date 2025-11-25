import { useEffect, useMemo, useRef, useState } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import invariant from "tiny-invariant";
import * as ReactDOM from "react-dom";

type DragAndDropState =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement;
    }
  | {
      type: "is-over";
      closestEdge: Edge | null;
    };

type DragAndDropReorderConfig<Item> = {
  index: number;
  item: Item;
  move: (from: number, to: number) => void;
};

// TODO:
// 1. use item for preview. right now it effectively does nothing
// 2. don't take any action when source ends up in the same index
//  specifically when hovering over adjacent drop areas
export function useDragAndDropReorder<Item>(
  config: DragAndDropReorderConfig<Item>,
) {
  const { index, item, move } = config;

  const ref = useRef<HTMLTableRowElement>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const [dragAndDropState, setDragAndDropState] = useState<DragAndDropState>({
    type: "idle",
  });

  useEffect(() => {
    const element = ref.current;
    const dragHandle = dragHandleRef.current;
    invariant(element);
    invariant(dragHandle);

    const isFirst = index === 0;

    return combine(
      draggable({
        element,
        dragHandle,
        getInitialData() {
          return {
            ...item,
            index,
          };
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            render: ({ container }) => {
              setDragAndDropState({ type: "preview", container });
              return () => setDragAndDropState({ type: "idle" });
            },
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
          });
        },
        onDragStart({ source }) {
          source.element.style.opacity = "0.4";
          setDragAndDropState({ type: "preview", container: source.element });
        },
        onDrop({ source }) {
          source.element.style.opacity = "1";
          setDragAndDropState({ type: "idle" });
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          return source.data.index !== index; // change this to id
        },
        getData({ input, element }) {
          const data = { ...item, index };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter(args) {
          setDragAndDropState({
            type: "is-over",
            closestEdge: extractClosestEdge(args.self.data),
          });
        },
        onDragLeave() {
          setDragAndDropState({ type: "idle" });
        },
        onDrag({ source, self }) {
          const closestEdge: Edge | null = extractClosestEdge(self.data);

          // only update react state if the `closestEdge` changes
          setDragAndDropState((current) => {
            const sourceIndex = source.data.index;
            invariant(typeof sourceIndex === "number");

            if (current.type !== "is-over") {
              return current;
            }
            if (current.closestEdge === closestEdge) {
              return current;
            }
            return {
              type: "is-over",
              closestEdge,
            };
          });
        },
        onDrop({ source, self }) {
          invariant(typeof source.data.index === "number");
          invariant(typeof self.data.index === "number");

          const sourceIndex = source.data.index;
          invariant(typeof sourceIndex === "number");
          const isItemBeforeSource = index < sourceIndex;
          const isItemAfterSource = index > sourceIndex;

          // TODO: this is ugly
          if (dragAndDropState.type === "is-over") {
            if (isItemAfterSource) {
              if (dragAndDropState.closestEdge === "top") {
                if (isFirst) {
                  move(source.data.index, 0);
                } else {
                  move(source.data.index, self.data.index - 1);
                }
              } else if (dragAndDropState.closestEdge === "bottom") {
                move(source.data.index, self.data.index);
              }
            } else if (isItemBeforeSource) {
              if (dragAndDropState.closestEdge === "top") {
                move(source.data.index, self.data.index);
              } else if (dragAndDropState.closestEdge === "bottom") {
                move(source.data.index, self.data.index + 1);
              }
            }
          }
          setDragAndDropState({ type: "idle" });
          if (source.element) {
            triggerPostMoveFlash(source.element);
          }
        },
      }),
    );
  }, [item, index, move, dragAndDropState]);

  const Preview = ({ content }: { content: string }) =>
    dragAndDropState.type === "preview" &&
    ReactDOM.createPortal(
      <div className="bg-white py-2 px-3">{content}</div>,
      dragAndDropState.container,
    );

  return {
    ref,
    dragHandleRef,
    dragAndDropState,
    Preview,
  };
}
