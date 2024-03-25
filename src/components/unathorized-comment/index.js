import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function UnathorizedComment({link, level}) {

  const cn = bem('UnathorizedComment');

  return (
    <div style={{marginLeft: (30 * level) + 'px'}} className={cn()}>
      <p className={cn('text')}><Link className={cn('link')} to={link}></Link></p>
    </div>
  )
}

UnathorizedComment.propTypes = {
  link: PropTypes.string.isRequired,
  level: PropTypes.number,
};

UnathorizedComment.defaultProps = { link: '/', level: 0 }

export default memo(UnathorizedComment);
