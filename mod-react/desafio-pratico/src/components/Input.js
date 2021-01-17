import React, { Component } from 'react'
import M from 'materialize-css';

export default class Input extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  handleCopy = () => {
    const { id } = this.props;
    const inputId = `input_${id}`;
    const inputElement = document.querySelector(`#${inputId}`);
    inputElement.select();
    document.execCommand('copy');
  }

  handleInputChange = ({ target }) => {
    const newText = target.value;
    this.props.onChange(newText);
  }

  render() {
    const { 
      id, 
      description, 
      value, 
      onChange=false, 
      autoFocus, 
      readOnly=false, 
      allowCopy=false 
    } = this.props;

    const inputId = `input_${id}`;
    const { inputStyle } = styles;

    return (
      <div style={inputStyle}>
        <div className="input-field" style={{ flex: 7 }}>
          <input 
            id={inputId} 
            type="text" 
            value={value} 
            onChange={this.handleInputChange} 
            autoFocus={autoFocus} 
            readOnly={readOnly}
          />
          <label id={inputId} >{ description }</label>
        </div>

        {allowCopy && (
          <button className="btn" onClick={this.handleCopy} style={{ marginLeft: '10px' }} >Copiar</button>
        )}
      </div>
    )
  }
}

const styles = {
  inputStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
