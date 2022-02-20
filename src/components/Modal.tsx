import React from "react";

interface ModalProps {
    heading: string;
    children: JSX.Element[];
    setShow: (set: boolean) => void;
    show: boolean;
}

function Modal(props: ModalProps) {

    let modalClass: string = "modal";
    if (props.show) modalClass = "modal is-active";

    return (
    <div>
        <div className = {modalClass}>
            <div className = "modal-background"></div>
            <div className = "modal-card">
                <header className = "modal-card-head has-text-centered">
                    <h1 className = "modal-card-title">{props.heading}</h1>
                    <button className = "delete" onClick = {() => {props.setShow(false);}}></button>
                </header>
                <div className = "modal-card-body">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Modal;