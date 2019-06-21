import React from 'react';
import { Link } from 'react-router-dom';

export const RouterLink = props => <Link {...props}>{props.children}</Link>;
