import React from "react";
import "./Drawer.css";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ onClose, children, header }) => {
  return (
    <div className="drawerOverlay" onClick={onClose}>
      <div className="drawerOverlayBlur">
        <div className="drawer" onClick={(e) => e.stopPropagation()}>
          {header && (
            <div className="drawerHeader">
              <div className="drawerHeaderTitle">
                <span>{header}</span>
              </div>
              <button onClick={onClose} className="closeButton">
                <CloseIcon />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
