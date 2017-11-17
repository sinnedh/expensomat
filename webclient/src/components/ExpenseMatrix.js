import React from 'react';
import {formatAmount} from '../utils';

const item = (index, fromMember, toMember, amount) => (
  <li key={index}>
    From {fromMember.name} to {toMember.name}: {formatAmount(amount)}
  </li>
)

export default (props) => (
  <ul>
    {Object.keys(props.elements).map((key, index) => item(
      index,
      props.members.find(e => e.id.toString() === key.split("_")[0]),
      props.members.find(e => e.id.toString() === key.split("_")[1]),
      props.elements[key],
    ))}
  </ul>
)
