import React, { useState } from "react";

const SocialLinkModal = ({ show, onClose, onSave, title, currentLink }) => {
  const [link, setLink] = useState(currentLink);

  const handleSave = () => {
    onSave(link);
    onClose();
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="socialLinkModal"
      aria-hidden={!show}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Update ${title} Link`}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={`Enter your ${title} link`}
              className="form-control"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinkModal;
