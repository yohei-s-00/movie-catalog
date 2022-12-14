import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { CheckBoxProps, CheckBoxs } from "./CheckBoxs";

export type RhfdCheckBoxProps<T extends FieldValues> = CheckBoxProps &
  UseControllerProps<T>;

export const ChechBoxsField = <T extends FieldValues>(
  props: RhfdCheckBoxProps<T>
) => {
  const { name, control, label, items, row } = props;
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control });
  return (
    <CheckBoxs
      label={label}
      items={items}
      row={row}
      {...rest}
      error={
        errors[name] &&
        `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`
      }
    />
  );
};
