import { Component } from 'react';

import { CharList } from './components/CharList/CharList';
import { CharInfo } from './components/CharInfo';

import './App.css';
import { Pagination } from './components/Pagination/Pagination';

export class App extends Component {

  state = {
    modalOpen: false,
    selectedId: null,
    currentPage: 1,
    pagination: false,
  };

  onModal = (id) => {
    this.setState({
      modalOpen: true,
      selectedId: id,
    });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  onCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  togglePagination = (pagination) => {
    this.setState({ pagination });
  };

  render() {
    const { modalOpen, selectedId, currentPage, pagination } = this.state;

    return (
      <>
        <CharList
          onModal={this.onModal}
          currentPage={currentPage}
          togglePagination={this.togglePagination}
          onCurrentPage={this.onCurrentPage}
        />
        <CharInfo
          onModal={modalOpen}
          closeModal={this.closeModal}
          selectedId={selectedId}
        />
        <Pagination
          onCurrentPage={this.onCurrentPage}
          pagination={pagination}
        />
      </>
    );
  };
};