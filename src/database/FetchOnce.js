import React from 'react';

export default function FetchOnce(firebaseApp, propName, callback) {
  return function(WrappedComponent) {
    return class HOC extends React.Component {
      state = {
        loading: false,
        data: null,
        error: null
      };

      componentDidMount() {
        this.fetchOnce(callback);
      }

      async fetchOnce(asyncCallback) {
        this.setState({
          loading: true
        });

        try {
          const snapshot = await asyncCallback(firebaseApp.database(), this.props, this.state)
          .once('value');
          const data = snapshot.val();

          this.setState({
            data,
            loading: false
          });
        } catch (e) {
          this.setState({
            loading: false,
            error: e
          });
        }
      }

      render() {
        const sharedProps = {
          [propName]: {
            loading: this.state.loading,
            data: this.state.data,
            error: this.state.error
          }
        };

        return (
          <WrappedComponent {...sharedProps} {...this.props} />
        );
      }
    }
  }
}
