<h2 align="center">Restaurants Control App</h3>

<!-- ABOUT THE PROJECT -->
![Alt text](/public/restaurantApp.png?raw=true "restaurantApp.png")

## О проекте
<p>
Клиент-серверное взаимодействие реализовано через RTK Query, UI-библиотека - Material UI, валидация через Formik+Yup(можно было валидировать проще, просто хотел показать, что этими инструментами владею:). Дополнительные данные в БД добавлены для прохождения тестов.
</p>

## Запуск

Сперва запустите БД:

```sh
  json-server --watch ./src/api/db.json
```
А затем:

```sh
  yarn start
  ```

