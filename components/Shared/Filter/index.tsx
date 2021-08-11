import { useState, useEffect, memo } from 'react';
import styles from './index.module.css';

interface IFilter {
  name: string;
  key: string;
}

interface Props {
  filters: IFilter[];
  selectedIndex?: number;
  selectedFilter?: string;
  extended?: boolean;
  noSelect?: boolean;
  onClick?: (currentIndex?: number, filter?: IFilter) => void;
  untargetableIndices: number[];
  fontSize?: string;
}

const Filter = (props: Props): JSX.Element => {
  const {
    filters,
    selectedIndex,
    onClick,
    untargetableIndices,
    selectedFilter,
    extended,
    noSelect,
    fontSize
  } = props;

  const [state, set] = useState<number | string>(selectedIndex || 0);

  useEffect(() => {
    if (selectedIndex) {
      set(selectedIndex);
    }

    if (selectedFilter) {
      set(selectedFilter);
    }
  }, [selectedIndex, filters, selectedFilter]);

  const handleClick = (index: number): void => {
    if (typeof onClick === 'function') {
      onClick(index, filters[index]);
    }
    set(index);
  };

  return (
    <div className={`${styles.root} ${extended ? styles.extended : ''} `}>
      {filters.map((filter, index) => {
        const disabled = untargetableIndices.includes(index);
        const select = (state === index || state === filter.key) && !noSelect;
        return (
          <button
            key={filter.name}
            type="button"
            className={`${styles.item} ${select ? styles.selected : ''} ${
              disabled ? styles.disabled : ''
            } `}
            onClick={(): void => handleClick(index)}
            style={{
              width: `calc(100% / ${filters.length})`,
              fontSize
            }}
          >
            {filter.name}
          </button>
        );
      })}
    </div>
  );
};

Filter.defaultProps = {
  untargetableIndices: [],
  selectedFilter: null,
  selectedIndex: null
} as Partial<Props>;

export default memo(Filter);
