import {
  Box,
  Typography,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { currency } from "../utils/currency";

export const PaymentPlan: FC<{ data: CalcData }> = ({ data }) => {
  return (
    <Box mt={5}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Tilgungsplan
      </Typography>
      <Box mt={1} mb={5} data-testid="payment-totals">
        <Box display="flex">
          <Typography fontWeight={700}>Gesamtzahlung:</Typography>
          <Typography ml={1}>{currency(data.totals.totalPayment)}</Typography>
        </Box>
        <Box display="flex">
          <Typography fontWeight={700}>Zinsanteil:</Typography>
          <Typography ml={1}>{currency(data.totals.interest)}</Typography>
        </Box>
        <Box display="flex">
          <Typography fontWeight={700}>Tilgungsanteil:</Typography>
          <Typography ml={1}>{currency(data.totals.payment)}</Typography>
        </Box>
        <Box display="flex">
          <Typography fontWeight={700}>Restschuld:</Typography>
          <Typography ml={1}>{currency(data.totals.restPayment)}</Typography>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ minWidth: 320 }}
        data-testid="payment-plan"
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Monatsende</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Ratenhöhe
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Zinsanteil
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Tilgungsanteil
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Restschuld
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row) => (
              <TableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">
                  {currency(row.monthPayment)}
                </TableCell>
                <TableCell align="right">{currency(row.fee)}</TableCell>
                <TableCell align="right">{currency(row.payment)}</TableCell>
                <TableCell align="right">{currency(row.restAmount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
