import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const DialogModel = ({ visible, onHide, onConfirm, title }) => {
  return (
    <div>
      <Dialog
        dir="rtl"
        style={{ width: "37%" }}
        visible={visible}
        onHide={onHide}
        header="تنويه"
        footer={
          <div className="" style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button label="إلغاء" className="p-button-text text-dark" onClick={onHide} />

            <Button
              label="الذهاب"
              className="p-button-text bg-warning rounded-2 text-dark"
              onClick={onConfirm}
            />{" "}
          </div>
        }
      >
        <div className="fs-5">{title}</div>
      </Dialog>
    </div>
  );
};

export default DialogModel;
