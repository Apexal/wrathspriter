import { Component } from "react";
import HelpButton from "../components/HelpButton";

export interface ModalShow {
    show: boolean;
    handler: HelpButton;
}

class Modal extends Component<ModalShow> {
    constructor(props: ModalShow) {
        super(props);
    }
    render() {
        if (!this.props.show) return null;
        return (
            <div>
                <div>
                    <h2>{this.props.handler.props.heading}</h2>
                    <p>{this.props.handler.props.message}</p>
                </div>
                <div>
                    <button onClick = {this.props.handler.hideModal}>Close</button>
                </div>
            </div>
        );
    }
}

export default Modal;