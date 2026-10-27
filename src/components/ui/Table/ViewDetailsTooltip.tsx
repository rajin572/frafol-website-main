"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";

// "Zobraziť detaily" tooltip of the eye icon in the tables. On a touch screen the tooltip opens when
// the icon is tapped and never closes by itself (there is no mouse to leave it), so it stayed
// floating above the order modal that the tap opened. Touch screens get no tooltip.
const ViewDetailsTooltip = ({
  children,
  title = "Zobraziť detaily",
}: {
  children: React.ReactElement;
  title?: string;
}) => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <Tooltip placement="right" title={title} open={isTouch ? false : undefined}>
      {children}
    </Tooltip>
  );
};

export default ViewDetailsTooltip;
