import React from 'react';
import './App.css';
import Top from './top/top';
import fsearch from './bottom/other/rfetch';

class App extends React.Component {
  state = {
    data: localStorage.getItem('search') || '',
  };

  updateData = (newData: string) => {
    const currentData = localStorage.getItem('search');
    if (newData === currentData) {
      return;
    }
    this.setState({ data: newData });
    localStorage.setItem('search', newData);
    fsearch(newData);
  };

  render(): React.ReactNode {
    return (
      <div className="main">
        <div className="app">
          <div className="top">
            <Top search={this.state.data} onSearch={this.updateData} />
          </div>
          <div className="bottom"></div>
        </div>
      </div>
    );
  }
}

export default App;
