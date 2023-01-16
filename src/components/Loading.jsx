import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={250} width={250} />
);

export default Loading;