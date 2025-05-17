import classNames from 'classnames';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortField {
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.None);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  switch (sortField) {
    case SortField.Alphabetically:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortField.ByLength:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortField(SortField.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-info': sortField === 'alphabetically',
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => setSortField(SortField.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-success': sortField === 'byLength',
            'is-light': sortField !== 'byLength',
          })}
          onClick={() => setSortField(SortField.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning': reversed,
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={classNames('button', {
              'is-danger': SortField.None,
              'is-light': !SortField.None,
            })}
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
