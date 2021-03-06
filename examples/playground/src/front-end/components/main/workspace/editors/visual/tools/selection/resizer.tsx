import "./resizer.scss";
import React =  require("react");
import { pure, compose, withHandlers } from "recompose";
import { Workspace, getBoxedWorkspaceSelection, getWorkspaceSelectionBox } from "front-end/state";
import { resizerMoved } from "front-end/actions";
import { startDOMDrag, Dispatcher, mergeBoxes, moveBox } from "aerial-common2";
import { PathComponent } from "./path";

export type ResizerComponentOuterProps = {
  dispatch: Dispatcher<any>;
  workspace: Workspace;
}

export type ResizerComponentInnerProps = {
  onMouseDown: (event: React.MouseEvent<any>) => any;
} & ResizerComponentOuterProps;

const POINT_STROKE_WIDTH = 1;
const POINT_RADIUS       = 4;


export const ResizerComponentBase = ({ workspace, dispatch, onMouseDown }: ResizerComponentInnerProps) => {

  const box = getWorkspaceSelectionBox(workspace);
  const zoom = workspace.visualEditorSettings.translate.zoom;

  // offset stroke
  const resizerStyle = {
    position : "absolute",
    left     : box.left,
    top      : box.top,
    width    : box.right - box.left,
    height   : box.bottom - box.top,
    transform: `translate(-${POINT_RADIUS / zoom}px, -${POINT_RADIUS / zoom}px)`,
    transformOrigin: "top left"
  };

  const points = [
    { left: 0, top: 0 },
    { left: .5, top: 0 },
    { left: 1, top: 0 },
    { left: 1, top: .5 },
    { left: 1, top: 1 },
    { left: .5, top: 1 },
    { left: 0, top: 1 },
    { left: 0, top: 0.5 },
  ];

  return <div className="m-resizer-component">
    <div
      className="m-resizer-component--selection"
      style={resizerStyle as any}
      onMouseDown={onMouseDown}
    >
      <PathComponent
        zoom={zoom}
        points={points}
        workspace={workspace}
        box={box}
        strokeWidth={POINT_STROKE_WIDTH}
        dispatch={dispatch}
        pointRadius={POINT_RADIUS}
      />
    </div>
  </div>
}

const enhanceResizerComponent = compose<ResizerComponentInnerProps, ResizerComponentOuterProps>(
  pure,
  withHandlers({
    onMouseDown: ({ dispatch, workspace }: ResizerComponentOuterProps) => (event: React.MouseEvent<any>) => {
      const { translate } = workspace.visualEditorSettings;
      const box = getWorkspaceSelectionBox(workspace);
      const translateLeft = translate.left;
      const translateTop  = translate.top;
      startDOMDrag(event, (event2, { delta }) => {
        dispatch(resizerMoved(workspace.$$id, {
          left: box.left + delta.x / translate.zoom,
          top: box.top + delta.y / translate.zoom,
        }));
      });
    }
  })
);

export const ResizerComponent = enhanceResizerComponent(ResizerComponentBase);
export * from "./path";