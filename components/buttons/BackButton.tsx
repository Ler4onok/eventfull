import React from "react";
import { Button } from "./Button";
import { ArrowBackIcon } from "../icons/ArrowBackIcon";

export const BackButton = ({ styles }: { styles?: string }) => {
  return (
    <Button styles={styles} href="/" text="Back" icon={<ArrowBackIcon />} />
  );
};
