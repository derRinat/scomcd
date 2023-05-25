import { useCallback, useState } from "react";
import { Form } from "./components/form";
import { PaymentPlan } from "./components/payment-plan";
import { calculate } from "./utils/api";
import { Box, CssBaseline, Typography, Alert } from "@mui/material";
import { useError } from "./hooks/use-error";

export const App = () => {
  const [data, setData] = useState<CalcData>();
  const { error, setError } = useError();

  const onSubmitHandler = useCallback(
    async (data: CalcInput) => {
      setData(undefined);
      try {
        const result = await calculate(data);
        setData(result);
      } catch {
        setError(
          "Es ist ein Fehler aufgetreten. Bitte versuche es später nochmal"
        );
      }
    },
    [setError]
  );

  return (
    <>
      <CssBaseline />
      <Box
        justifyContent="center"
        alignItems="center"
        m={3}
        sx={{ maxWidth: 1500 }}
      >
        <Box display="flex">
          <Typography variant="h4" fontWeight={700} mb={3}>
            Tilgungsrechner
          </Typography>
        </Box>

        <Form onSubmit={onSubmitHandler} />
        {!!data && <PaymentPlan data={data} />}
        {!!error && (
          <Box mt={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>
    </>
  );
};
