# DA-Bach-BE

Các bước chạy:

1. cài đặt thư viện: `yarn`
2. sửa file .env cho kêt nối mysql
3. chạy server `yarn start`

- Lưu ý:

* tạo database trước khi start (thông qua workbench hoặc bất cứ trình quản trị database nào)
* lần đàu chạy thì bỏ comment dòng `sequelize.sync({ alter: true, force: true });` trong file `src/index.js`
* Mặc định sẽ chạy ở cổng 3000 theo như file `.env`
* Cần tạo 1 admin user (hướng đãn bên dưới), sau đó đăng nhập = tk này và tạo các user khác

## Tạo Admin user

- Sử dựng Postman hoặc bất kì công cụ tương tự call API với thông tin sau:

  ```
  url: localhost:3000/api/account/
  method: POST
  body: {
    "account": {
        "email": "linh@gmail.com",
        "password": "123456",
        "role": "ADMIN"
    }
  }
  ```

- hoặc curl:

```
curl --location 'localhost:3000/api/account/' \ --header 'Content-Type: application/json' \ --data-raw '{
    "account": {
        "email": "linh@gmail.com",
        "password": "123456",
        "role": "ADMIN"
    }
}'
```
