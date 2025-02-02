import React from 'react';
import rfetch from '../other/rfetch';
import { ResponseProps, ResponseState } from '../other/interfases';
import Card from './card/card';
import './response.css';
import Loading from '../other/Loading/Loading';

class Response extends React.Component<ResponseProps> {
  state: ResponseState = {
    data: null,
    error: null,
    errorband: false,
  };

  clickError = () => {
    this.setState({ errorband: true });
  };

  async fetchData(search: string) {
    const result = await rfetch(search);
    if ('error' in result) {
      this.setState({ error: result.error, data: null });
    } else {
      this.setState({ data: result.results, error: null });
    }
  }

  async componentDidMount() {
    this.fetchData(this.props.search);
  }

  async componentDidUpdate(prevProps: ResponseProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({ data: null, error: null });
      this.fetchData(this.props.search);
    }
  }

  render(): React.ReactNode {
    const { data, error } = this.state;
    if (this.state.errorband) {
      throw new Error('Error');
    }
    return (
      <div className="response_wrapper">
        {error ? (
          <div className="response_other">
            <p>Error: {error}</p>
          </div>
        ) : !data ? (
          <div className="response_other">
            <Loading />
          </div>
        ) : (
          <div className="response">
            {data.map((person) => (
              <Card key={person.name} {...person} />
            ))}
          </div>
        )}
        <button className="error_btn" onClick={this.clickError}>
          Error button
        </button>
      </div>
    );
  }
}

export default Response;
