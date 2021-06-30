import awesomeContent from '../site/awesomeComponent/awesome.html';
import styleForAwesome from '../site/awesomeComponent/awesome.scss';

export class Awesome extends HTMLElement {

    constructor(document) {
        super();
        document.head.appendChild(styleForAwesome);
    }


    render() {
        return awesomeContent;
    }

}
