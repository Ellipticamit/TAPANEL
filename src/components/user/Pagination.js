import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { paginationBar: {} };
    }

    getPage = currentPage => {
        const { pageSize, totalElements } = this.props;

        currentPage = currentPage || 1;
        var startPage, endPage = '';

        // calculate total pages
        var totalPages = Math.ceil(totalElements / pageSize) -1;
         
        // set start page and end page number
        if (totalPages < 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // start and end index
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalElements - 1);
        
        // ten pages to show
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };

    }

    setPage = currentPage => e => {
        let paginationData = this.getPage(currentPage);
        this.setState({
            paginationBar: paginationData
        });
        this.props.onPageChange(currentPage);
    }

    componentDidMount = () => {
        let currentPage = 1;
        let paginationData = this.getPage(currentPage);
        this.setState({
            paginationBar: paginationData
        });
    }

    render() {
        const { totalPages, pages, currentPage } = this.state.paginationBar;

        if (!pages || pages.length <= 1) {
            return null;
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={currentPage === 1 ? 'page-item disabled' : 'page-item' }>
                        <span className="page-link" onClick={this.setPage(0)}>First</span>
                    </li>
                    <li className={currentPage === 1 ? 'page-item disabled' : 'page-item' }>
                        <span className="page-link" onClick={this.setPage(currentPage -1 )}>Previous</span>
                    </li>
                    {pages.map((page, index) =>
                        <li className={currentPage === page ? 'page-item active' : 'page-item'}  key={index}>
                            <span className="page-link" onClick={this.setPage(page)}>{page}</span>
                        </li>
                    )}
                    <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item' }>
                        <span className="page-link" onClick={this.setPage(currentPage + 1 )}>Next</span>
                    </li>
                    <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item' }>
                        <span className="page-link" onClick={this.setPage(totalPages)}>Last</span>
                    </li>
                </ul>
            </nav>
        )
    }
}

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    totalElements: PropTypes.number.isRequired
}

Pagination.defaultProps  = {
    page: 0,
    pageSize: 20
}

export default Pagination;