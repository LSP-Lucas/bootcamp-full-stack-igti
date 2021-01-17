import React, { Component } from 'react';
import Input from './components/Input';
import Transformation from './components/Transformation';
import Transformations from './components/Transformations';
import * as stringHelpers from './helpers/stringHelpers';

const MY_TRANSFORMATIONS = [
  {
    id: 't1',
    description: 'CSV',
    transformFunction: text => text.split('').reverse().join(''),
  },
  {
    id: 't2',
    description: 'Texto invertido',
    transformFunction: text => 
      text
      .split(' ')
      .map(word => `"${word}"`)
      .join(';')
  },
  {
    id: 't3',
    description: 'Texto numérico',
    transformFunction: text => 
      stringHelpers
        .removeSpecialCharacteres(text)
        .toUpperCase().split('')
        .map(char => {
          if (char === 'O') return '0';
          if (char === 'A') return '4';
          if (char === 'E') return '3';
          if (char === 'I') return '1';
          if (char === 'S') return '5';
          if (char === 'T') return '7';

          return char;
        })
        .join('')
  },
  {
    id: 't4',
    description: 'Slug',
    transformFunction: text => 
      stringHelpers
        .removeSpecialCharacteres(text)
        .toLowerCase()
        .split(' ')
        .join('-')
  },
  {
    id: 't5',
    description: 'Somente vogais',
    transformFunction: text => 
      text
        .split('')
        .filter(char => char === ' ' || stringHelpers.isVowel(char))
        .join('')
  },
  {
    id: 't6',
    description: 'Somente consoantes',
    transformFunction: text => 
      text
        .split('')
        .filter(char => char === ' ' || stringHelpers.isConsonant(char))
        .join('')
  },
  {
    id: 't7',
    description: 'Variável',
    transformFunction: text => 
      stringHelpers
        .removeSpecialCharacteres(text)
        .split(' ')
        .map((word, index) => {
          return index === 0
            ? word.toLowerCase()
            : word.toLowerCase()
              .split('')
              .map((char, index) => {
                return index === 0 ? char.toUpperCase() : char;
              })
              .join('');
        }).join('')
  }
];

const defaultState = {
  userInput: 'Trabalho Prático'
}

export default class App extends Component {
  constructor() {
    super();

    this.state = { ...defaultState };
  }

  componentDidMount() {
    document.title = 'React Text Transformer';
  }

  handleUserInputChange = (newText) => {
    this.setState({ userInput: newText });
  }

  render() {
    const { userInput } = this.state;

    return (
      <div className="container">
        <h1>React Text Transformer</h1>

        <Input 
          id="userInput" 
          value={userInput} 
          onChange={this.handleUserInputChange} 
          description="Digite o texto aqui:"
          autoFocus
        />

        <Transformations>
          {MY_TRANSFORMATIONS.map(({ id, description, transformFunction }) => {
            const value = transformFunction(userInput);
            return (
              <Transformation
                key={id}
                id={id}
                description={description}
                value={value}
              />
            )
          })}
        </Transformations>
      </div>
    );
  }
}
