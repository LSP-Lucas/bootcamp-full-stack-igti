import React, { Component } from 'react'
import Input from './Input'

export default class Transformation extends Component {
  render() {
    const { id, value, description } = this.props;

    return (
      <Input 
        id={id}
        allowCopy
        value={value}
        description={description}
        readOnly
      />
    )
  }
}
