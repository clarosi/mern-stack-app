// import React, { Component } from 'react';

// import { LOGIN_LINK, HOME_LINK } from '../../shared/strings';
// import { getRequest } from '../../shared/utils';
// import { SpinnerGrow } from '../../components/Common';

// export default (WrappedComponent, isProtected) => {
//   class Auth extends Component {
//     state = { isLoading: false };

//     async componentWillMount() {
//       const { push } = this.props.history;

//       if (isProtected) {
//         this.setState({ isLoading: true });
//         const res = await getRequest(`api/users?token=TODO`);
//         this.setState({ isLoading: false });

//         if (res.error) return push(LOGIN_LINK);
//         return push(HOME_LINK);
//       }

//       return push(HOME_LINK);
//     }

//     render() {
//       if (this.state.isLoading) return <SpinnerGrow />;
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   return Auth;
// };
