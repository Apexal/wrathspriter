import React, { useState } from "react";
import Modal from "./Modal";

interface HelpProps {
  heading: string;
  children: JSX.Element[];
}

function HelpButton(props: HelpProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="has-text-right">
        <button
          className="button js-modal-trigger"
          onClick={() => {
            setShow(true);
          }}
        >
          ?
        </button>
      </div>
      <Modal setShow={setShow} show={show} heading={props.heading}>
        {props.children}
      </Modal>
    </div>
  );
}

export default HelpButton;
