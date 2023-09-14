# DA-Bach-BE

Các bước chạy:
1) cài đặt thư viện: `yarn`
2) sửa file .env cho kêt nối mysql
3) chạy server `yarn start`

* Lưu ý:
- tạo database trước khi start (thông qua workbench hoặc bất cứ trình quản trị database nào)
- lần đàu chạy thì bỏ comment dòng `sequelize.sync({ alter: true, force: true });`  trong file `src/index.js`
- Mặc định sẽ chạy ở cổng 3000 theo như file `.env`
