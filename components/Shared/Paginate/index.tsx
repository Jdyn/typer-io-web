import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

interface Props {
  defaultPage?: number;
  totalPages?: number;
  pageUpdated: (newPageNumber) => void;
}

const Paginate = ({ defaultPage, totalPages, pageUpdated }: Props): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(defaultPage);
  }, [defaultPage]);

  const setPage = (newPage: number): void => {
    if ((totalPages ? newPage <= totalPages : true) && newPage >= 1 && newPage !== currentPage) {
      setCurrentPage(newPage);
      pageUpdated(newPage);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.pageButton} onClick={() => setPage(1)} type="button">
        1
      </button>
      <button
        className={styles.pageButton}
        onClick={() => setPage(currentPage - 1)}
        type="button"
      >{`<`}</button>
      <span>{currentPage}</span>
      <button
        className={styles.pageButton}
        onClick={() => setPage(currentPage + 1)}
        type="button"
      >{`>`}</button>
      {totalPages && (
        <button className={styles.pageButton} onClick={() => setPage(totalPages)} type="button">
          {totalPages || 1}
        </button>
      )}
    </div>
  );
};

Paginate.defaultProps = {
  totalPages: null,
  defaultPage: null
};

export default Paginate;
