const fs = require('fs');

class UserFsManager {
  static filePath = './fs/data/users.json';

  constructor() {}

  createUser(data, callback) {
    fs.readFile(UserFsManager.filePath, 'utf-8', (readError, usersData) => {
      if (readError) {
        return callback(readError.message, null);
      }

      const users = JSON.parse(usersData);

      const user = {
        id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      users.push(user);

      fs.writeFile(UserFsManager.filePath, JSON.stringify(users), (writeError) => {
        if (writeError) {
          return callback(writeError.message, null);
        }

        callback(null, user);
      });
    });
  }

  read(callback) {
    fs.readFile(UserFsManager.filePath, 'utf-8', (error, usersData) => {
      if (error) {
        return callback(error.message, null);
      }

      const users = JSON.parse(usersData);

      if (users.length === 0) {
        return callback("no hay ningún usuario", null);
      }

      callback(null, users);
    });
  }

  readOne(id, callback) {
    fs.readFile(UserFsManager.filePath, 'utf-8', (error, usersData) => {
      if (error) {
        return callback(error.message, null);
      }

      const users = JSON.parse(usersData);

      const oneUser = users.find((each) => each.id === Number(id));
      if (oneUser) {
        callback(null, oneUser);
      } else {
        callback("NO HAY USUARIO CON EL ID " + id, null);
      }
    });
  }
}

module.exports = UserFsManager;