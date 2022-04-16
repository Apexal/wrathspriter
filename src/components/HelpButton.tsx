import { useState } from "react";
import Modal from "./Modal";

import clsx from "clsx";

interface HelpProps {
  heading: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

/** Help button that opens a modal that displays the component children as help text. */
function HelpButton(props: HelpProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={clsx("has-text-right", props.className)}>
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
    </>
  );
}

export default HelpButton;
