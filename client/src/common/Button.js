import React from 'react';

function Button(props) {
  if (props.link) {
    return (
      <a href={props.link} className={props.small ? 'small button' : 'button'} onClick={props.onClick}>
        {props.iconLink && <span className="button-icon" style={{ backgroundImage: 'url(' + props.iconLink + ')' }} />}
        {props.value}
      </a>
    );
  } else {
    return <input type="button" className={props.small ? 'small button' : 'button'} onClick={props.onClick} value={props.value} />;
  }
}

export default Button;
