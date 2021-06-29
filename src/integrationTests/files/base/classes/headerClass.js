import headerContent from '../site/headerComponent/header.html';
import styleForHeader from '../site/headerComponent/header.scss';

export class Header extends HTMLElement {

    constructor(document) {
        super();
        document.head.appendChild(styleForHeader);
    }

    showSubmenu() {
        // show submenu
    }

    render() {
        return headerContent;
    }

}
