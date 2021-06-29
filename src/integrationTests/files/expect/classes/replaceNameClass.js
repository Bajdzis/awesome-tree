import replaceNameContent from '../site/replaceNameComponent/replaceName.html';
import styleForReplaceName from '../site/replaceNameComponent/replaceName.scss';

export class ReplaceName extends HTMLElement {

    constructor(document) {
        super();
        document.head.appendChild(styleForReplaceName);
    }

    showSubmenu() {
        // show submenu
    }

    render() {
        return replaceNameContent;
    }

}
