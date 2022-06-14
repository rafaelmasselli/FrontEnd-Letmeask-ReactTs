import CopyImage from "../../assets/images/copy.svg";

import "./styles.scss";

type RoomCodeProps = {
  code: any;
};

export function RoomCode(props: RoomCodeProps) {
  function CopyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button className="room-code" onClick={CopyRoomCodeToClipBoard}>
      <div>
        <img src={CopyImage} alt="Copy room code" />
      </div>
      <span>{props.code}</span>
    </button>
  );
}
