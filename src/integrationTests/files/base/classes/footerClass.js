import footerContent from '../site/footerComponent/footer.html';
import styleForFooter from '../site/footerComponent/footer.scss';

export class Footer extends HTMLElement {

    constructor(document) {
        super();
        document.head.appendChild(styleForFooter);
    }

    sendMessage() {
        // send message
    }

    render() {
        return footerContent;
    }

}
