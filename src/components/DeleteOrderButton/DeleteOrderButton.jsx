import React from 'react';

function DeleteOrderButton(props) {
  const { data, context } = props;

  const handleClick = () => {
    context.onDelete(data.id);
  };

  return (
    <img
      alt=''
      src='/red-trash-can-icon.svg'
      width='20'
      height='20'
      onClick={handleClick}
    />
  );
}

export default DeleteOrderButton;
