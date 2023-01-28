// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as Paged from 'node_modules/pagedjs/dist/paged.esm.js';
//import * as Paged from 'pagedjs/dist/paged.esm';
// } from '../ pagedjs/dist/paged.esm';

/**
 * 
 * @param source {string}
 * @param target {HTMLElement}
 * @returns {Promise<{size:number, performance:TimeRanges, total:number,pages:any[]}>} a Promise
 */
export function doPaged(source, target) {

    const paged = new Paged.Previewer();
    Paged.registerHandlers(RepeatingTableHeadersHandler);
    if (!style)
        style = removeStyles()

    return paged.preview(source, style, target);
}

let style;

function removeStyles() {
    // Get all stylesheets
    const stylesheets = Array.from(document.querySelectorAll("link[rel='stylesheet']"));
    // Get inline styles
    const inlineStyles = Array.from(document.querySelectorAll("style:not([data-pagedjs-inserted-styles])"));
    const elements = [...stylesheets, ...inlineStyles];
    return elements
        // preserve order
        .sort(function (element1, element2) {
            const position = element1.compareDocumentPosition(element2);
            if (position === Node.DOCUMENT_POSITION_PRECEDING) {
                return 1;
            } else if (position === Node.DOCUMENT_POSITION_FOLLOWING) {
                return -1;
            }
            return 0;
        })
        .filter(element=> !element.attributes.getNamedItem('data-vite-dev-id').value.endsWith('src/css/theme.css'))
        // extract the href
        .map((element) => {
            if (element.nodeName === "STYLE") {
                const obj = {};
                obj[window.location.href] = element.textContent;
                console.log("style", obj[window.location.href], window.location.href)
                // element.remove();
                return obj;
            }
            if (element.nodeName === "LINK") {
                // element.remove();
                return element.href;
            }
            // ignore
            console.warn(`Unable to process: ${element}, ignoring.`);
        });
}


class RepeatingTableHeadersHandler extends Paged.Handler {

    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.splitTablesRefs = [];
    }

    afterPageLayout(pageElement, page, breakToken, chunker) {
        this.chunker = chunker;
        this.splitTablesRefs = [];

        if (breakToken) {
            const node = breakToken.node;
            const tables = this.findAllAncestors(node, "table");
            if (node.tagName === "TABLE") {
                tables.push(node);
            }

            if (tables.length > 0) {
                this.splitTablesRefs = tables.map(t => t.dataset.ref);

                //checks if split inside thead and if so, set breakToken to next sibling element
                let thead = node.tagName === "THEAD" ? node : this.findFirstAncestor(node, "thead");
                if (thead) {
                    let lastTheadNode = thead.hasChildNodes() ? thead.lastChild : thead;
                    breakToken.node = this.nodeAfter(lastTheadNode, chunker.source);
                }

                this.hideEmptyTables(pageElement, node);
            }
        }
    }

    hideEmptyTables(pageElement, breakTokenNode) {
        this.splitTablesRefs.forEach(ref => {
            let table = pageElement.querySelector("[data-ref='" + ref + "']");
            if (table) {
                let sourceBody = table.querySelector("tbody > tr");
                if (!sourceBody || this.refEquals(sourceBody.firstElementChild, breakTokenNode)) {
                    table.style.visibility = "hidden";
                    table.style.position = "absolute";
                    let lineSpacer = table.nextSibling;
                    if (lineSpacer) {
                        lineSpacer.style.visibility = "hidden";
                        lineSpacer.style.position = "absolute";
                    }
                }
            }
        });
    }

    refEquals(a, b) {
        return a && a.dataset && b && b.dataset && a.dataset.ref === b.dataset.ref;
    }

    findFirstAncestor(element, selector) {
        while (element.parentNode && element.parentNode.nodeType === 1) {
            if (element.parentNode.matches(selector)) {
                return element.parentNode;
            }
            element = element.parentNode;
        }
        return null;
    }

    findAllAncestors(element, selector) {
        const ancestors = [];
        while (element.parentNode && element.parentNode.nodeType === 1) {
            if (element.parentNode.matches(selector)) {
                ancestors.unshift(element.parentNode);
            }
            element = element.parentNode;
        }
        return ancestors;
    }

    // The addition of repeating Table Headers is done here because this hook is triggered before overflow handling
    layout(rendered, layout) {
        this.splitTablesRefs.forEach(ref => {
            const renderedTable = rendered.querySelector("[data-ref='" + ref + "']");
            if (renderedTable) {
                // this event can be triggered multiple times
                // added a flag repeated-headers to control when table headers already repeated in current page.
                if (!renderedTable.getAttribute("repeated-headers")) {
                    const sourceTable = this.chunker.source.querySelector("[data-ref='" + ref + "']");
                    this.repeatColgroup(sourceTable, renderedTable);
                    this.repeatTHead(sourceTable, renderedTable);
                    renderedTable.setAttribute("repeated-headers", true);
                }
            }
        });
    }

    repeatColgroup(sourceTable, renderedTable) {
        let colgroup = sourceTable.querySelectorAll("colgroup");
        let firstChild = renderedTable.firstChild;
        colgroup.forEach((colgroup) => {
            let clonedColgroup = colgroup.cloneNode(true);
            renderedTable.insertBefore(clonedColgroup, firstChild);
        });
    }

    repeatTHead(sourceTable, renderedTable) {
        let thead = sourceTable.querySelector("thead");
        if (thead) {
            let clonedThead = thead.cloneNode(true);
            renderedTable.insertBefore(clonedThead, renderedTable.firstChild);
        }
    }

    // the functions below are from pagedjs utils/dom.js
    nodeAfter(node, limiter) {
        if (limiter && node === limiter) {
            return;
        }
        let significantNode = this.nextSignificantNode(node);
        if (significantNode) {
            return significantNode;
        }
        if (node.parentNode) {
            while ((node = node.parentNode)) {
                if (limiter && node === limiter) {
                    return;
                }
                significantNode = this.nextSignificantNode(node);
                if (significantNode) {
                    return significantNode;
                }
            }
        }
    }

    nextSignificantNode(sib) {
        while ((sib = sib.nextSibling)) {
            if (!this.isIgnorable(sib)) return sib;
        }
        return null;
    }

    isIgnorable(node) {
        return (node.nodeType === 8) || // A comment node
            ((node.nodeType === 3) && this.isAllWhitespace(node)); // a text node, all whitespace
    }

    isAllWhitespace(node) {
        return !(/[^\t\n\r ]/.test(node.textContent));
    }

}
