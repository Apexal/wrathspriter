import { Component } from "react";
import { ModalShow } from "../components/Modal";
import Modal from "../components/Modal";

interface HelpProps {
    heading: string;
    message: string;
}
  
class HelpButton extends Component<HelpProps, ModalShow> {
    constructor(props: HelpProps) {
        super(props);

        this.state = {
            show: false,
            handler: this
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    render() {  
        return (
            <div>
                <Modal show={this.state.show} handler={this} />
                <button type="button" onClick = {this.showModal}>?</button>
            </div>
        );
    }
}
  
  export default HelpButton;