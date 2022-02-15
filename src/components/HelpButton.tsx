import { Component } from "react";

interface HelpProps {
    heading: string;
    message: string;
}
  
class HelpButton extends Component<HelpProps> {
    constructor(props: HelpProps) {
        super(props);

        this.state = {
            show: false
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
            <button type="button" onClick = {this.showModal}>{this.props.heading}</button>
        );
    }
}
  
  export default HelpButton;