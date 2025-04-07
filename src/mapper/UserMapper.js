import axios from 'axios';

class UserMapper {
  constructor() {
    if (!UserMapper.instance) {
      this.baseURI = '/api/users';
      UserMapper.instance = this;
    }

    return UserMapper.instance;
  }

  async getUserById(id) {
    try {
      const response = await axios.get(this.baseURI + `/${id}`);
      if (response.status === 200) {
        return response.data;
      } else {
        alert('User 조회 실패');
        return false;
      }
    } catch (error) {
      alert('에러발생 : ' + error);
    }
  }
}

const instance = new UserMapper();
export default instance;
