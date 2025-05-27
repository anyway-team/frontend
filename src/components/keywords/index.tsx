import { Badge } from '../ui/badge';
import styles from './keyword.module.css';
import commonStyles from '../common.module.css';
export const Keywords = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
      className={styles.keywordWrapper}
    >
      {new Array(10).fill(0).map((_, index) => (
        <Badge
          variant="secondary"
          key={index}
          className={commonStyles.pressable}
          style={{
            width: 100,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          키워드 {index}
        </Badge>
      ))}
    </div>
  );
};
