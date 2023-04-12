import classNames from "classnames";
import { Component } from "react";

import './Pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    };

    return range;
};

export class Pagination extends Component {

    state = { currentPage: 1 };

    /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */

    totalPages = 42;
    pageNeighbours = 2;

    fetchPageNumbers = () => {
        const currentPage = this.state.currentPage;

        /**
     * totalNumbers: the total page numbers to show on the control
     */
        const totalNumbers = (this.pageNeighbours * 2) + 3;

        const startPage = Math.max(2, currentPage - this.pageNeighbours);
        const endPage = Math.min(this.totalPages - 1, currentPage + this.pageNeighbours);
        let pages = range(startPage, endPage);

        /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (this.totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            };

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            };

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            };
        };

        return [1, ...pages, this.totalPages];
    };

    gotoPage = (page) => {
        this.props.onCurrentPage(page);
        this.setState({ currentPage: page });
    };

    handleMoveLeft = () => {
        this.gotoPage(this.state.currentPage - 1);
    };

    handleMoveRight = () => {
        this.gotoPage(this.state.currentPage + 1);
    };

    componentDidUpdate = (prevProps) => {
        const { pagination } = this.props;
        if (pagination !== prevProps.pagination) {
            if (!pagination) {
                this.setState({ currentPage: 1 });
            };
        };
    };

    render() {
        const { currentPage } = this.state;
        const { pagination } = this.props;
        const pages = this.fetchPageNumbers();

        return (
            <ul className={classNames("pagination", { active: pagination })}>
                {pages.map((page, index) => {

                    if (page === LEFT_PAGE) return (
                        <li className="pagination__item" key={index} onClick={this.handleMoveLeft}>
                            &laquo;
                        </li>
                    );

                    if (page === RIGHT_PAGE) return (
                        <li className="pagination__item" key={index} onClick={this.handleMoveRight}>
                            &raquo;
                        </li>
                    );

                    return (
                        <li
                            key={index}
                            className={classNames("pagination__item", { 'active': currentPage === page })}
                            onClick={() => this.gotoPage(page)}
                        >
                            {page}
                        </li>
                    )
                })}


            </ul>
        )
    }
}