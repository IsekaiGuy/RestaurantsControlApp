import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiPhoneNumber from 'material-ui-phone-number';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from "yup";
import { useFormik } from "formik";

const theme = createTheme();

interface Props {
  onAddUser: (phone: string) => void;
}

const AuthPage: React.FC<Props> = (props) => {
  const [state, setState] = useState(false);

  interface MyFormValues {
    phone: string,
    password: string
  }

  const initialValues: MyFormValues = {
    phone: "",
    password: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    initialErrors: initialValues,
    validationSchema: state ? Yup.object({
      phone: Yup.string().min(18, "Минимум 10 символов!").matches(/\+7 \(950\) 999-88-77/, "Пользователь не существует").required("Обязательное поле!"),
      password: Yup.string().min(4, "Минимум 4 символа!").matches(/1111/, "Неверный код").required("Обязательное поле!")
    }) : Yup.object({
      phone: Yup.string().min(18, "Минимум 10 символов!").matches(/\+7 \(950\) 999-88-77/, "Пользователь не существует").required("Обязательное поле!"),
    })
    ,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: MyFormValues) => {
      const phone = values.phone;
      setState(true);

      if (state) props.onAddUser(phone);
      // console.log(JSON.stringify(values, null, 2));
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <MuiPhoneNumber defaultCountry={'ru'}
              margin="normal"
              error={formik.errors.phone ? true : false}
              autoFocus
              onChange={(e: any) => formik.setFieldValue("phone", e)}
              name="phone"
              label="Номер телефона"
              id="phone"
              variant="outlined"
              value={formik.values.phone}
              required
            />
            {formik.errors.phone && formik.touched.phone ? <div>{formik.errors.phone}</div> : null}
            {state && (<TextField
              margin="normal"
              error={formik.errors.password ? true : false}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Код из смс"
              type="password"
              id="password"
            />)}
            {state && formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {state ? "Войти" : "Отправить СМС"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AuthPage;