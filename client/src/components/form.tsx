import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { Stack, Box, Button } from "@mui/material";
import { validationSchema } from "../utils/validator";

type FormProps = {
  onSubmit: (data: CalcInput) => void;
};

export const Form: FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isValid, isSubmitted },
  } = useForm<CalcInput>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const changeHandler = useCallback(
    (field: keyof CalcInput) => async () => {
      const valid = await trigger(field);
      if (isSubmitted && valid) {
        onSubmit(getValues());
      }
    },
    [isSubmitted, trigger, getValues, onSubmit]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500 }}
    >
      <Stack spacing={2}>
        <TextField
          label="Darlehensbetrag (in &euro;)"
          type="number"
          min="1000"
          max="1000000"
          {...register("amount", {
            valueAsNumber: true,
            onChange: changeHandler("amount"),
          })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />
        <TextField
          label="Sollzins (%)"
          type="number"
          min="1"
          max="10"
          {...register("interestRate", {
            valueAsNumber: true,
            onChange: changeHandler("interestRate"),
          })}
          error={!!errors.interestRate}
          helperText={errors.interestRate?.message}
        />
        <TextField
          label="Tilgung (%)"
          type="number"
          min="1"
          max="10"
          {...register("repaymentRate", {
            valueAsNumber: true,
            onChange: changeHandler("repaymentRate"),
          })}
          error={!!errors.repaymentRate}
          helperText={errors.repaymentRate?.message}
        />
        <TextField
          label="Laufzeit (Jahre)"
          type="number"
          min="1"
          max="30"
          {...register("period", {
            valueAsNumber: true,
            onChange: changeHandler("period"),
          })}
          error={!!errors.period}
          helperText={errors.period?.message}
        />
      </Stack>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid}
          color="success"
        >
          Berechnen
        </Button>
      </Box>
    </Box>
  );
};
