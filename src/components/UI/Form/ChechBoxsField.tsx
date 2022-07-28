import { FC } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { CheckBoxProps, CheckBoxs } from "./CheckBoxs";

export type RhfdCheckBoxProps<T extends FieldValues> = CheckBoxProps & UseControllerProps<T>;

export const ChechBoxsField = <T extends FieldValues>(props: RhfdCheckBoxProps<T>) => {
  const {name, control, label, items} = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController({ name, control });
  return <CheckBoxs label={label} items={items} {...rest} />;
};
