import React from "react";

export default ({ onClose, renderHeader, renderBody, renderFooter }) => {
  return (
    <div className="paper _center">
      {
        onClose && typeof onClose === 'function' &&
        <div className="button-close" onClick={onClose}>
          <i className="fa fa-times" />
        </div>
      }
      <div className="paper-header">
        {renderHeader}
      </div>
      <div className="paper-body">
        {renderBody}
      </div>
      <div className="paper-footer">
        {renderFooter}

      </div>
    </div>
  );
};
