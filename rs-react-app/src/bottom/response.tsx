import React from 'react';
import rfetch from '../other/rfetch';
import { ResponseProps, ResponseState } from '../other/interfases';
import Card from './card/card';
import './response.css';

class Response extends React.Component<ResponseProps> {
  state: ResponseState = {
    data: null,
    error: null,
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
    if (error) {
      return (
        <div className="response_other">
          <p>Error: {error}</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="response_other">
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div className="response">
        {data.map((person) => (
          <Card key={person.name} {...person} />
        ))}
      </div>
    );
  }
}

export default Response;
